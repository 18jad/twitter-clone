const tweetModalContainer = document.querySelector('.tweet-modal-container'),
    tweetModal = document.querySelector('.tweet-modal'),
    openTweetModalBtn = document.querySelector('.tweet-btn'),
    closeTweetModalBtn = document.getElementById('closeModal');

let modalOpen = false;

const openModal = () => {
    if (!modalOpen) {
        tweetModalContainer.classList.add('show-modal-container');
        tweetModal.classList.add('show-modal');
        modalOpen = true;
    } else {
        throw new Error('Modal already opened');
    }
}

const closeModal = () => {
    if (modalOpen) {
        tweetModalContainer.classList.remove('show-modal-container');
        tweetModal.classList.remove('show-modal');
        modalOpen = false;
    } else {
        throw new Error('Modal is not opened');
    }
}

openTweetModalBtn.addEventListener('click', openModal);
closeTweetModalBtn.addEventListener('click', closeModal);