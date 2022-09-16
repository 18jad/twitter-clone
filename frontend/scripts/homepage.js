const tweetModalContainer = document.querySelector('.tweet-modal-container'),
    tweetModal = document.querySelector('.tweet-modal'),
    openTweetModalBtn = document.querySelector('.tweet-btn'),
    closeTweetModalBtn = document.getElementById('closeModal'),
    uploadImageBtn = document.getElementById('imageBtn'),
    uploadImageInput = document.getElementById('uploadedImageInput'),
    uploadedImage = document.getElementById('uploadedImage');

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

let uploadedImageName, uploadedImageType, uploadedImageSize;

// click hidden file input
const tirggerUploadImage = () => {
    uploadImageInput.click();
}

// update button text to file name
const updateBtnName = (name) => {
    uploadImageBtn.querySelector('.imageFileName').textContent = name;
}

uploadImageBtn.addEventListener('click', () => {
    tirggerUploadImage();
    uploadImageInput.onchange = () => {
        // store uploaded file infos
        const [uploadedFileDetails] = uploadImageInput.files;
        // if file is empty return 
        if (uploadImageInput.files.length == 0) {
            uploadedImageName = null;
            updateBtnName("No image uploaded");
            throw new Error('No image uploaded');
        }
        // if a file is chosen store some info about it and change button text
        if (uploadImageInput.value && uploadImageInput.value.trim().length > 0 && uploadImageInput.files.length > 0) {
            uploadedImageName = uploadedFileDetails.name || uploadImageInput.value.split("\\").pop();
            uploadedImageType = uploadedFileDetails.type || null;
            uploadedImageSize = uploadedFileDetails.size || null;
            uploadedImage.src = URL.createObjectURL(uploadedFileDetails)
            updateBtnName(uploadedImageName);
        }
    }
})