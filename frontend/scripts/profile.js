
// Toast message

const toast = document.querySelector(".toast"),
    closeIcon = document.querySelector(".close"),
    progress = document.querySelector(".progress"),
    toastHead = document.getElementById("toast-head"),
    toastBody = document.getElementById("toast-body");

const showToast = (headMessage, bodyMessage) => {
    toastHead.textContent = headMessage;
    toastBody.textContent = bodyMessage;
    toast.classList.add("active");
    progress.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);

    setTimeout(() => {
        progress.classList.remove("active");
    }, 3000);
}

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
 *      - Check if user is viewing other profile
 *      - Check if user is viewing his own profile
 *      - Check if blocked or no
 */

const url = window.location.search,
    urlParams = new URLSearchParams(url),
    userIdParam = urlParams.get('user_id'),
    usernameParam = urlParams.get('username'),
    newName = document.getElementById('newName'),
    newUsername = document.getElementById('newUsername'),
    newBio = document.getElementById('newBio'),
    editForm = document.querySelector('.edit-profile-form'),
    fullNameText = document.getElementById('fullName'),
    usernameText = document.getElementById('username'),
    bioText = document.querySelector('.bio-text'),
    bioFullName = document.getElementById('bioFullName'),
    bioUsername = document.getElementById('bioUsername'),
    headerName = document.querySelector('.header-name'),
    editResult = document.getElementById('edit-result'),
    followingCounter = document.querySelector('.following-counter'),
    followersCounter = document.querySelector('.followers-counter'),
    followBtn = document.getElementById('followUser'),
    blockBtn = document.querySelector('.blockBtn'),
    blockContainer = document.querySelector('.block-container');


let oldName, oldUsername, oldBio;
let isBlocked = false, userBlocked = false;

const user_id = getCookie('user_id');

if (userIdParam != null && userIdParam && userIdParam != user_id) {
    openEditModal.classList.add('hide-btn');
    fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${user_id}`)
        .then(res => res.json())
        .then((data) => {
            fullNameText.textContent = data.fullName;
            usernameText.textContent = `@${data.username}`;
        })
    const fetchUserInformation = (username) => {
        fetch(`/twitter-clone/backend/getUserInfoUsername.php/?username=${username}`)
            .then(res => res.json())
            .then(data => {
                headerName.textContent = data.username;
                bioFullName.textContent = data.fullName;
                bioUsername.textContent = `@${data.username}`;
                bioText.textContent = data.bioText;
                followingCounter.textContent = data.followings;
                followersCounter.textContent = data.followers;
            })
    }

    fetch(`/twitter-clone/backend/checkBlock.php/?first_user_id=${userIdParam}&second_user_id=${user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.status != 200) {
                showToast("Error", "Error happened.")
            }
            fetch(`/twitter-clone/backend/checkBlock.php/?first_user_id=${user_id}&second_user_id=${userIdParam}`).then(res => res.json()).then(data => {
                userBlocked = data.blocked;
                if (!userBlocked) {
                    fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${userIdParam}`)
                        .then(res => res.json())
                        .then(data => fetchUserInformation(data.username))
                } else {
                    blockContainer.classList.add('show-block-container')
                }
            })
            isBlocked = data.blocked;
            if (!isBlocked) {
                const blockPerson = (user_id, blockedPerson_id) => {
                    const settings = {
                        method: 'POST',
                        body: new URLSearchParams({
                            "user_blocked": blockedPerson_id,
                            "by_who_id": user_id,
                            "auth_token": auth_token
                        })
                    }
                    fetch(`/twitter-clone/backend/block.php`, settings)
                        .then((res) => res.json())
                        .then(data => {
                            let status = data.status;
                            if (status == 200) {
                                showToast("Success", data.message);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3100)
                            } else {
                                showToast("Failed", data.message);
                            }
                        }).catch(e => {
                            showToast("Error", e);
                        })
                }

                blockBtn.addEventListener('click', () => {
                    blockPerson(user_id, userIdParam);
                })
            } else {
                blockBtn.classList.add('hide-btn')
                blockContainer.classList.add('show-block-container');
                blockContainer.querySelector('.block-feed').textContent = "You blocked this user"
                followBtn.classList.add('hide-btn');
                blockBtn.classList.add('hide-btn');
            }
        }).catch(e => {
            showToast("Error", e);
        })
} else {
    followBtn.classList.add('hide-btn');
    blockBtn.classList.add('hide-btn');
    const getUserDetails = (user_id) => {
        fetch(`/twitter-clone/backend/getUserInfo.php/?user_id=${user_id}`)
            .then(res => res.json())
            .then((data) => {
                fetch(`/twitter-clone/backend/getUserInfoUsername.php/?username=${data.username}`).then(res => res.json()).then((data) => {
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
                    followingCounter.textContent = data.followings;
                    followersCounter.textContent = data.followers;
                })
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

    getUserDetails(user_id)

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


}


/*
    Follow:
        - User follow each other
*/

let followingStatus;

if (!isBlocked || !userBlocked) {
    const checkFollow = () => {
        fetch(`/twitter-clone/backend/checkFollow.php/?first_user_id=${user_id}&second_user_id=${userIdParam}`)
            .then(res => res.json())
            .then(data => {
                followingStatus = data.following;
                if (followingStatus) {
                    // unfollow
                    followBtn.textContent = "Following";
                    followBtn.classList.add('following')
                    return true;
                } else {
                    return false;
                }
            })
    }

    const followUser = (following_id, followed_id) => {
        console.log("Test")
        const settings = {
            method: 'POST',
            body: new URLSearchParams({
                'auth_token': auth_token,
                following_id,
                'followed_user_id': followed_id,
            })
        }
        fetch('/twitter-clone/backend/followUser.php', settings)
            .then(res => res.json())
            .then(data => {
                if (data.status == 200) {
                    const userFollow = fullNameText.textContent;
                    showToast('Success', `You have succesfully followed ${userFollow}`)
                    followBtn.textContent = "Following";
                    followBtn.classList.add('following')
                } else {
                    showToast('Error', data.message)
                }
            }).catch(err => {
                showToast('Error', err)
            })
    }

    checkFollow();
    followBtn.addEventListener('click', () => {
        checkFollow();
        if (!followingStatus) {
            followUser(userIdParam, user_id);
        }
    })
}