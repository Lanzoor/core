"use strict";
let welcomeHeader = document.getElementById('welcome-header');
let welcomeButtons = document.getElementById('welcome-buttons');
let profileButton = document.getElementById('profile-button');
let navigationButton = document.getElementById('navigation-button');
let welcomeDown = document.getElementById('welcome-down');
document.addEventListener('DOMContentLoaded', () => {
    welcomeHeader.classList.add('active');
    setTimeout(() => {
        welcomeButtons.classList.add('active');
        profileButton.addEventListener('click', () => {
            window.location.href = './profile/index.html';
        });
        setTimeout(() => {
            welcomeDown.classList.add('active');
            document.body.classList.add('active');
        }, 1000);
    }, 1000);
});
