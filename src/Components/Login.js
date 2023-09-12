import { useState, useEffect } from 'react'
import "../css/Login.css"


const Login = ({ mongodb }) => {
    const [ area, setArea ] = useState("login")
    const [ accounts, setAccounts ] = useState(null)

    useEffect(() => {
        const getAccountCollection = async () => {
            if(mongodb) {
                const accountsCollection = mongodb.db("test").collection("accounts")
            }
        }



    },[])

    if (area === "login") {
        const handleLogin = () => {
            console.log("Login")
        }
        const handleCreateAccount = () => {
            console.log("Create")
            setArea("create")
        }

        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Login</h1>
                    <label>Username</label>
                    <input placeholder="Username"></input>
                    <label>Password</label>
                    <input placeholder="Password"></input>
                    <input type="submit" value="Login" onClick={handleLogin}></input>
                    <input type="submit" value="Create Account" onClick={handleCreateAccount}></input>
                </form>
            </div>
        )
    }
    else if (area === "create") {
        const returnToLogin = () => {
            setArea("login")
        }
        const handleCreateAccount = () => {
            console.log("Creating Account")
        }
        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Create Account</h1>
                    <label>Email</label>
                    <input placeholder="Email"></input>
                    <label>Username</label>
                    <input placeholder="Username"></input>
                    <label>Password</label>
                    <input placeholder="Password"></input>
                    <input type="submit" value="Create Account" onClick={handleCreateAccount}></input>
                    <input type="submit"
                    value="Return to Login" onClick={returnToLogin}></input>
                    
                </form>

            </div>
        )
    }
    
}


export default Login