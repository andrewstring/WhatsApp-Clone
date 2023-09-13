import { useState, useEffect } from 'react'
import "../css/Login.css"

// Axios import
import axios from 'axios'

// Axios setup
axios.defaults.baseURL = "http://localhost:3005"


const Login = ({ mongodb }) => {
    const [ area, setArea ] = useState("login")
    const [ accountInfo, setAccountInfo ] = useState({
        username: "",
        password: "",
        email: ""
    })

    const handleChange = (type, e) => {
        setAccountInfo((accountInfo) => {
            return {
                ...accountInfo,
                [type]: e.target.value
            }
        })
    }

    useEffect(() => {
        const getAccountCollection = async () => {
            if(mongodb) {
                const accountsCollection = mongodb.db("test").collection("accounts")
                console.log(accountsCollection)
            }
        }
        getAccountCollection()
    },[])

    if (area === "login") {
        const handleLogin = () => {
            console.log("Login")
        }
        const handleMoveToCreate = () => {
            console.log("Create")
            setArea("create")
        }

        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Login</h1>

                    <label>Username</label>
                    <input key="username"
                    placeholder="Username"
                    value={accountInfo.username}
                    onChange={(e) => setAccountInfo("username",e)}></input>

                    <label>Password</label>
                    <input key="password"
                    type="password"
                    placeholder="Password"
                    value={accountInfo.password}
                    onChange={(e) => setAccountInfo("password",e)}></input>

                    <input type="submit" value="Login" onClick={handleLogin}></input>
                    <input type="submit" value="Create Account" onClick={handleMoveToCreate}></input>
                </form>
            </div>
        )
    }
    else if (area === "create") {
        const returnToLogin = () => {
            setArea("login")
        }
        const handleCreateAccount = async (e) => {
            e.preventDefault()
            try {
                const response = await axios.post("/account/new", {
                    username: accountInfo.username,
                    email: accountInfo.email,
                    password: accountInfo.password
                })
            } catch (e) {
                console.log("ERROR with Axios")
                console.log(e.response.data)
                console.log(e.response.status)
                console.log(e.response.headers)
            }
            
        }
        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Create Account</h1>

                    <label>Email</label>
                    <input key="email"
                    placeholder="Email"
                    value={accountInfo.email}
                    onChange={(e) => setAccountInfo("password",e)}></input>

                    <label>Username</label>
                    <input key="username"
                    placeholder="Username"
                    value={accountInfo.username}
                    onChange={(e) => setAccountInfo("username",e)}></input>

                    <label>Password</label>
                    <input key="password"
                    type="password"
                    placeholder="Password"
                    value={accountInfo.password}
                    onChange={(e) => setAccountInfo("password",e)}></input>

                    <input type="submit" value="Create Account" onClick={(e) => handleCreateAccount(e)}></input>
                    <input type="submit"
                    value="Return to Login" onClick={returnToLogin}></input>
                    
                </form>

            </div>
        )
    }
    
}


export default Login