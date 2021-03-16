# Oivan Exam

## 1. Overview
- The source code consists of 2 parts: Api and Client.
- Api is a Rails app. Database is Postgres. The Api is Dockerized to run on Docker.
- Api includes /portal for admin and /api for students.
- Client is responsive Single Page App created with Reactjs and Bootstrap.
- Api and Client are deployed to 2 different Amazon EC2 Instances.
- Demo: [Oivan Example Demo](http://oivan-exam.clever-agent.com) (username: teacher@example.com, password: 12345678)
## 2. Installation
### 2.1 Run api
- Below is the guide for running the Api on Docker. You can also run it without Docker.
- The default port is 3001
- We use Postgres. Update database connection in api/config/database.yml
- Migrate database
```
cd api
docker-compose run web rake db:create
docker-compose run web rake db:migrate
docker-compose run web rake db:seed
```
- Start api
```
cd api
docker-compose up
```

**Notes**
- Create docker network if needed
```
docker network create postgres_default
```
- Example of a config database for postgres installed on host machine
```
username: postgres
password: postgres
host: host.docker.internal
port: 5432
```
- You might need to remove Gemfile.lock
### 2.2 Run client
- The default port is 3000. 
- You can change the Api Url setting in /client/src/Shared/Setting.js
```
cd client
npm i
npm run start
```
**Notes**
- You might need to remove package-lock.json
### 2.3 Tests
- We test Apis with Rspec. The test code is located in /spec folder.
- Run Api test
```
cd api
docker-compose run -e "RAILS_ENV=test" web rake db:create
docker-compose run -e "RAILS_ENV=test" web rake db:migrate
docker-compose run -e "RAILS_ENV=test"  web rspec 
```
- Run Client test
```
cd client
npm run test
```
## 3. Student api
### 3.1 List all tests
- **GET /api/tests**
- Params:
```
 token: string
```
- Response:
```
 [{
    "id": 2,
    "name": "Math I",
    "description": "Algebra",
    "question_count": 2
}]
```

### 3.2 Show a specific test
- **Get /api/tests/id**
- Params:
```
token: string
```
- Reponse
```
    {
        "id": 2,
        "name": "Math I",
        "description": "Algebra",
        "questions": [
          {
            "id": 16,
            "content": "2-3",
            "test_id": 2,
            "options": [
              {
                "id": 37,
                "content": "1",
                "is_correct": false,
                "question_id": 16,
              },
              {
                "id": 38,
                "content": "-1",
                "is_correct": true,
                "question_id": 16,
            }],
        }]
    }
```
### 3.3 Submit test
- **Post /api/tests**
- Params:
```
token: string
test: object
```
Example: 
``` 
{
        "id": 2,
        "name": "Math I",
        "description": "Algebra",
        "questions": [
          {
            "id": 16,
            "content": "2-3",
            "test_id": 2,
            "options": [
              {
                "id": 37,
                "content": "1",
                "is_correct": false,
                "question_id": 16,
              },
              {
                "id": 38,
                "content": "-1",
                "is_correct": true,
                "question_id": 16,
            }],
        }]
    }
```
- Response
```
{success: true, message: ""}
```
