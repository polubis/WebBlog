const form = {
  nick: "",
  pass: "",
}

const proxyForm = new Proxy(form, {
  get: function (obj, prop) {
    if (prop === "pass") {
      return undefined
    }

    if (prop in obj) {
      return obj[prop]
    }

    return undefined
  },
})

proxyForm.nick = "john"
proxyForm.pass = "qwerty"

console.log(proxyForm.pass) // undefined
