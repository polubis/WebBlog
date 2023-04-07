const ProtectedObject = {
  name: "John",
  last: "Smith",
  age: 30,
}

const Handler = {
  get: function (target, property) {
    if (property.includes("_")) {
      return property
        .split("_")
        .map(prop => `${prop}: ${target[prop]}`)
        .join("\n")
    }

    return target[property]
  },
}

const ProxyProtectedObject = new Proxy(ProtectedObject, Handler)

console.log(ProxyProtectedObject.name_last_age) // name: John, last: Smith, age: 30
