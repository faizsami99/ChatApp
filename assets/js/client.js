
const socket = io();

let message_Box = document.getElementById("message_Box");
let arrowButtom = document.getElementById("arrowButtom");

let clientName;
do{
    clientName = prompt('Please enter you name');

}while(!clientName)

let textArea = document.getElementById("textarea");

arrowButtom.addEventListener('click', () => {
    sendMessage(textArea.value.trim());
});

textArea.addEventListener('keyup', (e) => {
    if(e.key == 'Enter'){
        sendMessage(e.target.value.trim());
    }
});

function sendMessage(message) {
    const msg = {
        name:clientName,
        message: message
    }
    console.log(message);
    appendMessage(msg, 'outgoing');

    // other side scripting

    socket.emit('message', msg);

}

function appendMessage(msg, type){
    textArea.value = "";
    console.log(msg);
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
            <h3>${msg.name}</h3>
            <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    message_Box.appendChild(mainDiv);

}

// Here Recieving others messages

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
});