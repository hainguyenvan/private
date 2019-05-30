# User
## Data type
* data type user
```
type User {
   id:ID,
   pk: String,
   code: String,
   email: String,
   phone: String,
   address: String,
   gender: String,
   jobtitle: String,
   dataStatus: String,
   regionPK: String,
   fullName:String,
   avatar: String,
   timeCreated: Int,
   timeModified: Int,
   regionDetail: Category,
}
```

## Mutation
### Insert
* func
```
insertUser(email: String!, passwd: String!, firstName: String!, lastName: String!, age: Int!): User
```

### Update
* func
```
updateUser(email: String!, passwd: String!, firstName: String!, lastName: String!, age: Int!): User
```

### Delete
* func
```
deleteUser(email: String!, passwd: String!, firstName: String!, lastName: String!, age: Int!): Boolean,
```

## Query
### Get by data status
* func
```
getByDataStatusUser(status: String!): [User]
```
### Get by pk
* func
```
getByPKUser(pk: String!): User
```
### Get all user 
* func
```
getAllUser: [User]
```