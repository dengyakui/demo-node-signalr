import * as signalR from '@aspnet/signalr'


const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chathub")

  .build();

connection.on('ReceiveMessage', (username: string, message: string) => {
  console.log(`user ${username} says: ${message}`);
})




connection.start()
  .then(() => {
    console.log("connection success")
    const poll = () => {
      connection.invoke("SendMessage", "quintos", new Date().toLocaleTimeString());
      setTimeout(poll, 2000)

    }
    poll()

  })
  .catch(err => console.error(err))