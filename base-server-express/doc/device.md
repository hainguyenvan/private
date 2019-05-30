# Device
## Data type
* data type of device
```
type Device {
   id:ID,
   pk:String,
   serial: String,
   modelPK: String,
   healthStatus: String,
   importDate: Int,
   guaranteeExpiredDate: Int,
   manufactureGuaranteeDate: Int,
   manufactureDate: Int,
   dataStatus: String,
   timeCreated: Int,
   timeModified: Int,
   modelDetail: DeviceModel
}
```

## Mutation
### Insert
* func
```
insertDevice(serial: String!, modelPK: String!, healthStatus: String!, importDate: Int, guaranteeExpiredDate: Int, manufactureDate: Int, manufactureGuaranteeDate: Int): Device
```

### Update
* func
```
updateDeviceByPK(pk: String!,serial: String!, modelPK: String!, healthStatus: String!, importDate: Int, guaranteeExpiredDate: Int, manufactureDate: Int, manufactureGuaranteeDate: Int, dataStatus: String): Device
```

### Delete
* func
```
deleteDeviceByPK(pk: String!): Boolean
```

## Query
### Get all
* func
```
getAllDevice: [Device]
```

### Get by pk
* func
```
getByPKDevice(pk: String!): Device
```

### Get by data status
* func
```
getByDataStatusDevice(dataStatus: String!): [Device]
```