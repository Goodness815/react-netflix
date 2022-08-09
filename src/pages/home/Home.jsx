import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import axios from "axios";

const Home = ({ type }) => {

  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)
  const user = JSON.parse(localStorage.getItem("user"))
  const getRandomLists = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.accessToken}` }
      })
      setLists(res.data.list)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getRandomLists()
  }, [type, genre])

   if(!user){
    return <Navigate to="/login"/>
  }

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists?.map((list, index) => {
        return <List list={list} key={index} />
      })}
    </div>
  );
};

export default Home;
