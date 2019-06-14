// const NotificationModel = require('../models/notification');
// const RepairModel = require('../models/repair');
// const UserModel = require('../models/user');

// const { socketClient } = require('./socketio-client');


// const OPERATOR_CHANNEL_FIRST = 'operatorRepair_';
// const STATUS_CHANNEL_FIRST = 'updateStatusRepair_';
// const Constant = require('../config/constant');


// function getContentSocketOperator(repairPK) {
//     return new Promise((fulfill, reject) => {
//         RepairModel.getDeviceDetailByPK(repairPK)
//             .then(device => {
//                 let content = 'Bạn đã được giao việc sửa thiết bị ' + device.serial;
//                 fulfill(content);
//             })
//             .catch(err => {
//                 console.log(err);
//                 reject(err);
//             })
//     })
// }

// function getContentSocketUpdateStatus(userPK, status, repairPK) {
//     return new Promise((fulfill, reject) => {
//         UserModel.getByPK(userPK)
//             .then(async (user) => {
//                 let fullName = user.fullName;
//                 let serial = await RepairModel.getDeviceDetailByPK(repairPK)
//                     .then(device => {
//                         return device.serial;
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         return '';
//                     });
//                 let content = fullName + ' đã cập nhật trạng thái ' + Constant.repairStatus[status] + ' cho thiết bị ' + serial;
//                 fulfill(content);
//             })
//             .catch(err => {
//                 console.log(err);
//                 reject(err);
//             })
//     })
// }

// exports.createSocketRepair = function (nsp) {
//     nsp.on('connection', function (socket) {
//         socket.on(OPERATOR_CHANNEL_FIRST, function (message) {
//             let channel = message.channel;
//             // console.log('channel: ', channel);
//             nsp.emit(channel, { msg: 'update notify' });
//         });

//         socket.on(STATUS_CHANNEL_FIRST, function (message) {
//             let channel = message.channel;
//             // console.log('channel: ', channel);
//             nsp.emit(channel, { msg: 'update notify' });
//         });
//     })
// }

// exports.emitUpdateOperator = function (operatorPayload) {
//     return new Promise(async (fulfill, reject) => {
//         let userPK = operatorPayload.operator;
//         let recordPK = operatorPayload.pk;

//         let content = await getContentSocketOperator(recordPK)
//             .then(content => {
//                 return content;
//             })
//             .catch(err => {
//                 console.log(err);
//                 return '';
//             })
//         let notify = {
//             userPK: userPK,
//             recordPK: recordPK,
//             content: content,
//             category: 'repair',
//             createdBy: operatorPayload.createdBy
//         }
//         NotificationModel.insert(notify)
//             .then(status => {
//                 let fullChannel = `${OPERATOR_CHANNEL_FIRST}${userPK}`;
//                 socketClient.emit(OPERATOR_CHANNEL_FIRST, { channel: fullChannel });
//                 fulfill(true);
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })
// }

// exports.emitUpdateStatus = function (payload) {
//     return new Promise(async (fulfill, reject) => {
//         let createdBy = payload.createdBy;
//         let repairStatus = payload.repairStatus;
//         let repairPK = payload.pk;

//         let content = await getContentSocketUpdateStatus(createdBy, repairStatus, repairPK)
//             .then(content => {
//                 return content;
//             })
//             .catch(err => {
//                 console.log(err);
//                 return '';
//             })
//         let notify = {
//             recordPK: repairPK,
//             content: content,
//             category: 'repair',
//             createdBy: createdBy
//         }
//         RepairModel.getByPK(payload.pk)
//             .then(repair => {
//                 let userPK = repair.createdBy;
//                 notify.userPK = userPK;
//                 NotificationModel.insert(notify)
//                     .then(status => {
//                         let fullChannel = `${STATUS_CHANNEL_FIRST}${userPK}`;
//                         socketClient.emit(STATUS_CHANNEL_FIRST, { channel: fullChannel });
//                         fulfill(true);
//                     })
//                     .catch(err => {
//                         reject(err);
//                     })
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })
// }