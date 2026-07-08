@varbase_media_demo @content @media @image
Feature: Varbase Media Demo Assets - image media assets
  As a site administrator
  I want every demo image asset to render its picture and carry alt text, so the
  media library is populated with real, accessible images

  Scenario: All 35 image assets render a thumbnail with alt text in the library
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content/media?type=image"
    Then I should see 35 "img.image-style-thumbnail" elements
    And I should see 35 "img.image-style-thumbnail[alt]:not([alt=''])" elements

  Scenario Outline: The demo image "<name>" renders its picture and has alt text
    Given I am a logged in user with the "Webmaster" user
    When I open the administration page "/admin/content/media?type=image"
    And I open the edit form of the media named "<name>"
    Then every "img[src*='/styles/']" image should have loaded
    And "input[name='field_media_image[0][alt]']" should have a non-empty value

    Examples:
      | name |
      | People clapping in conference room |
      | Person in purple shirt holding fig slice over eye |
      | People meeting at table with laptops and tablet |
      | Laptop showing presentation slides with hands nearby |
      | People working at desk |
      | Figure: Pointing at blue percentage symbol |
      | Business meeting |
      | Figure: Person sitting in blue shirt and white shoes |
      | Navigation app showing route and unlock car button |
      | Avatar: Man in sunglasses and hat looking up |
      | Mobile app for car rental |
      | Business welcome |
      | Audience facing blue stage in theater |
      | Business way |
      | Skyscraper |
      | Group of six working with laptops and tablets |
      | Open office with desks and person working |
      | Team 5: Smiling person with curly hair and glasses |
      | Group meeting with laptops, handshake |
      | Team 2: Confident woman with glasses |
      | Three people working at desk with computer and notebooks |
      | Laptop showing code editor with syntax highlighting |
      | Four people working at wooden table with laptops |
      | Four people shaking hands and smiling |
      | Figure: Person running with speech bubble |
      | Mobile app with car selection and map |
      | Two people discussing at sunlit table |
      | Two people discussing work at table |
      | Woman at desk with computer and mug |
      | Four people in meeting with flip chart |
      | Team 1: Smiling man in yellow jacket with glasses |
      | Team 3: Red-haired woman with glasses indoors |
      | Team 4: Confident young person in blue shirt |
      | People in meeting with laptops |
      | Focused man working on laptop in bright cafe |
