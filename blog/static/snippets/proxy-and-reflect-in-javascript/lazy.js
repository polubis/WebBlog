class Server {
  toString() {
    return "HEAVY!!!"
  }
}

const handle = {}
console.log(handle["server"]) // undefined

class LazyInit {
  get(target, prop, receiver) {
    if (this.server === null) {
      this.server = new Server()
    }
    return this.server
  }

  server = null
}

const handle = new Proxy(Server, new LazyInit())
console.log(handle.server.toString()) // HEAVY!!!
