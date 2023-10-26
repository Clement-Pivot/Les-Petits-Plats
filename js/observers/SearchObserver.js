export class SearchObserver {
  constructor (data) {
    this._tagsDOM = document.querySelector(`#${data.tags}`)
    this._counterDOM = document.querySelector(`#${data.counter}`)
    this._searchbarDOM = document.querySelector(`#${data.searchbar}`)
    this._tagsList = new Map()
    this._tagsList.set('ingredient', new Set())
    this._tagsList.set('appliance', new Set())
    this._tagsList.set('ustensils', new Set())
    this._recipesList = data.recipes
    this._hiddenRecipes = []
    this._shownRecipes = this._recipesList
  }

  fire (text, type = 'bar') {
    let working = []
    const startTime = Date.now()
    switch (type) {
      case 'bar':
        console.log('bar')
        break
      case 'ingredients':
      case 'ustensils':
        working = [...this._shownRecipes]
        working = working
          .filter(elem => !elem[type]
            .map(e => e.ingredient !== undefined ? e.ingredient.toLowerCase() : e.toLowerCase())
            .includes(text.toLowerCase()))
        working.forEach(elem => {
          elem.DOM.classList.add('hidden')
          this._hiddenRecipes.push(elem)
        })
        break
      case 'appliance':
        working = [...this._shownRecipes]
        working = working
          .filter(elem => !elem.appliance.toLowerCase()
            .includes(text.toLowerCase()))
        working.forEach(elem => {
          elem.DOM.classList.add('hidden')
          this._hiddenRecipes.push(elem)
        })
        break
      default:
        throw new Error('Error : search type not know.')
    }
    const endTime = Date.now()
    console.log(`Durée de la recherche : ${String(endTime - startTime)}ms`)
    this._shownRecipes = this._recipesList.filter(elem => !this._hiddenRecipes.includes(elem))
    this._counterDOM.textContent = this._shownRecipes.length
    this._counterDOM.textContent += this._shownRecipes.length !== 1 ? ' recettes' : ' recette'
  }
}
