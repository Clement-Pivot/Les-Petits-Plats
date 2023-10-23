import { recipes } from '../data/recipes.js'
import { createCardDOM } from './utils/recipeCard.js'

const recipesDOMContainer = document.querySelector('.recipe-container')
const ingredientList = new Set()
const ingredientSearchList = document.querySelector('#ingredient-search-list')
const applianceList = new Set()
const applianceSearchList = document.querySelector('#appliance-search-list')
const ustensilsList = new Set()

recipes.forEach(item => {
  item.DOM = createCardDOM(item)
  recipesDOMContainer.appendChild(item.DOM)
  item.ingredients.forEach(ingr => {
    if (!ingredientList.has(ingr.ingredient)) {
      ingredientList.add(ingr.ingredient)
    }
  })
  if (!applianceList.has(item.appliance)) {
    applianceList.add(item.appliance)
  }
  item.ustensils.forEach(ust => {
    if (!ustensilsList.has(ust)) {
      ustensilsList.add(ust)
    }
  })
})

ingredientList.forEach(ing => {
  const li = document.createElement('li')
  li.textContent = ing
  ingredientSearchList.appendChild(li)
})

applianceList.forEach(appl => {
  const li = document.createElement('li')
  li.textContent = appl
  applianceSearchList.appendChild(li)
})
