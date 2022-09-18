/**
 * Modal:
 *  - Open and close
 */

const openEditModal = document.querySelector('.web-edit'),
    editModal = document.querySelector('.edit-profile-modal'),
    closeEditModal = document.querySelector('.close-modal');

openEditModal.addEventListener('click', () => {
    editModal.classList.toggle('show-edit-modal');
})

closeEditModal.addEventListener('click', () => {
    editModal.classList.remove('show-edit-modal');
})


/**
 * Get user infromation:
 *      - Get username / fullname / bio
 */

const newName = document.getElementById('newName'),
    newUsername = document.getElementById('newUsername'),
    newBio = document.getElementById('newBio'),
    editForm = document.querySelector('.edit-profile-form'),
    fullNameText = document.getElementById('fullName'),
    usernameText = document.getElementById('username'),
    bioText = document.querySelector('.bio-text'),
    bioFullName = document.getElementById('bioFullName'),
    bioUsername = document.getElementById('bioUsername');

const getUserDetails = (user_id) => {
    fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${user_id}`)
        .then(res => res.json())
        .then((data) => {
            fullNameText.textContent = data.fullName;
            bioFullName.textContent = data.fullName;
            usernameText.textContent = `@${data.username}`;
            bioUsername.textContent = `@${data.username}`;
            bioText.textContent = data.bioText;
            newName.value = data.fullName;
            newUsername.value = data.username;
            newBio.value = data.bioText;
        })
}

window.onload = () => {
    let user_id = getCookie('user_id');
    getUserDetails(user_id)
}
