import { recipes } from '../data/recipes.js'
import { createCardDOM } from './utils/recipeCard.js'
import { SearchBar } from './objects/SearchBar.js'
import { SearchList } from './objects/SearchList.js'
import { SearchObserver } from './observers/SearchObserver.js'

const recipesDOMContainer = document.querySelector('.recipe-container')
const filters = new Map()
filters.set('ingredients', new SearchList('ingredients'))
filters.set('appliance', new SearchList('appliance'))
filters.set('ustensils', new SearchList('ustensils'))
const searchBar = new SearchBar({
  input: 'searchbar',
  cross: '.searchbar .cross'
})
const searchObs = new SearchObserver({
  tags: 'tags',
  counter: 'counter',
  searchbar: 'searchbar',
  recipes,
  filters
})

recipes.forEach(item => {
  item.DOM = createCardDOM(item)
  recipesDOMContainer.appendChild(item.DOM)
  item.ingredients.map(ing => filters.get('ingredients').populateList(ing.ingredient))
  item.ustensils.map(ust => filters.get('ustensils').populateList(ust))
  filters.get('appliance').populateList(item.appliance)
})

filters.forEach(filt => {
  filt.init()
  filt.subscribe(searchObs)
})
searchBar.init()
searchBar.subscribe(searchObs)
