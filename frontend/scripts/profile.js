const openEditModal = document.querySelector('.web-edit'),
    editModal = document.querySelector('.edit-profile-modal'),
    closeEditModal = document.querySelector('.close-modal');

openEditModal.addEventListener('click', () => {
    editModal.classList.toggle('show-edit-modal');
})

closeEditModal.addEventListener('click', () => {
    editModal.classList.remove('show-edit-modal');
})