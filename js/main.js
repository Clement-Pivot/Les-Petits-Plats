import { recipes } from '../data/recipes.js'
import { createCardDOM } from './utils/recipeCard.js'

const recipesDOMContainer = document.querySelector('.recipe-container')
recipes.forEach(item => {
  item.DOM = createCardDOM(item)
  recipesDOMContainer.appendChild(item.DOM)
})
