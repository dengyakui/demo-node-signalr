"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = __importStar(require("@aspnet/signalr"));
var connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chathub")
    .build();
connection.on('ReceiveMessage', function (username, message) {
    console.log("user " + username + " says: " + message);
});
connection.start()
    .then(function () {
    console.log("connection success");
    var poll = function () {
        connection.invoke("SendMessage", "quintos", new Date().toLocaleTimeString());
        setTimeout(poll, 2000);
    };
    poll();
})
    .catch(function (err) { return console.error(err); });
