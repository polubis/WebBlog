const form = {
  nick: "",
  pass: "",
}

const proxyForm = new Proxy(form, {
  get: function (obj, prop) {
    if (prop === "pass") {
      return undefined
    }

    return Reflect.get(obj, prop)
  },
})

proxyForm.nick = "john"

console.log(proxyForm.nick)
