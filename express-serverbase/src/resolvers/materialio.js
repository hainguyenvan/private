const MaterialController = require('../controllers/material');

const MaterialIO = {
    materialDetail(root) {
        let materialPK = root.materialPK;
        return  MaterialController.getByPK(materialPK)
            .then(regionData => {
                return regionData;
            })
            .catch(err => {
                return null;
            })
    }
}




module.exports = {
    MaterialIO
}