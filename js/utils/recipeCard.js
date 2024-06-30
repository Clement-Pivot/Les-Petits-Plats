export function createCardDOM (recipe) {
  const article = document.createElement('article')
  article.id = recipe.id
  article.classList.add('recipe-card')

  const img = document.createElement('img')
  img.setAttribute('src', `docs/public/img/${recipe.image}`)
  img.setAttribute('alt', `Photo de ${recipe.name}`)
  article.appendChild(img)

  const divRecipe = document.createElement('div')
  divRecipe.classList.add('recipe')
  article.appendChild(divRecipe)

  const time = document.createElement('p')
  time.classList.add('recipe__time')
  time.textContent = `${recipe.time} min`
  divRecipe.appendChild(time)

  const title = document.createElement('h4')
  title.classList.add('recipe__title')
  title.textContent = recipe.name
  divRecipe.appendChild(title)

  const recipeCategoryDesc = document.createElement('h5')
  recipeCategoryDesc.classList.add('recipe__category')
  recipeCategoryDesc.textContent = 'Recette'
  divRecipe.appendChild(recipeCategoryDesc)

  const description = document.createElement('p')
  description.classList.add('recipe__description')
  description.textContent = recipe.description
  divRecipe.appendChild(description)

  const recipeCategoryIng = document.createElement('h6')
  recipeCategoryIng.classList.add('recipe__category')
  recipeCategoryIng.textContent = 'Ingrédients'
  divRecipe.appendChild(recipeCategoryIng)

  const divIngredients = document.createElement('div')
  divIngredients.classList.add('ingredient')

  recipe.ingredients.forEach(ingredient => {
    const divIngredientItem = document.createElement('div')
    divIngredientItem.classList.add('ingredient__item')

    const ingredientType = document.createElement('p')
    ingredientType.classList.add('ingredient__type')
    ingredientType.textContent = ingredient.ingredient
    divIngredientItem.appendChild(ingredientType)

    if (ingredient.quantity) {
      const ingredientQuantity = document.createElement('p')
      ingredientQuantity.classList.add('ingredient__quantity')
      ingredientQuantity.textContent = ingredient.unit ? `${ingredient.quantity} ${ingredient.unit}` : ingredient.quantity
      divIngredientItem.appendChild(ingredientQuantity)
    }

    divIngredients.appendChild(divIngredientItem)
  })
  divRecipe.appendChild(divIngredients)

  return (article)
}
