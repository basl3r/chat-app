const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const hideMessages = () => {
  messagesSection.classList.remove('show');
};

const login = () => {
  if (!userNameInput.value) alert('Username is empty!');
  userName = userNameInput.value;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
  }
  message.innerHTML = `
    <h3 class='message__author'>${userName === author ? 'You' : author }</h3>
    <div class='message__content'>${content}</div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = () => {
  if (!messageContentInput.value) {
    alert('Please enter the message');
    return;
  }
  addMessage(userName, messageContentInput.value);
  messageContentInput.value = '';
};

hideMessages();

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  login();
});

addMessageForm.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage();
});