const cards = document.querySelectorAll('.card');
for (let card of cards) {
    card.addEventListener('click', () => {
        const ID = card.getAttribute('id');
        window.location.href = `/curso?id=${ID}`;
    });
}
