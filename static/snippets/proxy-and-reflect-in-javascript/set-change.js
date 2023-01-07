"use strict" // <- Strict mode on.

const form = {
  name: "",
}

const proxyForm = new Proxy(form, {
  set: function (obj, prop, value) {
    if (prop in obj) {
      obj[prop] = value
      return true
    } else {
      return false
    }
  },
})

proxyForm.age = 20 // Uncaught TypeError: 'set' on proxy (form object does not have age property).
proxyForm.name = "Jaroslaw" // That's ok!
