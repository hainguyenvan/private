const Constant = {
    // name
    DEIVCE: 'device',
    MATERIAL: 'material',

    // channels
    SEND_CONNECTED_CHANNELS: 'connected',
    SEND_TOKEN_CHANNELS: 'sendToken',


    // short name tbale
    CATEGORY_TBL_SHORT_NAME: 'CAT',
    USER_TBL_SHORT_NAME: 'USR',
    AGENT_TBL_SHORT_NAME: 'AGT',
    CUSTOMER_TBL_SHORT_NAME: 'CTM',
    LOCATION_TBL_SHORT_NAME: 'LCT',
    DEVICE_TBL_SHORT_NAME: 'DEV',
    DEVICE_MODEL_TBL_SHORT_NAME: 'DVM',
    HANDOVER_TBL_SHORT_NAME: 'HDV',
    HANDOVER_DETAIL_TBL_SHORT_NAME: 'HDD',
    MATERIAL_TBL_SHORT_NAME: 'MTR',
    MATERIAL_IO_TBL_SHORT_NAME: 'MIO',
    MATERIAL_IO_GROUP_TBL_SHORT_NAME: 'MIG',
    REPAIR_TBL_SHORT_NAME: 'REP',
    REPAIR_DETAIL_TBL_SHORT_NAME: 'RPD',

    repairStatus : {
        'pending' : 'Chưa giao',
        'assigned': 'Đã giao',
        'done': 'Hoàn thành'
    }
}

module.exports = Constant;