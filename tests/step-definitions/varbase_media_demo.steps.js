'use strict';

/**
 * @file
 * Custom step definitions for the Varbase Media Demo Assets test suite.
 *
 * Most of the suite reuses the step definitions that ship with varbase-e2e
 * (navigation, web-first assertions, accessibility). Only a few module-specific
 * helpers live here: logging in as a named user from cucumber.js
 * worldParameters.users, dropping back to an anonymous session, and opening an
 * administration page while asserting it is reachable.
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const {
  friendly,
  gotoUrl,
  waitForPageLoad,
} = require('@vardot/varbase-e2e/tests/step-definitions/varbase-e2e');

/**
 * Run a step body and rethrow any failure as a tester-friendly error.
 *
 * @param {Function} body
 *   Async function performing the step.
 * @param {string} message
 *   Human-readable description for failures.
 */
async function attempt(body, message) {
  try {
    await body();
  }
  catch (err) {
    throw friendly(message, err);
  }
}

/**
 * Drop back to an anonymous session by clearing every cookie.
 *
 * Example: Given I am an anonymous visitor
 */
Given(/^(?:I |we )?am an anonymous visitor$/, async function () {
  await attempt(async () => {
    await this.context.clearCookies();
  }, 'Could not clear the session to become anonymous');
});

/**
 * Open an administration page and assert it is reachable.
 *
 * Uses the varbase-e2e smart-wait helpers (gotoUrl + waitForPageLoad) so heavy
 * Varbase admin pages are fully settled before the assertion, and reports any
 * access-denied / not-found / fatal-error page with a tester-friendly message.
 *
 * Example: When I open the administration page "/admin/config"
 */
When(/^I open the administration page "([^"]*)"$/, async function (path) {
  await attempt(async () => {
    await gotoUrl(this.page, `${this.parameters.launchUrl}${path}`);
    await waitForPageLoad(this.page, (this.minWaitTime && this.minWaitTime.page) || 10000);
    const bad = await this.page.locator(
      'h1:has-text("Access denied"), h1:has-text("Page not found"), h1:has-text("The website encountered an unexpected error")'
    ).count();
    if (bad > 0) {
      throw new Error(`The page "${path}" returned an access-denied, not-found or error response`);
    }
  }, `Could not open the administration page "${path}"`);
});

/**
 * Open the edit form of a media entity identified by its exact name.
 *
 * On the media administration list (/admin/content/media) the media name in
 * each row is a link to /media/{id}/edit. Media entity ids are not
 * deterministic across installs, so the scenarios reach a specific demo asset
 * by clicking its (unique) name link rather than by a hard-coded id.
 *
 * Example: When I open the edit form of the media named "Skyscraper"
 */
When(/^I open the edit form of the media named "([^"]*)"$/, async function (name) {
  await attempt(async () => {
    // The media name column links to /media/{id}/edit. Match by exact (trimmed)
    // link text and navigate to its href directly, rather than clicking a
    // role/accessible-name locator: the admin media view markup (and therefore
    // the computed accessible name) differs between the Standard profile's core
    // media view and Varbase's, so an exact role-name click is not portable.
    const links = this.page.locator("a[href*='/media/'][href$='/edit']");
    const count = await links.count();
    let href = null;
    for (let i = 0; i < count; i++) {
      const text = ((await links.nth(i).textContent()) || '').trim();
      if (text === name) {
        href = await links.nth(i).getAttribute('href');
        break;
      }
    }
    if (!href) {
      throw new Error(`No media name link with the exact text "${name}" was found in the media list`);
    }
    const url = /^https?:\/\//.test(href) ? href : `${this.parameters.launchUrl}${href}`;
    await gotoUrl(this.page, url);
    await waitForPageLoad(this.page, (this.minWaitTime && this.minWaitTime.page) || 10000);
    const bad = await this.page.locator(
      'h1:has-text("Access denied"), h1:has-text("Page not found"), h1:has-text("The website encountered an unexpected error")'
    ).count();
    if (bad > 0) {
      throw new Error(`The edit form for the media named "${name}" was not reachable`);
    }
  }, `Could not open the edit form of the media named "${name}"`);
});

/**
 * Assert that every <img> matching a selector actually loaded in the browser.
 *
 * A visible <img> can still be broken (missing derivative, failed toolkit
 * conversion). This checks each matched image decoded to a real bitmap
 * (naturalWidth > 0), proving the underlying media file + image-style
 * derivative exist and render - not merely that an <img> tag is present.
 *
 * Example: Then every "img.image-style-thumbnail" image should have loaded
 */
Then(/^every "([^"]*)" image should have loaded$/, async function (selector) {
  await attempt(async () => {
    const imgs = this.page.locator(selector);
    const total = await imgs.count();
    if (total === 0) {
      throw new Error(`No images matched "${selector}"`);
    }
    for (let i = 0; i < total; i++) {
      const img = imgs.nth(i);
      await img.scrollIntoViewIfNeeded().catch(() => {});
      // Wait for the image to finish loading (or erroring) before measuring.
      await img.evaluate((el) => (el.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
          el.addEventListener('load', resolve, { once: true });
          el.addEventListener('error', resolve, { once: true });
        }))).catch(() => {});
      const width = await img.evaluate((el) => el.naturalWidth);
      if (!width || width < 1) {
        const src = await img.getAttribute('src');
        throw new Error(`Image ${i + 1}/${total} did not load (naturalWidth=${width}) src=${src}`);
      }
    }
  }, `Not every "${selector}" image loaded`);
});

/**
 * Assert that a form field (input / textarea) has a non-empty value.
 *
 * Used to confirm demo image media carry alt text (an accessibility
 * requirement) - the alt lives in the field value, not the visible page text.
 *
 * Example: Then "input[name='field_media_image[0][alt]']" should have a non-empty value
 */
Then(/^"([^"]*)" should have a non-empty value$/, async function (selector) {
  await attempt(async () => {
    const value = await this.page.locator(selector).first().inputValue();
    if (!value || !value.trim()) {
      throw new Error(`Field "${selector}" has an empty value`);
    }
  }, `Field "${selector}" did not have a non-empty value`);
});
