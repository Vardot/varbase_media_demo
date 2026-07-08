@varbase_media_demo @content @media @video
Feature: Varbase Media Demo Assets - local video media assets
  As a site administrator
  I want each local (uploaded) demo video asset to reference a real video file

  Scenario Outline: The local video "<name>" references the file "<file>"
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content/media?type=video"
    And I open the edit form of the media named "<name>"
    Then I should see "<file>"
    And I should not see "does not represent a valid"
    And I should not see "The website encountered an unexpected error"

    Examples:
      | name | file |
      | Local Video No cover image | business-meeting.mp4 |
      | Local Video with cover image | business-meeting.mp4 |
