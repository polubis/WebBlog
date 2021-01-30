class User {
  name: string
  email: string

  loadUser(): Promise<User> {
    return new Promise(resolve => {
      resolve({ name: "Piotr", email: "piotr1994@gmail.com" } as User)
    })
  }

  setUser(name: string, email: string): void {
    this.name = name
    this.email = email
  }
}

// Usage
const user = new User()

user.loadUser().then(({ name, email }) => {
  user.setUser(name, email)

  console.log(user.name)
  console.log(user.email)
})
