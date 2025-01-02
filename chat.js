import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

console.log('Firebase SDK loaded');

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

console.log('Initializing Firebase');
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, 'triangulet/');

console.log('Firebase initialized, waiting for messages...');

function escapeHtml(text) {
    var element = document.createElement('div');
    if (text) {
        element.innerText = text;
        element.textContent = text;
    }
    return element.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');

    const username = "User";

    function appendMessage(sender, text) {
        console.log('Appending message:', text);
        const escapedText = escapeHtml(text);

        chatContainer.innerHTML += `
            <div class="chat-message" style="display: flex; align-items: flex-start; margin-bottom: 15px; gap: 10px;">
                <img src="https://i.ibb.co/5GBHSTB/Triangulet-Game-Logo.png" 
                     alt="User Icon" 
                     style="width: 50px; height: 50px; margin-right: 10px; border-radius: 0;">
                <div style="display: flex; flex-direction: column;">
                    <strong style="font-size: 1.2em; color: white; margin-bottom: 5px;">User</strong>
                    <span style="color: white; font-size: 1em;">${escapedText}</span>
                </div>
            </div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    onChildAdded(chatRef, (snapshot) => {
        const message = snapshot.val();
        appendMessage('User', message.text);  
    });

    async function sendMessage() {
        const text = userInput.value.trim();
        if (text === '') return;

        const newMessage = { text, username };

        try {
            await push(chatRef, newMessage);
            userInput.value = ''; 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
