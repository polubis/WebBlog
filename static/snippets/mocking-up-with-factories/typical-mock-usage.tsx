// users.service.ts

import axios, { AxiosResponse } from "axios"
import { USERS_MOCK } from "./typical-mock"

// Backend is not ready so we are mocking backend endpoint.
export const getUsers = (): Promise<User[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(USERS_MOCK)
    }, 1500)
  })
}

// This is already implemented by backend, so mock is not needed.
export const getUser = (id: User["id"]): Promise<AxiosResponse<User>> => {
  return axios.get("/users" + id)
}

// users.tsx

import React, { useState, useEffect } from "react"
import { User } from "./user"

export const UsersFeature = () => {
  const [users, setUsers] = useState<User[]>([])

  // Calling endpoint and rendering users.
  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const { data } = await getUsers()
        setUsers(data)
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
