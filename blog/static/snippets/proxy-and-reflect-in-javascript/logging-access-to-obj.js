const obj = {
  name: "Jonh",
  last: "Smith",
}

const objProxy = new Proxy(obj, {
  get: function (obj, prop) {
    /** Send information to another module. */
    console.log(`${prop} readed`)

    return obj[prop]
  },
})

const nameRead = objProxy.name // Name readed.
