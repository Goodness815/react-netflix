import { ArrowBackOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation, Navigate} from "react-router-dom"
import axios from "axios"
import "./watch.scss";

export default function Watch() {
  const { id } = useParams()
  const location = useLocation()
  const movieData = location?.state
  const [movie, setMovie] = useState(movieData || {});

  const getMovie = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/movies/find/" + id, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}` }
      })
      setMovie(res.data.movie)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!movieData) {
      getMovie()
    }
  }, [id])

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <ArrowBackOutlined />
        </Link>
        <h6 className="movieTitle">
          {movie.title}
        </h6>
      </div>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        controlsList="nodownload"
        poster={movie.imgTitle}
        src={movie.video}
      />
    </div>
  );
}
