Contact email: rodrigo@travelience.com

## Project Description

Create a GraphQL server to handle a simple user CRUD + Authentication.

Please use the following stack:

- Typescript
- Apollo Server
- TypeORM: [https://typeorm.io/](https://typeorm.io/#/)
- TypeGraphQL: [https://typegraphql.com/](https://typegraphql.com/)
- Additional packages are welcome.

## Notes

- We expect the candidate to use a max of 8 hours on this project. But it's not mandatory.
- It's not required to complete all the tasks.

## Acceptance Criteria

**General**

- [ ] Use the stack mention above
- [ ] The code must be fully tested (mutations + queries)
- [ ] Create a user table with a role field, role values ⇒ (user, admin)
- [ ] Any database is OK
- [ ] Separate the public (website) and private (admin panel) schemas

**Public schema**

- [ ] Create the following mutations:
  - [ ] create a user
  - [ ] update the current authenticated user
  - [ ] authenticate a user login(email, password)
- [ ] Create the following queries
  - [ ] return the current authenticated user

**Private schema**

- [ ] Create the following mutations:
  - [ ] create a user
  - [ ] update a user
  - [ ] delete a user
  - [ ] authenticate a user login(email, password)
- [ ] Create the following queries
  - [ ] return a user
  - [ ] return all users
  - [ ] return the current authenticated user

## **Bonus**

**CI**

- [ ] run tests

**Website**

Create a simple Next.JS website to handle the following actions (Public Schema):

- [ ] create a user
- [ ] authenticate a user
- [ ] update the current user information
- [ ] logout
