# Location
## Data type
* data type of
```
type Location {
   id:ID,
   pk: String,
   code: String,
   codeTinh: String,
   fullName: String,
   ggMappedName: String,
   ggMatched: String,
   ggName: String,
   ggFormattedAddress: String,
   huyen: String,
   huyenKhongDau: String,
   nameKhongDau: String,
   parentId: String,
   placeName: String,
   placeType: String,
   pre: String,
   tinh: String,
   type: String,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int,
   createdBy: String,
   modifiedBy: String 
}
```

## Query
### Get all
* func
```
getAllLocation: [Location]
```

### Get by PK
* func
```
getByPKLocation(pk: String!): Location
```

### Get by data status
* func
```
getByDataStatusLocation(dataStatus: String!): [Location]
```