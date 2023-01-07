// users.service.ts

import axios, { AxiosResponse } from "axios"
import { userFactory } from "./users-factory"

// Mocked via function.
export const getUsers = (): Promise<User[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        userFactory().valueOf(),
        userFactory().set("id", 1).valueOf(),
        userFactory().set("id", 2).valueOf(),
      ])
    }, 1500)
  })
}

export const getUser = (id: User["id"]): Promise<AxiosResponse<User>> => {
  return axios.get("/users" + id)
}

// users.tsx

import React, { useState, useEffect } from "react"
import { User } from "./user"

export const UsersFeature = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const users = await getUsers()
        setUsers(users)
      } catch (err: unknown) {}
    }

    handleGetUsers()
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.firstName + user.lastName}</li>
      ))}
    </ul>
  )
}
