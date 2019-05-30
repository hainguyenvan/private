# Agent
## Data type
* data type of agent
```
type Agent {
   id:ID,
   pk:String,
   name: String,
   address: String,
   place: String,
   contactPhone: String,
   contactPerson: String,
   contactEmail: String,
   contactTitle: String,
   regionPK: String,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int,
   regionDetail: Category
}
```

## Mutation
### Insert
* func
```
insertAgent(name: String!, address: String, place: String, contactPhone: String, contactPerson: String, contactEmail: String, contactTitle: String, regionPK: String): Agent
```

### Update
* func
```
updateAgentByPK(pk: String!,name: String!, address: String, place: String, contactPhone: String, contactPerson: String, contactEmail: String, contactTitle: String, regionPK: String, dataStatus: String): Agent
```

### Delete
* func
```
deleteAgentByPK(pk: String!): Boolean
```

## Query
### Get all
* func
```
getAllAgent: [Agent]
```

### Get by pk
* func
```
getByPKAgent(pk: String!): Agent
```

### Get by data status
* func
```
getByDataStatusAgent(dataStatus: String!): [Agent]
```