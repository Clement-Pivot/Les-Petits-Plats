export class SearchBar {
  constructor (data) {
    this._input = document.querySelector(`#${data.input}`)
    this._cross = document.querySelector(data.cross)
    this._obs = new Set()
  }

  init () {
  }

  subscribe (obs) {
    this._obs.add(obs)
  }
}
