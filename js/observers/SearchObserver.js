export class SearchObserver {
  constructor (data) {
    this._tagsDOM = document.querySelector(`#${data.tags}`)
    this._counterDOM = document.querySelector(`#${data.counter}`)
    this._searchbarDOM = document.querySelector(`#${data.searchbar}`)
    this._tagsList = new Set()
    this._recipes = data.recipes
  }

  fireList (li) {
    console.log(li)
  }
}
