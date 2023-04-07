const form = {
  name: "",
  last: "",
  age: null,
}

const proxyForm = new Proxy(form, {
  set: function (obj, prop, value) {
    if (prop === "age" && value < 0) {
      throw Error(`Age cannot be ${value}, is less than 0!`)
    }

    if (prop in obj) {
      obj[prop] = value
      return true
    } else {
      return false
    }
  },
})

proxyForm.age = -1 // Uncaught Error: Age cannot be -1, is less than 0!
proxyForm.age = 2

console.log(proxyForm.age) // 2
