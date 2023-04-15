const public = document.querySelector('.public');
const private = document.querySelector('.private');

function selectPublic () {
    public.querySelector('.check').classList.remove('hidden');
    private.querySelector('.check').classList.add('hidden');
    messagePrivacy = "público";
    messageType = "message";
    messageTarget.innerText = `Enviando para ${contactSelected} (${messagePrivacy})`;
}

function selectPrivate () {
    public.querySelector('.check').classList.add('hidden');
    private.querySelector('.check').classList.remove('hidden');
    messagePrivacy = "reservadamente";
    messageType = "private_message";
    messageTarget.innerText = `Enviando para ${contactSelected} (${messagePrivacy})`;
}