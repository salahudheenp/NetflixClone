import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { API_KEY, imageURL } from '../../constants/constants'
import YouTube from 'react-youtube';

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState("")

  useEffect(() => {
    axios.get(props.url).then(response => {
      console.log(response.data);
      setMovies(response.data.results);
    }).catch((err) => {
      // alert('Network Error' + err)
    })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en_US`).then(response => {
      console.log(response.data);
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log('Trailer video not found');
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) =>
          <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageURL + obj.backdrop_path}`} alt=""/>
        )}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost