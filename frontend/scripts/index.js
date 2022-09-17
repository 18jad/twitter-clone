
/* 
    Modal: 
        - Open and close modal
        - Switch between modals
*/
const signUpBtn = document.querySelector('.sign-up-btn'),
    signUpModal = document.querySelector('.sign-up-modal'),
    signInBtn = document.querySelector('.sign-in-btn'),
    signInModal = document.querySelector('.sign-in-modal'),
    closeSignUpModal = document.getElementById('close_sign_up_modal'),
    closeSignInModal = document.getElementById('close_sign_in_modal'),
    signInSwitch = document.querySelector('.sign-in-switch'),
    signUpSwitch = document.querySelector('.sign-up-switch');


const hideModal = (modal) => {
    modal.classList.remove('show-modal');
}

const showModal = (modal, closeModal = null) => {
    if (modal != null) {
        if (closeModal.classList.contains('show-modal')) {
            hideModal(closeModal)
        }
    }
    modal.classList.add('show-modal');
}

closeSignInModal.onclick = () => hideModal(signInModal)
closeSignUpModal.onclick = () => hideModal(signUpModal)

signUpBtn.addEventListener('click', () => {
    showModal(signUpModal, signInModal)
})

signUpSwitch.addEventListener('click', () => {
    showModal(signUpModal, signInModal)
})

signInBtn.addEventListener('click', () => {
    showModal(signInModal, signUpModal)
})

signInSwitch.addEventListener('click', () => {
    showModal(signInModal, signUpModal)
})

/*
    Sign Up: 
        - Check inputs and apply conditions
        - Fetch api and create new user in database
        - Show success / error message
*/

const signUpForm = document.getElementById("signUpForm"),
    fullName = document.getElementById('fullName'),
    signUpUsername = document.getElementById('signUpUsername'),
    signUpEmail = document.getElementById('signUpEmail'),
    signUpPassword = document.getElementById('signUpPassword'),
    confirmPassword = document.getElementById('signUpConfirmPassword'),
    signUpResult = document.getElementById('signUpResult');

const createUser = (fullname, username, email, password, repeatedPassword) => {
    const settings = {
        // full_name, username, email, `password`
        method: 'POST',
        body: new URLSearchParams({
            "fullname": fullname,
            username,
            email,
            password,
            repeatedPassword
        })
    }
    fetch('/twitter-clone/backend/signup.php', settings).then(res => res.json()).then(data => {
        let status = data.status;
        if (status == 200) {
            signUpResult.classList.remove('failed-sign');
            signUpResult.classList.add('success-sign');
            fullName.value = ""
            signUpUsername.value = ""
            signUpEmail.value = ""
            signUpPassword.value = ""
            confirmPassword.value = ""
            setTimeout(() => {
                signUpResult.textContent = "";
                signUpResult.classList.remove('success-sign');
                signUpResult.classList.remove('failed-sign');
            }, 3000)
        } else {
            signUpResult.classList.remove('success-sign');
            signUpResult.classList.add('failed-sign');
        }
        signUpResult.textContent = data.message;
    })
}

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createUser(fullName.value, signUpUsername.value, signUpEmail.value, signUpPassword.value, confirmPassword.value)
})

/*
    Sign In: 
        - Check inputs and apply conditions
        - Fetch api and get user details from database
        - Show success / error message
*/

const signInForm = document.getElementById('signInForm'),
    signInEmail = document.getElementById('signInEmail'),
    signInPassword = document.getElementById('signInPassword'),
    signInResult = document.getElementById('signInResult');

const logIn = (email, password) => {
    const settings = {
        method: "POST",
        body: new URLSearchParams({
            email,
            password
        })
    }

    fetch('/twitter-clone/backend/signin.php', settings).then(res => res.json()).then(data => {
        let status = data.status;
        if (status == 200) {
            signInResult.classList.remove('failed-sign');
            signInResult.classList.add('success-sign');
            signInEmail.value = ""
            signInPassword.value = ""
            setTimeout(() => {
                window.location = '/twitter-clone/frontend/homepage.html'
                signInResult.textContent = "";
                signInResult.classList.remove('success-sign');
                signInResult.classList.remove('failed-sign');
            }, 3000)
        } else {
            signInResult.classList.remove('success-sign');
            signInResult.classList.add('failed-sign');
        }
        signInResult.textContent = data.message;
    })
}

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    logIn(signInEmail.value, signInPassword.value);
})

/*
    Check if user is logged in if yes redirect to home page
        - Get cookie by name
        - Check auth using cookie
*/

const redirectToHome = () => {
    if (document.cookie.indexOf('auth_token=') > 0 || auth_token != null || auth_token) {
        window.location = '/twitter-clone/frontend/homepage.html';
    }
}

redirectToHome();