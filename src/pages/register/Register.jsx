import { useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import Toastify from 'toastify-js'
import { Spin } from 'antd';
import axios from "axios"
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false)
  const [image, setImage] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { email, password, username })
      if (res.data.success === true) {
        setLoader(false)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setImage(true)
      } else {
        localStorage.setItem("user", null)
        Toastify({
          text: res.data.message,
          duration: 2000,
          className: "toastInfo",
          backgroundColor: "#000",
          close: true
        }).showToast();
        setLoader(false)
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
  };
  const handleImgUpdate = async (id) => {
    setLoader(true)
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${JSON.parse(localStorage.getItem("user"))._id}`, { profilePic: `${id}` }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}` }
      })
      console.log(res.data.success)
      if (res.data.success === true) {
        localStorage.setItem("user", JSON.stringify({ ...user, profilePic: res.data.user.profilePic }))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
    } catch (err) {
      setLoader(false)
      Toastify({
        text: err.message,
        duration: 2000,
        className: "toastInfo",
        backgroundColor: "#000",
        close: true
      }).showToast();
      console.log(err.message)
    }
  };


  if (image) {
    return (
      <div className="profileContainer">
        <div className="profileInner">

          <h3>Select your profile picture</h3>
          <div className="img-container">
            <div className="img-item" onClick={() => handleImgUpdate("https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg")}>
              <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="" />
            </div>
            <div className="img-item" onClick={() => handleImgUpdate("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8nl03h__9GySOC3xYxhliIKoe8J0uPMOKJT97ypNxA&s=36")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8nl03h__9GySOC3xYxhliIKoe8J0uPMOKJT97ypNxA&s=36" alt="" />
            </div>
            <div className="img-item" onClick={() => handleImgUpdate("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQfOPr1m7jryKxiCFP4IShrr88EWnR2mZJQ&usqp=CAU")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQfOPr1m7jryKxiCFP4IShrr88EWnR2mZJQ&usqp=CAU" alt="" />
            </div>
            <div className="img-item" onClick={() => handleImgUpdate("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82CQK33y63CCvCwkLdiF90qoYSObxvuWqNQ&usqp=CAU")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82CQK33y63CCvCwkLdiF90qoYSObxvuWqNQ&usqp=CAU" alt="" />
            </div>
          </div>

          {loader && <LoadingOutlined className="color"
            style={{
              fontSize: 28,
            }}
            Spin
          />}
        </div>
      </div>
    )
  }


  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <Link to="/login" className="loginButton">Sign In</Link>



        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button className="registerButton" onClick={handleFinish}>
              {!loader ? "Register" : "Registering"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
