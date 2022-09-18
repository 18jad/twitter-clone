// Elements constants
const tweetModalContainer = document.querySelector('.tweet-modal-container'),
    tweetModal = document.querySelector('.tweet-modal'),
    openTweetModalBtn = document.querySelector('.tweet-btn'),
    closeTweetModalBtn = document.getElementById('closeModal'),
    uploadImageBtn = document.getElementById('imageBtn'),
    uploadImageInput = document.getElementById('uploadedImageInput'),
    uploadedImage = document.getElementById('uploadedImage'),
    tweetTextAreas = [document.getElementById('tweetTextArea'), document.getElementById('modalTweetTextArea')];


let user_id;
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

let uploadedImageName,
    uploadedImageType,
    uploadedImageSize,
    base64Image;

// to read and get image base64
const imageReader = new FileReader();

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
            uploadedImage.src = "";
            throw new Error('No image uploaded');
        }
        // if a file is chosen store some info about it and change button text
        if (uploadImageInput.value && uploadImageInput.value.trim().length > 0 && uploadImageInput.files.length > 0) {
            imageReader.readAsDataURL(uploadImageInput.files[0]);
            base64Image = imageReader.result;
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
        if (input.style.background == "rgba(247, 65, 65, 0.2)") {
            input.style.border = "1px solid transparent";
            input.style.background = "var(--white)";
        }
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
    Sign out button
*/

const signOutBtn = document.getElementById('signOutBtn');

const delete_cookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const redirectToLanding = () => {
    if (document.cookie.indexOf('auth_token=') == -1) {
        window.location = '/twitter-clone/frontend/';
    }
}

const signOut = () => {
    delete_cookie('auth_token');
    delete_cookie('user_id');
    redirectToLanding();
}

signOutBtn.onclick = signOut;


/*

    Load user info:
        - Load username and name on page load

*/

const fullNameText = document.getElementById('fullName'),
    usernameText = document.getElementById('username');

const getUserDetails = (user_id) => {
    fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${user_id}`)
        .then(res => res.json())
        .then((data) => {
            fullNameText.textContent = data.fullName;
            usernameText.textContent = `@${data.username}`;
        })
}

window.onload = () => {
    if (document.cookie.indexOf('auth_token=') == -1) {
        window.location = '/twitter-clone/frontend/';
    } else {
        user_id = getCookie('user_id');
        getUserDetails(user_id)
    }
}

/*
    Tweets:
        - Check user text field
        - Check if user uploaded an iamge
        - Create tweet and store it into database linked to user_id
        - Load tweets on screen
*/

let tweetElement;

const tweetForm = document.getElementById('post_form'),
    tweetTextArea = document.getElementById('tweetTextArea'),
    modalTweetForm = document.getElementById('modal_post_form'),
    modalTweetTextArea = document.getElementById('modalTweetTextArea')

const createTweet = (user_id, text, image = undefined) => {
    if (text.length <= 0) return;
    const settings = {
        method: 'POST',
        body: new URLSearchParams({
            user_id,
            "tweet_text": text,
            "tweet_image": image
        })
    }
    fetch('/twitter-clone/backend/tweet.php', settings)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}

tweetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let tweetText = tweetTextArea.value;
    let tweetImage = uploadImageInput.files[0] || null;
    createTweet(user_id, tweetText, tweetImage);
})

modalTweetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let tweetText = modalTweetTextArea.value;
    createTweet(user_id, tweetText);
})

// load tweets