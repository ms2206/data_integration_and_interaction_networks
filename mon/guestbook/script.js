
function sendMessage(){
    const input_elem = document.getElementById('user-name-input');
    const user_name = input_elem.value;
    const input_message_elem = document.getElementById('message-input');     
    const input_message = input_message_elem.value;
    messages.push({
        author: user_name,
        messages: input_message
    });
    displayMessages();
    const elem = document.getElementById('greeting-area');
}


const messages = [
    {
        author: 'Matthew',
        messages: 'Hello'
    },
    {
        author: 'Jo',
        messages: 'Hi'
    }
];




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