import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import Toastify from 'toastify-js'
import axios from "axios"
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      const user = res.data.user
      if (res.data.success === true) {
        await localStorage.setItem("user", JSON.stringify(user))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      } else {
        localStorage.setItem("user", null)
        setLoader(false)
        Toastify({
          text: res.data.message,
          duration: 2000,
          className: "toastInfo",
          backgroundColor: "#000",
          close: true

        }).showToast();
      }

    } catch (error) {
      localStorage.setItem("user", null)
      Toastify({
        text: error.message,
        duration: 2000,
        className: "toastInfo",
        backgroundColor: "#000",
        close: true
      }).showToast();
      setLoader(false)
    }
  }

   if(user){
    return <Navigate to="/"/>
  }


  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/register"><img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          /></Link>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="loginButton" type="submit">{loader ? "Signing In..." : "Sign In"}</button>
          <span>
            New to Netflix? <Link to="/register"><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
