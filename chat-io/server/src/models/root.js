class RootModel {
    constructor() {
        this.userList = [];
        this.roomList = [];
        this.messagesList = [];
    }

    insertUser(user) {
        return new Promise((fulfill, reject) => {
            this.userList.push(user);
            fulfill(true);
        });
    }

    insertRoom(room) {
        return new Promise((fulfill, reject) => {
            this.roomList.push(room);
            fulfill(true);
        });
    }

    insertMessages(messages) {
        return new Promise((fulfill, reject) => {
            this.messagesList.push(messages);
            fulfill(true);
        });
    }
}

module.exports = new RootModel();