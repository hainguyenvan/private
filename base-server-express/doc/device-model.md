# Device Model
## Data type
* data type of device model
```
type DeviceModel {
   id:ID,
   pk:String,
   modelName: String,
   commonName: String,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int
}
```

## Mutation
### Insert
* func
```
insertDeviceModel(modelName: String!, commonName: String!): DeviceModel
```

### Update
* func
```
updateDeviceModelByPK(pk: String!, commonName: String!, modelName: String!, dataStatus: String): DeviceModel
```

### Delete
* func
```
deleteDeviceModelByPK(pk: String!): Boolean
```

## Query
### Get all device model
* func
```
getAllDeviceModel: [DeviceModel]
```

### Get by pk
* func
```
getByPKDeviceModel(pk: String!): DeviceModel
```

### Get by data status
* func
```
getByDataStatusDeviceModel(dataStatus: String!): [DeviceModel]
```