const contactBackground = document.querySelector(".contact-background");
const messageTarget = messageInput.querySelector("h3");
const contactsList = document.querySelector(".contacts");

function markContactCheck() {
    const contacts = contactsList.querySelectorAll("li");

    const preSelected = contactsList.querySelector(".selected");
    if (preSelected !== null || preSelected === contactsList.querySelector) {
        preSelected.classList.remove("selected");
        preSelected.classList.add("hidden");
    }

    contacts.forEach((contact) => {
        if (contactSelected === contact.innerText) {
            contact.querySelector(".check").classList.remove("hidden");
            contact.querySelector(".check").classList.add("selected");
        }
    });
}

function selectContact(contact) {
    contactSelected = contact.innerText;
    if (contactSelected === "Todos") {
        selectPublic();
    }

    messageTarget.innerText = `Enviando para ${contactSelected} (${messagePrivacy})`;
    markContactCheck();
}

function renderContacts(contacts) {
    if (contactSelected === "Todos") {
        contactsList.innerHTML = `
            <li onclick="selectContact(this)" data-test="all">
                <ion-icon name="people"></ion-icon>Todos<ion-icon class="check selected" name="checkmark-sharp" data-test="check"></ion-icon>
            </li>`;
    } else {
        contactsList.innerHTML = `
            <li onclick="selectContact(this)" data-test="all">
                <ion-icon name="people"></ion-icon>Todos<ion-icon class="check hidden" name="checkmark-sharp" data-test="check"></ion-icon>
            </li>`;
    }

    contacts.forEach((contact) => {
        if (contact.name != nameText && contact.name === contactSelected) {
            contactsList.innerHTML += `
                <li onclick="selectContact(this)" data-test="participant">
                    <ion-icon name="person-circle"></ion-icon>
                    ${contact.name}
                    <ion-icon class="check selected" name="checkmark-sharp" data-test="check"></ion-icon>
                </li>`;
        } else if (contact.name != nameText) {
            contactsList.innerHTML += `
                <li onclick="selectContact(this)" data-test="participant">
                    <ion-icon name="person-circle"></ion-icon>
                    ${contact.name}
                    <ion-icon class="check hidden" name="checkmark-sharp" data-test="check"></ion-icon>
                </li>`;
        }
    });
}

function getContacts() {
    axios
        .get("https://mock-api.driven.com.br/api/vm/uol/participants")
        .then((response) => renderContacts(response.data))
        .catch((error) => console.log(error));
}

function toggleContactBar() {
    contactBackground.classList.toggle("hidden");
}

contactBackground.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        toggleContactBar();
    }
});