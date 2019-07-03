const Constant = require('../config/constant');
const DeivceController = require('../controllers/device');
const MaterialController = require('../controllers/material');

const HandoverDetail = {
    deviceDetail(root) {
        let itemPK = root.itemPK;
        return DeivceController.getByPK(itemPK)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    materialDetail(root) {
        let itemPK = root.itemPK;
        return MaterialController.getByPK(itemPK)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    itemType(root) {
        let itemPKTMP = root.itemPK;
        let keySplits = itemPKTMP.split("_");
        switch (keySplits[0]) {
            case Constant.DEVICE_TBL_SHORT_NAME:
                return Constant.DEIVCE;
            case Constant.MATERIAL_TBL_SHORT_NAME:
                return Constant.MATERIAL;
            default:
                return null;
        }
    }
}


module.exports = {
    HandoverDetail
}