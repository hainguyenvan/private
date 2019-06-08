# Category
## Data Type
* data type of category
```
type Category {
   id:ID!,
   pk:String,
   categoryType: String,
   code: String,
   value: String,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int
}
```

## Mutation
### Insert
* func
```
insertCategory(categoryType: String!, code: String, value: String): Category
```
* body
```
{ 
	"query":"mutation {insertCategory(categoryType: \"REGION_CAT\", code: \"20190324\", value: \"Hà Nội\") {id}}"
}
```

### Update
* func
```
updateCategoryByPK(pk: String!, categoryType: String!, code: String, value: String): Category
```

### Delete
*  func
```
deleteCategoryByPK(pk: String!): Boolean
```

## Query
### Get all category
* func
```
getAllCategory: [Category],
```
* body
```
{  
   "query":"query {getAllCategory {id}"
}
```
### Get by data status category
* func
```
getByDataStatusCategory(status: String!): [Category]
```
### Search caetgory
* func
```
searchCategory(code: String, categoryType: String): [Category]
```