const messages = [
    {
        author: 'Tom',
        message: 'This is the first message in our app!'
    },
    {
        author: 'Tom',
        message: 'This is another message!'
    }
];

messages.push({
    author: 'Fady',
    message: 'This is the third message!'
});

function sendMessage() {
    const user = document.getElementById('user-name-input').value;
    const msg = document.getElementById('message-input').value;

    const message = { author: user, message: msg };
    const http_request = new XMLHttpRequest();
    const url = 'http://localhost:3000/sendmessage';
    http_request.open("POST", url);
    http_request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http_request.send(JSON.stringify(message));
    http_request.onload = function() {
        // Update message display once a response is received
        updateMessages();
    }
}

function updateMessages() {
    const http_request = new XMLHttpRequest();
    const url = 'http://localhost:3000/messages';
    http_request.open("GET", url);
    http_request.onload = function() {
        const messages = JSON.parse(http_request.responseText);
        displayMessages(messages);
    }
    http_request.send();
}

function displayMessages(messages) {
    const max_message_count = 10;

    const container = document.getElementById('message-container');
    container.innerHTML = '';

    // Display top 10 messages
    for (let i = 1; i <= messages.length && i < max_message_count; i++) {
        const message = messages[messages.length - i];
        const elem = document.createElement('DIV');
        const msg = `<b>${message.author}</b> says: ${message.message}`
        elem.innerHTML = msg;
        container.appendChild(elem);
    }
}

updateMessages();
