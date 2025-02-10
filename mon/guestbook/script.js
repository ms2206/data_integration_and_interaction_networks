
function sendMessage(){
    const input_elem = document.getElementById('user-name-input');
    const user_name = input_elem.value;
    const input_message_elem = document.getElementById('message-input');     
    const input_message = input_message_elem.value;
    messages.push({
        author: user_name,
        messages: input_message
    });
    updateMessages();
    const elem = document.getElementById('greeting-area');
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

// this is on main