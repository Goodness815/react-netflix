import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { Link } from "react-router-dom"
import axios from "axios"
import "./featured.scss";
import { useState, useEffect } from "react";

export default function Featured({ type }) {
  const [data, setData] = useState({})
  const fetchFeatured = () => {
    axios.get(`http://localhost:5000/api/movies/random${type ? `?type=${type}` : ""}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.accessToken}` }
    }).then((res) => {
      setData(res.data.movie[0])
      console.log(res.data.movie[0])
    }).catch((err) => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    fetchFeatured()
  }, [type])

  console.log(data)
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={data.img} alt="" />
      <div className="info">
        <img
          src={data.imgLogo}
          alt=""
        />
        <span className="desc">
          {data.desc}
        </span>
        <div className="buttons">
          <Link to={`/watch/${data._id}`} state={data}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
