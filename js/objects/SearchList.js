export class SearchList {
  constructor (data) {
    this._type = data
    this._list = new Set()
    this._tags = new Set()
    this._search = document.querySelector(`#${data}-search`)
    this._searchInput = document.querySelector(`#${data}`)
    this._searchExpanded = false
    this._searchList = document.querySelector(`#${data}-search-list`)
    this._searchSelected = document.querySelector(`#${data}-search-selected`)
    this._cross = this._searchInput.parentNode.querySelector('.cross')
    this._obs = new Set()

    this._tagCross = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this._tagCross.setAttribute('width', '14')
    this._tagCross.setAttribute('height', '13')
    this._tagCross.setAttribute('viewBox', '0 0 14 13')
    this._tagCross.setAttribute('fill', 'none')
    this._tagCross.classList.add('tag-cross')
    const tagCrossPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    tagCrossPath.setAttribute('d', 'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5')
    tagCrossPath.setAttribute('stroke', '#1B1B1B')
    tagCrossPath.setAttribute('stroke-width', '2.16667')
    tagCrossPath.setAttribute('stroke-linecap', 'round')
    tagCrossPath.setAttribute('stroke-linejoin', 'round')
    this._tagCross.append(tagCrossPath)

    this._liCross = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this._liCross.setAttribute('width', '17')
    this._liCross.setAttribute('height', '17')
    this._liCross.setAttribute('viewBox', '0 0 17 17')
    this._liCross.setAttribute('fill', 'none')
    this._liCross.classList.add('li-cross')
    const liCrossCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    liCrossCircle.setAttribute('cx', '8.5')
    liCrossCircle.setAttribute('cy', '8.5')
    liCrossCircle.setAttribute('r', '8.5')
    liCrossCircle.setAttribute('fill', 'black')
    this._liCross.append(liCrossCircle)
    const liCrossPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    liCrossPath.setAttribute('d', 'M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11')
    liCrossPath.setAttribute('stroke', '#FFD15B')
    liCrossPath.setAttribute('stroke-linecap', 'round')
    liCrossPath.setAttribute('stroke-linejoin', 'round')
    this._liCross.append(liCrossPath)
  }

  init () {
    this._search.addEventListener('click', e => this.toggleList(e))
    this._list.forEach(item => {
      const li = document.createElement('li')
      li.classList.add('item')
      li.classList.add(this._type)
      li.setAttribute('tabindex', '0')
      li.textContent = item
      li.append(this._liCross.cloneNode(true))
      li.append(this._tagCross.cloneNode(true))
      this._searchList.appendChild(li)
      li.addEventListener('click', e => this.selectItem(e))
    })
    this._searchInput.addEventListener('input', () => this.searchInputChange())
    this._cross.addEventListener('click', () => {
      this._searchInput.value = ''
      this.searchInputChange()
    })
    document.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        let focus = document.querySelector(':focus')
        if (focus !== null) {
          if (focus.classList.contains('item')) {
            focus = focus.childNodes[0].textContent
            if (this._list.has(focus)) {
              e.preventDefault()
              e.stopPropagation()
              this.selectItem(e)
            }
          } else if (focus === this._search) {
            e.preventDefault()
            e.stopPropagation()
            this.toggleList(e)
          }
        }
      }
    })
  }

  get list () {
    return [...this._list]
  }

  get type () {
    return this._type
  }

  subscribe (obs) {
    this._obs.add(obs)
  }

  populateList (data) {
    if (!this.list.some(ing => {
      return ing.toLowerCase().slice(0, -1).includes(data.toLowerCase()) ||
        ing.toLowerCase().includes(data.toLowerCase().slice(0, -1)) ||
        ing.toLowerCase().includes(data.toLowerCase())
    })) {
      this._list.add(data)
    }
  }

  searchInputChange () {
    let curr = []
    if (this._searchInput.value.length > 0) {
      this._cross.classList.remove('hidden')
      curr = [...this._searchList.querySelectorAll('li.hidden')]
        .filter(item => item.textContent.toLowerCase()
          .includes(this._searchInput.value.toLowerCase()))
        .map(item => item.classList.remove('hidden'))

      curr = [...this._searchList.querySelectorAll('li:not(.hidden)')]
        .filter((item) => !item.textContent.toLowerCase()
          .includes(this._searchInput.value.toLowerCase()))
        .map(item => {
          if (![...item.classList].includes('hidden')) item.classList.add('hidden')
          return item
        })
    } else {
      this._cross.classList.add('hidden')
      curr = [...this._searchList.querySelectorAll('li')]
      curr.forEach(item => {
        if ([...item.classList].includes('hidden')) item.classList.remove('hidden')
      })
    }
  }

  selectItem (e) {
    let selected = e.target
    const text = selected.childNodes[0].textContent
    if (selected.parentNode.classList.contains('searchlist__tags')) {
      selected = [...document.querySelectorAll(`.searchlist__selected .${this._type}`)]
        .find(node => node.childNodes[0].textContent === text)
    }
    selected.remove()
    if (!this._tags.has(text)) {
      this._searchSelected.append(selected)
      this._tags.add(text)
      this._obs.forEach(obs => obs.fire(text, this._type))
      document.querySelector('#tags').classList.remove('hidden')
      const selectedClone = selected.cloneNode(true)
      document.querySelector('#tags').append(selectedClone)
      selectedClone.addEventListener('click', e => this.selectItem(e))
    } else {
      this._tags.delete(text)
      this._searchList.append(selected)
      this._obs.forEach(obs => obs.fire(text, 'refresh'))
      const allTags = [...document.querySelectorAll('#tags li')]
      allTags.find(e => e.childNodes[0].textContent === text).remove()
      if (document.querySelectorAll('#tags li').length === 0) {
        document.querySelector('#tags').classList.add('hidden')
      }
    }
  }

  clearList () {
    const liList = [...this._searchList.querySelectorAll('li')]
    liList.forEach(item => item.classList.add('unavailable'))
  }

  availItem (item) {
    const liList = [...this._searchList.querySelectorAll('li')]
    if (Array.isArray(item)) {
      item.forEach(elem => {
        if (elem.ingredient) {
          // TODO : optimiser ici
          if (liList.find(li => li.textContent === elem.ingredient)) {
            liList.find(li => li.textContent === elem.ingredient).classList.remove('unavailable')
          }
        } else {
          if (liList.find(li => li.textContent === elem)) {
            liList.find(li => li.textContent === elem).classList.remove('unavailable')
          }
        }
      })
    } else {
      if (liList.find(li => li.textContent === item)) {
        liList.find(li => li.textContent === item).classList.remove('unavailable')
      }
    }
  }

  toggleList (e) {
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
  }
}
