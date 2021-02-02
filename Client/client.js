//Connect to Websocket
const socket = new WebSocket('ws:localhost:3000');

socket.addEventListener('open', event => {
    socket.send('Client Connected');
});

socket.addEventListener('message', event => {
    if(event.data.slice(0,1) == '{'){
        console.log(JSON.parse(event.data))
    }
    else{
        console.log('SERVER: ', (event.data));
    }

});
