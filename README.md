## Thiago Camargo Fernandes

## Description
Posterr is a twitter like service. 

## Prerequisites
- [Docker](https://docs.docker.com/engine/install/)
## Running the app

```bash
docker compose up --build -d
```
(It may take sometime to prepare everything)

## Test

```bash
# unit tests
$ docker compose exec posterr-api yarn test
```

## Preloaded data
The database was preloaded with some data for easy running some requests against the API.

### Users
- user1: 
  - Hardcoded authenticated user
- user2: 
  - Created to test follow and unfollow features.
  - id: f528b4d5-f6a1-408e-bb2c-9e2a90363233

### Posts
There are 6 posts created by 'user2'.

## API Documentation
[Postman docs](https://documenter.getpostman.com/view/10140489/UVysywQ4)
(Please check the examples.)

## Planning
### Questions
1. Has the reply the same characters limit (777) as a post?
2. Is there a limit amount of replies to a tweet?
3. Should it be possible to reply a reply?
4. A reply to a repost should reference the original post or the repost?
5. Replies can be reposted? And Quoted?

### Implementation
Assumptions:
- Reply has max 777 characters
- unlimited replies
- it is possible to reply a reply
- a reply to a repost should reference the original post.
- replies can be reposted and quoted.

Solution:
Add support to the REPLY post type and include a parameter to the list posts API to filter out the replies.

Tech details:
- create Post API should support the REPLY type
- On Post table, the type collumn should support the REPLY type.
- list Posts API should support the query string option: include_replies as boolean type.
- Post repository find many method should support the includeReplies parameter. When the parameter is false a where constrain must filter out the REPLY posts.
- Post entity should include support for REPLY type.
- should be created a validation strategy por REPLY post to check if user is replying a REPOST and throwing an error.

## Critique
### Improvements:
- improve unit tests coverage
- create e2e tests
- improve exception handling and return messages
- include proper authentication and authorization

### Scale:
- The API service must be run on a cluster, like kubernetes, so the number of instances can increase according to the services load. Also,
there should be a load balance to distribute the requests to the 
avaiable instances.
- Requests rate limits and throttle must be addressed to avoid abuses.
- Analytics and monitoring services should be configured.
- The database should be configured with reading replicas and being monitored to auto scale.
- Postgres default engine is know to have a limit of storage maintaining a desired performance. For extreme cases, other big data
solutions must be used. Those solutions focus on optimizing indexes and partioning to keep the performance.
