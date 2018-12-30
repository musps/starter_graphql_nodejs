# Examples

```
# Update user
mutation {
  User(id: 9) {
    userUpdate(firstName: "firstname update") {
      id
      firstName
      lastName
    }
  }
}
```


```
# Fetch user by id with variables.
query GetUserById($userId: Int!, $withComments: Boolean = false) {
  user(id: $userId) {
    firstName
    comments @include(if: $withComments) {
      content
    }
  }
}
```
