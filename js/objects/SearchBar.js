export class SearchBar {
  constructor (data) {
    this._input = document.querySelector(`#${data.input}`)
    this._cross = document.querySelector(data.cross)
    this._obs = new Set()
  }

  init () {
    this._input.addEventListener('input', () => {
      if (this._input.value.length > 0) {
        if ([...this._cross.classList].includes('hidden')) {
          this._cross.classList.remove('hidden')
        }
      } else {
        if (![...this._cross.classList].includes('hidden')) {
          this._cross.classList.add('hidden')
        }
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
