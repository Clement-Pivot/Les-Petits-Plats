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
    console.log(text)
    let working = []
    switch (type) {
      case 'bar':
        console.log('bar')
        break
      case 'ingredient':
        console.log('ingredient')
        this._tagsList.get('ingredient').add(text)
        working = [...this._shownRecipes]
        working
          .filter(elem => !elem.ingredients
            .map(e => e.ingredient.toLowerCase())
            .includes(text.toLowerCase()))
          .map(elem => {
            elem.DOM.classList.add('hidden')
            this._hiddenRecipes.push(elem)
            return elem
          })
        this._shownRecipes = this._shownRecipes.filter(elem => !this._hiddenRecipes.includes(elem))
        break
      case 'appliance':
        console.log('appliance')
        break
      case 'ustensils':
        console.log('ustensils')
        break
      default:
        throw new Error('Error : search type not know.')
    }
    this._counterDOM.textContent = this._shownRecipes.length
    this._counterDOM.textContent += this._shownRecipes.length !== 1 ? ' recettes' : ' recette'
  }
}
