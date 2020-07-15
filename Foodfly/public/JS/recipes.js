const recipes = document.querySelectorAll('.item');

for (const recipe of recipes) {
    recipe.addEventListener('click', () => {
        const str = recipe.getAttribute('id');
        const id = str.match(/(\d+)/);
        window.location = `/receitas/${id[0]}`;
    });
}
