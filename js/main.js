import { recipes } from '../data/recipes.js'
import { createCardDOM } from './utils/recipeCard.js'

const recipesDOMContainer = document.querySelector('.recipe-container')
const ingredientList = new Set()
const applianceList = new Set()
const ustensilsList = new Set()
recipes.forEach(item => {
  item.DOM = createCardDOM(item)
  recipesDOMContainer.appendChild(item.DOM)
  item.ingredients.forEach(ingr => {
    if ([...ingredientList].indexOf(ingr.ingredient) < 0) {
      ingredientList.add(ingr.ingredient)
    }
  })
  if ([...applianceList].indexOf(item.appliance) < 0) {
    applianceList.add(item.appliance)
  }
  item.ustensils.forEach(ust => {
    if ([...ustensilsList].indexOf(ust) < 0) {
      ustensilsList.add(ust)
    }
  })
})
