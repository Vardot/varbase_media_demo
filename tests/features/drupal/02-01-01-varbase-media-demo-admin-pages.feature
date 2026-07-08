@varbase_media_demo @admin
Feature: Varbase Media Demo Assets - administration pages
  As a site administrator
  I want the media administration pages to be reachable with the Varbase Media
  Demo Assets module and its default demo media content enabled

  Scenario: The media administration pages are reachable for the administrator
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content"
    Then I should not see "Page not found"
    When I open the administration page "/admin/content/media"
    Then I should not see "Page not found"
    When I open the administration page "/admin/structure/media"
    Then I should not see "Page not found"
    When I open the administration page "/admin/reports/status"
    Then I should not see "Page not found"
