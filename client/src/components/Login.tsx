import React, { useState } from "react";
import Input from "./Input";
import { User } from "../types";

type LoginProps = {
    login: (username: string, password: string) => void
    logout: () => void
    currentUser: null | User
    isError: boolean
}
export default function Login({ login, logout, currentUser, isError }: LoginProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const isLogin = currentUser !== null;

    const handleLogin = () => {
        login(email, password)
    }

    const handleLogout = () => {
        logout()
        setPassword("")
        setEmail("")
    }

    const loginBtn = isLogin ?
        <div className="text-white bg-purple-100 px-3.5 py-3 rounded-[14px] hover:bg-purple-80 cursor-pointer"
             onClick={handleLogout}>Log out
        </div> :
        <div className="text-white bg-purple-100 px-3.5 py-3 rounded-[14px] hover:bg-purple-80 cursor-pointer"
             onClick={handleLogin}>Log in
        </div>

    const content = isLogin ? <div className="m-auto">Hello {currentUser?.name}</div> :
        <div className="flex gap-2">
            <Input value={email} placeholder={"Email"} isError={isError} setValue={(value) => setEmail(value)}/>
            <Input value={password} placeholder={"Password"} isError={isError} setValue={(value) => setPassword(value)}/>
        </div>

    return (
        <div className="flex gap-3 items-start">
            {content}
            {loginBtn}
        </div>
    )
}