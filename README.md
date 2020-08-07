
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a274db0330c48e98114d069a98c735e)](https://app.codacy.com/gh/minecode/code_contest_frontend?utm_source=github.com&utm_medium=referral&utm_content=minecode/code_contest_frontend&utm_campaign=Badge_Grade_Dashboard)

Create a minecode website with some challenges where someone can participate and submit one resolution.
Add possibility to make contestes and teams.
Login with google.

**Stack**:

  - ReactJS
  - TypeScript

**Font**:

  - -apple-sysyem, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serife;

**Pages**:

  - **Home**:
    - List of contests/challenges
    - List of online users
    - Challenge info (if selected)
      - Description
      - Submit space
      - My resolutions and scores (if applicable)
  - **Profile**:
    - ...

**Database (sqlite3)**:

  - **Difficulty**:
  ```
  ID (int, required, unique)
  Title (string, required)
  Value (double [0... 1], required)
  ```
  
  - **ScoreUserChallenge**
  ```
  ID (int, required, unique)
  User.ID (int, required)
  Contest.ID (int, required)
  Challenge.ID (int, required)
  Score (double, required)
  ```
  
  - **User**
  ```
  ID (int, required, unique)
  FirstName (string, required)
  LastName (string, required)
  ImageUrl (string, required)
  ```
  
**Workflows**:

  - **Require login**:
    - **Submit/Update a new response**:
    Login w/ Google -> Select challenge -> Submit response -> Push the response -> Dispute a new CI/CD Github actions when push (Run testes and calculate score) -> If testes are passed then store [UserID, ContestID, ChallengeID, Score]
    - **View history**:
    Login w/ Google -> Select challenge -> View submitted resolutions
    - **View profile**:
    Login w/ Google -> Click on 'My profile'
  - **No require login**:
    - **View general classification**:
    View classification of all members in all challenges
    - **View contest classification**:
    Select challenge -> View classification of all members in selected contest
    - **View challenge classification**:
    Select challenge -> View classification of all members in selected challenge
    - **View contest**:
    Select contest
    - **View challenge**:
    Select challenge
    
