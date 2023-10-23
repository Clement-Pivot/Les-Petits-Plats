export class SearchList {
  constructor (data) {
    this._list = new Set()
    this._search = document.querySelector(`#${data}-search`)
    this._searchExpanded = false
    this._searchList = document.querySelector(`#${data}-search-list`)
  }

  init () {
    this._search.addEventListener('click', e => {
      if (!this._searchExpanded) {
        [...e.target.parentNode.children]
          .filter(node => node.classList.contains('hidden'))
          .map(node => node.classList.remove('hidden'))
        this._searchExpanded = true
      } else {
        [...e.target.parentNode.children]
          .filter(node => node.classList.contains('hideable'))
          .map(node => node.classList.add('hidden'))
        this._searchExpanded = false
      }
    })
  }

  get list () {
    return this._list
  }

  get searchList () {
    return this._searchList
  }

  populateList (data) {
    this._list.add(data)
  }
}
