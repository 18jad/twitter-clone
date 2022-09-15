//Sign up Pop up
const signupbtn = document.getElementById('signup-btn');
const signupPopup = document.querySelector('.signup-popup');
const popupclose = document.getElementById('popupclose');

signupbtn.onclick = () => signupPopup.classList.add('show');

popupclose.onclick = () => signupPopup.classList.remove('show');

//Sign in pop up
const signinbtn = document.getElementById('signin-btn');
const signinPopup = document.querySelector('.signin-popup');
const signinclose = document.getElementById('signinclose');

signinbtn.onclick = () => signinPopup.classList.add('show');

signinclose.onclick = () => signinPopup.classList.remove('show');