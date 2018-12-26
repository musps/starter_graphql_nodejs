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
