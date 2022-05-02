class User {
  constructor(public name: string, public email: string) {}
}

type Repository<T> = Partial<{
  load(): Promise<T>
}>

class UserRepository implements Repository<User> {
  load(): Promise<User> {
    return new Promise(resolve => {
      resolve({ name: "Piotr", email: "piotr1994@gmail.com" } as User)
    })
  }
}

class UserController {
  user: User | null = null

  constructor(public repo: UserRepository) {}

  handleLoadUser(): Promise<User> {
    return new Promise(async resolve => {
      this.user = await this.repo.load()

      resolve(this.user)
    })
  }
}

// Usage
const userController = new UserController(new UserRepository())
userController.handleLoadUser().then(user => {
  console.log(user)
})
