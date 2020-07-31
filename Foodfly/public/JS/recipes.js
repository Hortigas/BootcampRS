const recipes = document.querySelectorAll('.item');

for (const recipe of recipes) {
    recipe.addEventListener('click', () => {
        const id = recipe.getAttribute('id');
        let currentPage = window.location.pathname;
        if (currentPage.includes('receitas')) window.location = currentPage + `/${id}`;
        else window.location = currentPage + `receitas/${id}`;
    });
}
