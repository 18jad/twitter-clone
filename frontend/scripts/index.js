const signUpBtn = document.querySelector('.sign-up-btn');
const signUpModal = document.querySelector('.sign-up-modal');
const signInBtn = document.querySelector('.sign-in-btn');
const signInModal = document.querySelector('.sign-in-modal');
const closeSignUpModal = document.getElementById('close_sign_up_modal');
const closeSignInModal = document.getElementById('close_sign_in_modal');

const showModal = (modal) => {
    modal.classList.add('show-modal');
}

const hideModal = (modal) => {
    modal.classList.remove('show-modal');
}

closeSignInModal.onclick = () => hideModal(signInModal)
closeSignUpModal.onclick = () => hideModal(signUpModal)

signUpBtn.addEventListener('click', () => {
    if (signInModal.classList.contains('show-modal')) {
        hideModal(signInModal)
    }
    showModal(signUpModal)
})

signInBtn.addEventListener('click', () => {
    if (signUpModal.classList.contains('show-modal')) {
        hideModal(signUpModal)
    }
    showModal(signInModal)
})