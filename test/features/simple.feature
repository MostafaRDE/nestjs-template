Feature: Health check

    Scenario: App is ok
        When user call health-check
        Then user should get truthy response
