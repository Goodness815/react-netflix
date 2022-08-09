import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import img from "../../assets/background.jpg"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios"

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/movies/find/" + item, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}` }
      })

      console.log(res.data)
      setMovie(res.data.movie)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    { item && getMovie() }
  }, [item])


  return (

    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.imgTitle}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay loop muted />
          <div className="itemInfo">
            <div className="icons">
              <Link to={`/watch/${movie._id}`} state={movie}>
                <PlayArrow className="icon" />
              </Link>
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="desc">
              {movie?.title}
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+{movie?.limit}</span>
              <span>{movie?.year}</span>
            </div>

            <div className="genre">{movie?.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
