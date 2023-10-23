import { recipes } from '../data/recipes.js'
import { createCardDOM } from './utils/recipeCard.js'

const recipesDOMContainer = document.querySelector('.recipe-container')
const ingredientList = new Set()
recipes.forEach(item => {
  item.DOM = createCardDOM(item)
  recipesDOMContainer.appendChild(item.DOM)
  item.ingredients.forEach(ingr => {
    if ([...ingredientList].indexOf(ingr.ingredient) < 0) {
      ingredientList.add(ingr.ingredient)
    }
  })
})
