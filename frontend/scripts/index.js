
/* 
    Modal: 
        - Open and close modal
        - Switch between modals
*/
const signUpBtn        = document.querySelector('.sign-up-btn'),
      signUpModal      = document.querySelector('.sign-up-modal'),
      signInBtn        = document.querySelector('.sign-in-btn'),
      signInModal      = document.querySelector('.sign-in-modal'),
      closeSignUpModal = document.getElementById('close_sign_up_modal'),
      closeSignInModal = document.getElementById('close_sign_in_modal'),
      signInSwitch     = document.querySelector('.sign-in-switch'),
      signUpSwitch     = document.querySelector('.sign-up-switch');


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

const signUpForm      = document.getElementById("signUpForm"),
      fullName        = document.getElementById('fullName'),
      signUpUsername  = document.getElementById('signUpUsername'),
      signUpEmail     = document.getElementById('signUpEmail'),
      signUpPassword  = document.getElementById('signUpPassword'),
      confirmPassword = document.getElementById('signUpConfirmPassword'),
      signUpResult    = document.getElementById('signUpResult');

const createUser = (fullname, username, email, password, repeatedPassword) => {
    const settings = {
        // full_name, username, email, `password`
        method: 'POST',
        body  : new URLSearchParams({
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
            signUpResult.classList.remove('failed-sign-up');
            signUpResult.classList.add('success-sign-up');
            fullName.value        = ""
            signUpUsername.value  = ""
            signUpEmail.value     = ""
            signUpPassword.value  = ""
            confirmPassword.value = ""
            setTimeout(() => {
                signUpResult.textContent = "";
            }, 3000)
        } else {
            signUpResult.classList.remove('success-sign-up');
            signUpResult.classList.add('failed-sign-up');
        }
        signUpResult.textContent = data.message;
    })
}

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createUser(fullName.value, signUpUsername.value, signUpEmail.value, signUpPassword.value, confirmPassword.value)
})

