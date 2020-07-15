const buttonsHide = document.querySelectorAll('.hide');

for (const button of buttonsHide) {
    button.addEventListener('click', () => {
        const id = button.classList[1];
        const text = document.querySelector(`#${id}`);
        text.classList.toggle('hidden');
        text.classList.contains('hidden') ? (button.textContent = 'MOSTRAR') : (button.textContent = 'ESCONDER');
    });
}
