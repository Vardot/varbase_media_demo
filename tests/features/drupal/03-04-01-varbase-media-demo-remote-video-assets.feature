@varbase_media_demo @content @media @remote_video
Feature: Varbase Media Demo Assets - remote video media assets
  As a site administrator
  I want each remote (oEmbed) demo video asset to point at a working YouTube or
  Vimeo source, with no oEmbed retrieval error

  Scenario Outline: The remote video "<name>" points at the working source "<url>"
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content/media?type=remote_video"
    And I open the edit form of the media named "<name>"
    Then "input[name='field_media_oembed_video[0][value]']" should have value "<url>"
    And I should not see "does not represent a valid oEmbed resource"
    And I should not see "Could not retrieve the oEmbed resource"
    And I should not see "The website encountered an unexpected error"

    Examples:
      | name | url |
      | Remote Youtube Video No Cover Image | https://www.youtube.com/watch?v=bTqVqk7FSmY |
      | Remote Youtube Video With Cover Image | https://www.youtube.com/watch?v=bTqVqk7FSmY |
      | Remote Vimeo Video No Cover Image | https://vimeo.com/22439234 |
      | Remote Vimeo Video with Cover Image | https://vimeo.com/22439234 |
