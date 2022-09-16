const tweetModalContainer = document.querySelector('.tweet-modal-container'),
    tweetModal = document.querySelector('.tweet-modal'),
    openTweetModalBtn = document.querySelector('.tweet-btn'),
    closeTweetModalBtn = document.getElementById('closeModal'),
    uploadImageBtn = document.getElementById('imageBtn'),
    uploadImageInput = document.getElementById('uploadedImageInput');

/*
    Tweet Modal:
        -Open and close function
*/

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

/*
    Upload button:
        - Upload file input
        - Load image name on upload button
        - Load image under text area
*/

let uploadedImageName;

const tirggerUploadImage = () => {
    uploadImageInput.click();
}

uploadImageBtn.addEventListener('click', () => {
    tirggerUploadImage();
    uploadImageInput.onchange = () => {
        if (uploadImageInput.value && uploadImageInput.value.trim().length > 0) {
            let uploadedImagePath = uploadImageInput.value;
            uploadedImageName = uploadedImagePath.split("\\").pop();
            uploadImageBtn.querySelector('.imageFileName').textContent = uploadedImageName;
        }
    }
})