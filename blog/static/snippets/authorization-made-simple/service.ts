interface LogInModel {
  authorized: boolean
}

// Simple log in service function to mock log in call.
const logIn = (success = true, timeout = 3000): Promise<LogInModel> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ authorized: true })
      } else {
        reject({ message: "Fatal error" })
      }
    }, timeout)
  })
}

export type { LogInModel }

export { logIn }
