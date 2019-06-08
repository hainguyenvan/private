# Customer
## Data type
* data type of customer
```
type Customer {
   id:ID,
   pk:String,
   name: String,
   address: String,
   place: String,
   contactPhone: String,
   contactPerson: String,
   contactEmail: String,
   contactTitle: String,
   supportRegionPK: String,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int,
   supportRegionDetail: Category
}
```

## Mutation
### Insert
* func
```
insertCustomer(name: String!, address: String, place: String, contactPhone: String, contactPerson: String, contactEmail: String, contactTitle: String, supportRegionPK: String): Agent
```

### Update
* func
```
updateCustomerByPK(pk: String!,name: String!, address: String, place: String, contactPhone: String, contactPerson: String, contactEmail: String, contactTitle: String, supportRegionPK: String, dataStatus: String): Agent
```

### Delete
* func
```
deleteCustomerByPK(pk: String!): Boolean
```

## Query
### Get all
* func
```
getAllCustomer: [Customer]
```

### Get by PK
* func
```
getByPKCustomer(pk: String!): Customer
```

### Get by data status
* func
```
getByDataStatusCustomer(dataStatus: String!): [Customer]
```