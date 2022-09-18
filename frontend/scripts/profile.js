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
 * Get and update user infromation:
 *      - Get username / fullname / bio
 *      - Update user information inside modal
 */

const newName = document.getElementById('newName'),
    newUsername = document.getElementById('newUsername'),
    newBio = document.getElementById('newBio'),
    editForm = document.querySelector('.edit-profile-form'),
    fullNameText = document.getElementById('fullName'),
    usernameText = document.getElementById('username'),
    bioText = document.querySelector('.bio-text'),
    bioFullName = document.getElementById('bioFullName'),
    bioUsername = document.getElementById('bioUsername'),
    headerName = document.querySelector('.header-name'),
    editResult = document.getElementById('edit-result');

let oldName, oldUsername, oldBio, user_id;

const getUserDetails = (user_id) => {
    fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${user_id}`)
        .then(res => res.json())
        .then((data) => {
            fullNameText.textContent = data.fullName;
            headerName.textContent = data.fullName;
            bioFullName.textContent = data.fullName;
            usernameText.textContent = `@${data.username}`;
            bioUsername.textContent = `@${data.username}`;
            bioText.textContent = data.bioText;
            newName.value = data.fullName;
            oldName = data.fullName;
            newUsername.value = data.username;
            oldUsername = data.username;
            newBio.value = data.bioText;
            oldBio = data.bioText;
        })
}

const updateUserDetails = (newInfo) => {
    const settings = {
        method: 'POST',
        body: newInfo
    }
    console.log(JSON.stringify(settings));
    fetch(`/twitter-clone/backend/updateUserInfo.php`, settings)
        .then(res => res.json())
        .then((data) => {
            let status = data.status;
            if (status == 200) {
                editResult.classList.remove('failed-edit')
                editResult.classList.add('success-edit')
            } else {
                editResult.classList.remove('success-edit')
                editResult.classList.add('failed-edit')
            }
            editResult.textContent = data.message;
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        })
}

window.onload = () => {
    user_id = getCookie('user_id');
    console.log(user_id)
    getUserDetails(user_id)
}

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let updatedInfo = new URLSearchParams({
        'user_id': user_id,
        'auth_token': auth_token,
    });
    if (newUsername.value.length > 0 && newUsername.value != oldUsername) {
        updatedInfo.set('username', newUsername.value);
    }
    if (newBio.value.length > 0 && newBio.value != oldBio) {
        updatedInfo.set('bio', newBio.value);
    }
    if (newName.value.length > 0 && newName.value != oldName) {
        updatedInfo.set('fullname', newName.value);
    }
    console.log(updatedInfo.get('auth_token'))
    updateUserDetails(updatedInfo);
})
