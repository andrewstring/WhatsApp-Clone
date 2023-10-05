// react import
import { useState, useEffect, useContext } from 'react'

// css import
import "../css/Login.css"

// library import
import axios from 'axios'
import { MongodbContext } from '../Contexts/MongodbContext'

// library setup
// axios.defaults.baseURL = "http://localhost:3005"
axios.defaults.baseURL = "https://whatsapp-clone-backend-608e90b922c2.herokuapp.com"


const Login = ({ appSetCredentials }) => {

    // context intialization
    const mongodb = useContext(MongodbContext)

    // state initialization
    const [ area, setArea ] = useState("login")
    const [ accountInfo, setAccountInfo ] = useState({
        firstName: "",
        username: "",
        password: "",
        email: ""
    })
    const [ error, setError ] = useState("")

    // prop/helper functions
    const handleChange = (type, e) => {
        setAccountInfo((accountInfo) => {
            return {
                ...accountInfo,
                [type]: e.target.value
            }
        })
        console.log(accountInfo)
    }
    const handleMoveToCreate = () => {
        console.log("Create")
        setArea("create")
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            console.log("Logging in")
            const response = await axios.post("/account/login", {
                username: accountInfo.username,
                password: accountInfo.password,
            })
            console.log(response)
            switch(response.data.message) {
                case "Correct credentials": {
                    console.log("CORRECT cred")
                    appSetCredentials(response.data.credentials)
                    return
                }
                case "Username does not exist": {
                    console.log("username not exist")
                    appSetCredentials("invalid")
                    setError("Username does not exist")
                    //render username and email exist
                    return
                }
                case "Incorrect credentials": {
                    console.log("incorrect cred")
                    appSetCredentials("invalid")
                    setError("Incorrect password")
                    //render email exists
                    return
                }
                return
            }
        } catch (e) {
            console.log("ERROR with Axios")
            console.log(e.response.data)
            console.log(e.response.status)
        }
    }
    const returnToLogin = () => {
        setArea("login")
    }
    const handleCreateAccount = async (e) => {
        e.preventDefault()
        try {
            console.log("CREATING ACCOUNT")
            const response = await axios.post("/account/new", {
                firstName: accountInfo.firstName,
                username: accountInfo.username,
                email: accountInfo.email,
                password: accountInfo.password
            })
            console.log(response)
            switch(response.data.message) {
                case "Account created": {
                    console.log("account created")
                    appSetCredentials(response.data.credentials)
                    return
                }
                case "Username and Email exist": {
                    console.log("username and email exist")
                    appSetCredentials("invalid")
                    setError("Username and Email already exist")
                    //render username and email exist
                    return
                }
                case "Email exists": {
                    console.log("email exists")
                    appSetCredentials("invalid")
                    setError("Email already exists")
                    //render email exists
                    return
                }
                case "Username exists": {
                    console.log("username exists")
                    appSetCredentials("invalid")
                    setError("Username already exists")
                    //email exists
                    return
                }
                return
            }
        } catch (e) {
            console.log("ERROR with Axios")
            console.log(e.response.data)
            console.log(e.response.status)
        }
    }

    // useEffect
    useEffect(() => {
        const getAccountCollection = async () => {
            if(mongodb) {
                console.log("MONGO")
                console.log(mongodb)
                const accountsCollection = mongodb.db("test").collection("accounts")
                console.log(accountsCollection)
            }
        }
        getAccountCollection()
    },[])


    // rendering for login
    if (area === "login") {
        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Login</h1>

                    <label>Username</label>
                    <input key="username"
                    type="text"
                    placeholder="Username"
                    value={accountInfo.username}
                    onChange={(e) => handleChange("username",e)}></input>

                    <label>Password</label>
                    <input key="password"
                    type="password"
                    placeholder="Password"
                    value={accountInfo.password}
                    onChange={(e) => handleChange("password",e)}></input>

                    <div className="Login-buttons">
                        <input type="submit" value="Login" onClick={handleLogin}></input>
                        <input type="submit" value="Create Account" onClick={handleMoveToCreate}></input>
                    </div>
                    {error.length ? <h3 className="Login-error">{error}</h3>: null}
                </form>
            </div>
        )
    }

    // rendering for create account
    else if (area === "create") {
        return (
            <div className="Login-outer">
                <form className="Login">
                    <h1>Create Account</h1>

                    <label>First Name</label>
                    <input key="firstName"
                    type="text"
                    placeholder="First Name"
                    value={accountInfo.firstName}
                    onChange={(e) => handleChange("firstName",e)}></input>

                    <label>Email</label>
                    <input key="email"
                    type="text"
                    placeholder="Email"
                    value={accountInfo.email}
                    onChange={(e) => handleChange("email",e)}></input>

                    <label>Username</label>
                    <input key="username"
                    type="text"
                    placeholder="Username"
                    value={accountInfo.username}
                    onChange={(e) => handleChange("username",e)}></input>

                    <label>Password</label>
                    <input key="password"
                    type="password"
                    placeholder="Password"
                    value={accountInfo.password}
                    onChange={(e) => handleChange("password",e)}></input>

                    <div className="Login-buttons">
                        <input type="submit" value="Create Account" onClick={(e) => handleCreateAccount(e)}></input>
                        <input type="submit"
                        value="Return to Login" onClick={returnToLogin}></input>
                    </div>
                    {error.length ? <h3 className="Login-error">{error}</h3>: null}
                </form>
            </div>
        )
    }
}

export default Login