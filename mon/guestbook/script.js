
function sendMessage(){
    const input_elem = document.getElementById('user-name-input');
    const user_name = input_elem.value;
    const input_message_elem = document.getElementById('message-input');     
    const input_message = input_message_elem.value;

    const elem = document.getElementById('greeting-area');


    const message = { author: user_name, messages:  input_message };
    const http_req = new XMLHttpRequest();
    const url = 'http://localhost:3000/sendmessage';
    http_req.open('POST', url);
    const content_type = 'application/json;charset=UTF-8';
    http_req.setRequestHeader('Content-Type', content_type);
    http_req.send(JSON.stringify(message));

    http_req.onload = function() {
        // Update message display once a response is received
        updateMessages();

        displayMessages();
}

function updateMessages() {
    const http_req = new XMLHttpRequest();
    const url = 'http://localhost:3000/messages';
    http_req.open('GET', url);
    http_req.onload = function() {
        const messages = JSON.parse(http_req.responseText);
        console.log(messages);
        displayMessages(messages);
        
    }
    http_req.send();
}


function displayMessages() {
    const container = document.getElementById('message-container');
    container.innerHTML = ''; // clear contents
    for (let i = 0; i < messages.length; i++) {
        const elem = document.createElement('div');
        const msg = `<b>${messages[i].author}</b> says: ${messages[i].messages}`
        elem.innerHTML = msg;
        container.appendChild(elem);
    }
}
displayMessages();


// this is on refactor