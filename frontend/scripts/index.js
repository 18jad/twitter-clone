
/* 
    Modal: 
        -Open and close modal
        -Switch between modals
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