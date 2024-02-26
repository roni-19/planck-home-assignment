import { useState } from "react";
import axios from "axios";

export const useLogin = () => {
    const [isError, setIsError] = useState(false)
    const [currentUser, setCurrentUser] = useState<{ username: string, name: string } | null>(null)
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {}, {
                auth: {
                    username,
                    password
                }
            })
            setCurrentUser({ username: response.data.username, name: response.data.name })
        } catch (error) {
            setIsError(true)
        }
    }
    const logout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)
            setCurrentUser(null)
            setIsError(false)
        } catch (error) {
            setIsError(true)
        }
    }

    return { currentUser, logout, login, isError }
}