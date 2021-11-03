const storage = localStorage

const Storage = {
  getItem: localStorage.getItem.bind(storage),
  setItem: localStorage.setItem.bind(storage),
  removeItem: localStorage.removeItem.bind(storage),
}

export default Storage
