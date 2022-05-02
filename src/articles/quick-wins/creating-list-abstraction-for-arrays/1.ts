type IdObject = { id: string } 

interface Listable<T extends IdObject> {
  toArray(): T[]
}

interface User {
  id: string
  firstName: string
}

// Simple but fast

class List<T extends IdObject> implements Listable<T> {
  private _array: T[]

  constructor(array: T[] = []) {
    this._array = array
  }

  toArray = () => this._array
}

const usersList = new List<User>()
