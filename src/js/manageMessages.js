const messageInput = document.querySelector(".message-input");
let contactSelected = "Todos";
let messagePrivacy = "público";
let messageType = "message";

function sendMessage() {
    const messageText = messageInput.querySelector("input").value;

    if (!messageText) {
        return;
    }

    const data = {
        from: nameText,
        to: contactSelected,
        text: messageText,
        type: messageType,
    };

    messageInput.querySelector("input").value = "";

    axios
        .post("https://mock-api.driven.com.br/api/vm/uol/messages", data)
        .then(() => getMessages())
        .catch(() => window.location.reload());
}

function renderMessages(messages) {
    const messagesList = document
        .querySelector(".messages-container")
        .querySelector("ul");
    messagesList.innerHTML = "";

    messages.forEach((message) => {
        if (
            message.type === "private_message" &&
            (message.from === nameText || message.to === nameText)
        ) {
            messagesList.innerHTML += `
                <li class="message-private" data-test="message">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>
                    reservadamente para<strong>${message.to}:</strong>${message.text}</h3>
                </li>
            `;
        } else if (message.type === "message") {
            messagesList.innerHTML += `
                <li class="message-all" data-test="message">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>
                    para<strong>${message.to}:</strong>${message.text}</h3>
                </li>
            `;
        } else if (message.type === "status") {
            messagesList.innerHTML += `
                <li class="message-status" data-test="message">
                    <h3 class="message-content"><span class="message-time">(${message.time})</span><strong>${message.from}</strong>${message.text}</h3>
                </li>
            `;
        }
    });

    const allMessages = messagesList.querySelectorAll("li");
    const lastMessage = allMessages[allMessages.length - 1];
    lastMessage.scrollIntoView();
}

function getMessages() {
    axios
        .get("https://mock-api.driven.com.br/api/vm/uol/messages")
        .then((response) => renderMessages(response.data))
        .catch((error) => console.log(error));
}

messageInput.querySelector("input").addEventListener("keyup", (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
        sendMessage();
    }
});