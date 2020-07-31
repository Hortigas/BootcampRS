const ingredientsItem = document.getElementById('itemIngredients');
const preparationItem = document.getElementById('itemPreparation');

const addIngredient = document.getElementById('addIngredient');
const addPreparation = document.getElementById('addPreparation');

addIngredient.addEventListener('click', () => {
    let newIngredient = document.createElement('input');
    newIngredient.setAttribute('name', 'ingredients[]');
    ingredientsItem.insertBefore(newIngredient, addIngredient);
});
addPreparation.addEventListener('click', () => {
    let newPreparation = document.createElement('input');
    newPreparation.setAttribute('name', 'preparation[]');
    preparationItem.insertBefore(newPreparation, addPreparation);
});
