const modal = document.querySelector('#showRecipe');

function showModal(pos) {
    const obj = document.getElementById(pos);
    modal.appendChild(obj.cloneNode(true));
    document.querySelector('.modal').classList.remove('desativado');
    console.log(modal);
}

function closeModal() {
    modal.innerHTML = '';
    document.querySelector('.modal').classList.add('desativado');
}
