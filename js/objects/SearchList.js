export class SearchList {
  constructor (data) {
    this._list = new Set()
    this._tags = new Set()
    this._search = document.querySelector(`#${data}-search`)
    this._searchInput = document.querySelector(`#${data}`)
    this._searchExpanded = false
    this._searchList = document.querySelector(`#${data}-search-list`)
    this._searchSelected = document.querySelector(`#${data}-search-selected`)
    this._cross = this._searchInput.parentNode.querySelector('.cross')
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
    this._searchInput.addEventListener('input', () => this.searchInputChange())
    this._cross.addEventListener('click', () => {
      this._searchInput.value = ''
      this.searchInputChange()
    })
    const itemList = [...this._searchList.querySelectorAll('li.item')]
    itemList.forEach(item => {
      item.addEventListener('click', e => this.selectItem(e))
    })
  }

  get list () {
    return this._list
  }

  populateList (data) {
    this._list.add(data)
  }

  searchInputChange () {
    let curr = []
    if (this._searchInput.value.length > 0) {
      if ([...this._cross.classList].includes('hidden')) {
        this._cross.classList.remove('hidden')
      }
      curr = [...this._searchList.querySelectorAll('li.hidden')]
        .filter(item => item.textContent.toLowerCase().includes(this._searchInput.value.toLowerCase()))
        .map(item => item.classList.remove('hidden'))

      curr = [...this._searchList.querySelectorAll('li:not(.hidden)')]
        .filter((item) => !item.textContent.toLowerCase().includes(this._searchInput.value.toLowerCase()))
        .map(item => {
          if (![...item.classList].includes('hidden')) item.classList.add('hidden')
          return item
        })
    } else {
      if (![...this._cross.classList].includes('hidden')) {
        this._cross.classList.add('hidden')
      }
      curr = [...this._searchList.querySelectorAll('li')]
      curr.forEach(item => {
        if ([...item.classList].includes('hidden')) item.classList.remove('hidden')
      })
    }
  }

  selectItem (e) {
    console.log(e.target)
  }
}
