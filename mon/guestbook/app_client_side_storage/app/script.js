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
    messages.push({ author: user, message: msg });
    displayMessages();
}

function displayMessages() {
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

displayMessages();
