const loginScreen = document.querySelector('.login-screen');
const loadingScreen = document.querySelector('.loading-screen');
const messagesScreen = document.querySelector('.messages-screen');
let nameText;
let statusIntervalId;

axios.defaults.headers.common['Authorization'] = 'hQ1BXpUEVI2NU3TNeV1FWm1W';

function toggleMessagesScreen() {
    loadingScreen.classList.toggle('hidden');
    messagesScreen.classList.toggle('hidden');
}

function disconnected() {
    messagesScreen.classList.toggle('hidden');
    loginScreen.classList.toggle('hidden');
    alert('Desconectado do servidor');
}

function statusUpdate(data) {
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', data)
        .catch(disconnected);
}

function connectionSuccess(data) {
    statusIntervalId = setInterval(statusUpdate, 5000, data);
    toggleMessagesScreen();
    setInterval(getMessages,3000);
}

function toggleLoginScreen() {
    loginScreen.classList.toggle('hidden');
    loadingScreen.classList.toggle('hidden');
}

function connectionError(error) {
    if (error.response.status === 400) {
        toggleLoginScreen();
        alert('Há um usuário com esse nome logado, escolha outro nome.');
    }
}

function connect() {
    nameText = loginScreen.querySelector('input').value;
    toggleLoginScreen();

    const data = {
        name: nameText
    }

    axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', data)
        .then(connectionSuccess(data))
        .catch(error => connectionError(error));    
}

loginScreen.querySelector('input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        connect();
    }
})