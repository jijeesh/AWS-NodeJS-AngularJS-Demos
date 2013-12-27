/**
 * Created by ejf3 on 11/20/13.
 */
var c = require('../constants')
    , converter = require('../utils/dynamo_to_json.js');

Users = function (dynamodb) {
    this.dynamodb = dynamodb;
    this.getAll = function (socket) {
        console.log("dyn.users.getAll", c.DYN_USERS_TABLE);
        this.dynamodb.scan({
            "TableName": c.DYN_USERS_TABLE,
            "Limit": 100
        }, function (err, data) {
            if (err) {
                console.log(c.DYN_GET_USERS, err);
                socket.emit(c.DYN_GET_USERS, "error");
            } else {
                var finalData = converter.ArrayConverter(data.Items);
                console.log(c.DYN_GET_USERS, finalData);
                socket.emit(c.DYN_GET_USERS, finalData);
            }
        });
    };

    this.addUpdateUser = function (user, socket) {
        console.log("dyn.users.addUpdateUser");
        console.log(c.DYN_UPDATE_USER);
        this.dynamodb.putItem({
            "TableName": c.DYN_USERS_TABLE,
            "Item": user
        }, function (err, data) {
            if (err) {
                console.log(c.DYN_UPDATE_USER, err);
                socket.emit(c.DYN_UPDATE_USER, "error");
            } else {
                console.log(c.DYN_UPDATE_USER, data);
                socket.emit(c.DYN_UPDATE_USER, data);
            }
        });
    };
};


module.exports = Users;