document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const userInput = document.getElementById('user-input').value.trim();
        if (userInput) {
            const nickname = localStorage.getItem('nickname');
            const newMessageRef = ref(db, 'messages/' + Date.now());
            set(newMessageRef, {
                user: nickname,
                text: userInput
            });

            document.getElementById('user-input').value = '';
        }
    }
});

function escapeHtml(text) {
    var element = document.createElement('div');
    if (text) {
        element.innerText = text;
        element.textContent = text;
    }
    return element.innerHTML;
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDV9tQXgzqxUayhvc384tTLOwy0QOEZVcU",
    authDomain: "chat-e6c93.firebaseapp.com",
    databaseURL: "https://chat-e6c93-default-rtdb.firebaseio.com",
    projectId: "chat-e6c93",
    storageBucket: "chat-e6c93.firebasestorage.app",
    messagingSenderId: "131547791719",
    appId: "1:131547791719:web:2f567033f028810345afc2",
    measurementId: "G-VY49LNJJLG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, 'messages/');

const storedNickname = localStorage.getItem('nickname');
if (storedNickname) {
    showRules(storedNickname);
} else {
    document.getElementById('nickname-button').addEventListener('click', function() {
        const nickname = document.getElementById('nickname-input').value.trim();
        if (nickname) {
            localStorage.setItem('nickname', nickname);
            showRules(nickname);
        }
    });
}

function showRules(nickname) {
    document.getElementById('nickname-container').style.display = 'none';
    document.getElementById('rules-container').style.display = 'block';

    document.getElementById('accept-button').addEventListener('click', function() {
        document.getElementById('rules-container').style.display = 'none';
        showChat(nickname);
    });

    document.getElementById('reject-button').addEventListener('click', function() {

        localStorage.removeItem('nickname');
        document.getElementById('nickname-container').style.display = 'block';
        document.getElementById('rules-container').style.display = 'none';
    });
}

function showChat(nickname) {
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('input-container').style.display = 'flex';
    document.querySelector('.back-button').style.display = 'block';  

    document.getElementById('chat-container').innerHTML = 
        `<div class="message bot"><img src="https://voucan-us4.github.io/ai/logo.png" alt="Global Chat Logo">Hello, ${nickname}! Share your thoughts with the world.</div>`;

    onChildAdded(chatRef, function(snapshot) {
        const messageData = snapshot.val();
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', messageData.user === nickname ? 'user' : 'bot');

        const userAvatar = messageData.user === 'bot' ? 
            '<img src="https://voucan-us4.github.io/ai/logo.png" alt="Bot Icon">' : 
            '<img src="https://voucan-us4.github.io/ai/guest.png" alt="Guest Icon">';

        const escapedText = escapeHtml(messageData.text);

        newMessage.innerHTML = userAvatar + `<span class="nickname">${messageData.user}</span>${escapedText}`;

        document.getElementById('chat-container').appendChild(newMessage);
        document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
    });

    document.querySelector('.back-button').addEventListener('click', function() {
        localStorage.removeItem('nickname'); 
        document.getElementById('nickname-container').style.display = 'block';
        document.getElementById('chat-container').style.display = 'none';
        document.getElementById('input-container').style.display = 'none';
        document.querySelector('.back-button').style.display = 'none';  
    });
}

document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        const nickname = localStorage.getItem('nickname');
        const newMessageRef = ref(db, 'messages/' + Date.now());
        set(newMessageRef, {
            user: nickname,
            text: userInput
        });

        document.getElementById('user-input').value = '';
    }
});
