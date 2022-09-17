// Elements constants
const tweetModalContainer = document.querySelector('.tweet-modal-container'),
    tweetModal = document.querySelector('.tweet-modal'),
    openTweetModalBtn = document.querySelector('.tweet-btn'),
    closeTweetModalBtn = document.getElementById('closeModal'),
    uploadImageBtn = document.getElementById('imageBtn'),
    uploadImageInput = document.getElementById('uploadedImageInput'),
    uploadedImage = document.getElementById('uploadedImage'),
    tweetTextAreas = document.querySelectorAll('#tweetTextArea');

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
    Tweeting section;
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

/* 
    Tweeting section;
        Text input:
            - Resize the height based on content and text input
            - Add red effect when reaching max characters (280)
*/

const resizeOnInput = (input) => {
    // if textarea is empty set initial height to 44
    input.style.height = "44px";
    // increase height based on textarea scrollHeight
    input.style.height = (input.scrollHeight) + "px";
    // if height is bigger than max height enable scrolling bar else disable it
    if (parseInt(input.style.height.split('px')[0]) >= parseInt(input.style.maxHeight.split('px')[0])) {
        input.style.overflowY = "auto";
    } else {
        input.style.overflowY = "hidden";
    }
}

const checkMaxCharacters = (input) => {
    // check if we reached max characters if yes show red effect
    if (input.value.length == input.maxLength) {
        input.style.background = "rgba(247, 65, 65, 0.2)";
        input.style.borderColor = "red";
    } else {
        // remove red effect
        input.style.border = "1px solid transparent";
        input.style.background = "var(--white)";
    }
}

tweetTextAreas.forEach(textArea => {
    textArea.setAttribute("style", "height:" + (textArea.scrollHeight) + "px; max-height: 400px; overflow: hidden;");
    textArea.addEventListener("input", () => {
        resizeOnInput(textArea);
        checkMaxCharacters(textArea);
    }, false);
})


/*
    Tweets:
        -Tweet anmation when entering the screen
*/

const tweets = document.querySelectorAll('.tweet');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-tweet')
        } else {
            entry.target.classList.remove('show-tweet')
        }
    })
})

tweets.forEach(tweet => observer.observe(tweet))