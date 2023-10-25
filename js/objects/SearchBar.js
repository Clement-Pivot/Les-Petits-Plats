export class SearchBar {
  constructor (data) {
    this._input = document.querySelector(`#${data.input}`)
    this._cross = document.querySelector(data.cross)
    this._obs = new Set()
  }

  init () {
    this._input.addEventListener('input', () => {
      if (this._input.value.length > 0) {
        this._cross.classList.remove('hidden')
        this._obs.forEach(obs => obs.fire(this._input.value))
      } else {
        this._cross.classList.add('hidden')
      }
    })
    this._cross.addEventListener('click', () => {
      this._input.value = ''
      this._cross.classList.add('hidden')
    })
  }

  subscribe (obs) {
    this._obs.add(obs)
  }
}
