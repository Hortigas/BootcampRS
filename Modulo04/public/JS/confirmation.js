const deleteButton = document.getElementById('delete');
const form = document.getElementById('formDelete');
const modal = document.querySelector('.wrapperConfirm');
const confirm = document.getElementById('confirm');
const cancel = document.getElementById('cancel');

deleteButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    confirm.addEventListener('click', () => {
        form.submit();
        modal.classList.add('hidden');
    });
    cancel.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});
