## Break out requirement

1. design a live score board server, show top 10 highest score users

- need a postgres database to store score of user
- sql query:

```sql
SELECT userId, score
FROM User
ORDER BY score DESC
LIMIT 10
```

- Create index for score column to boost up query process.
- shard the database bases on some criteria like role of user or location, ... to improve both write and read operation.
- expand connection pool for high QPS.
- caching frequently request: we can use redis to store result of top 10 user scores, whenever database has new update, we can update it back.
- We can adopt with more performance NOSQL database like Cassandra or DynamoDB. But consider because it costs expensive.

2. We want live update of the score board.

- Build an api to update score to database.
- After updating score successfully, we return back result to FE to re-display score and update redis store. We can do both operation simultaneous.
- If return result immediately after updating score of a lot of users sometimes cause some issue like make many query to retrieve top 10 score, it very risk and cost. We can use some mechanism can afford that like: polling, interval, ...

5. We want to prevent malicious users from increasing scores without authorisation.

- A lot of way to do that, i can list out some popular methods like: Token-Based Authen, OAuth,
  Session-Based,
  Certificated-Based,
  Roled-Based
  Access Control
  ,...
- I will pick Token-based Authentication:

  - Stateless: token encapsulates user information, making server stateless and more scalable
  - Security: Token can be signed with crypto algorithm
  - Decoupling Authen and Author
  - Supported by third party

- Build a service named Auth service to authentication and authorisation user
- User login to application by `/login` endpoint with userName and password (hashed) -> verify and return JWT and user information
- When user call api update score `/score/:userId`, we call to Auth service to validate if user can update or not based on information in token.

## Solution design diagram

![alt text](assets/image.png)
