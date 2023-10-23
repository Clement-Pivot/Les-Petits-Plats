export class SearchList {
  constructor (data) {
    this._list = new Set()
    this._tags = new Set()
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
        e.target.parentNode.children[0].querySelector('.chevron').classList.add('rotate')
      } else {
        [...e.target.parentNode.children]
          .filter(node => node.classList.contains('hideable'))
          .map(node => node.classList.add('hidden'))
        this._searchExpanded = false
        e.target.parentNode.children[0].querySelector('.chevron').classList.remove('rotate')
      }
    })
    this._list.forEach(item => {
      const li = document.createElement('li')
      li.classList.add('item')
      li.textContent = item
      this._searchList.appendChild(li)
    })
  }

  get list () {
    return this._list
  }

  populateList (data) {
    this._list.add(data)
  }
}
