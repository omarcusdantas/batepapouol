function sendMessage() {
    const messageText = document.querySelector('.message-input').querySelector('input').value;

    const data = {
        from: nameText,
        to: "Todos",
        text: messageText,
        type: "message"
    };

    axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', data)
        .then(getMessages)
        .catch(window.location.reload);
}

function renderMessages(messages) {
    const messagesList = document.querySelector('.messages-container').querySelector('ul');
    messagesList.innerHTML = '';

    messages.forEach((message) => {
        if (message.type === 'private_message' && message.from === nameText) {
            messagesList.innerHTML += `
                <li class="message-private">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>
                    reservadamente para<strong>${message.to}:</strong>${message.text}</h3>
                </li>
            `;
        }
        else if (message.type === 'message') {
            messagesList.innerHTML += `
                <li class="message-all">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>
                    para<strong>${message.to}:</strong>${message.text}</h3>
                </li>
            `;
        }
        else if (message.type === 'status') {
            messagesList.innerHTML += `
                <li class="message-status">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>${message.text}</h3>
                </li>
            `;
        }
    });

    const allMessages = messagesList.querySelectorAll('li');
    const lastMessage = allMessages[allMessages.length-1];
    lastMessage.scrollIntoView();
}

function getMessages() {
    axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
        .then(response => renderMessages(response.data))
        .catch(error => console.log(error));
}