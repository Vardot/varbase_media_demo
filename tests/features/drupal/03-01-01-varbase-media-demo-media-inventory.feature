@varbase_media_demo @content @media @inventory
Feature: Varbase Media Demo Assets - media inventory
  As a site administrator
  I want the default demo content to install exactly the expected set of media
  assets, so development, testing and demos start from a known media library

  Scenario: The demo ships exactly 41 media assets across three bundles
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content/media"
    Then I should see 41 "a[hreflang][href$='/edit']" elements
    When I open the administration page "/admin/content/media?type=image"
    Then I should see 35 "a[hreflang][href$='/edit']" elements
    When I open the administration page "/admin/content/media?type=video"
    Then I should see 2 "a[hreflang][href$='/edit']" elements
    When I open the administration page "/admin/content/media?type=remote_video"
    Then I should see 4 "a[hreflang][href$='/edit']" elements
