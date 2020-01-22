import React, {useState, useEffect} from 'react'
import axios from 'axios';

function UpdateForm(props) {
  const { id } = props.match.params;
  const defaultMovie = {title:'', director:'', metascore:'', stars:[]};
  const [movie, setMovie] = useState(defaultMovie);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
         .then( response => {
            console.log(response);
            setMovie(response.data);
         })
         .catch(err => {
            console.log(err);
         })
  },[id]);
  const handleInput = (e) => {
     e.preventDefault();
     setMovie({...movie, [e.target.name]:e.target.value});
  }
  const handleStars = (event) => {
      setMovie({
         ...movie, stars:[event.target.value]
      })
  }
  const handleSubmit = (event) => {
     event.preventDefault();
     axios.put(`http://localhost:5000/api/movies/${id}`, movie)
         .then( response => {
            console.log(response);
            setMovie(defaultMovie);
            props.history.push("/");
         })
         .catch(err => {
            console.log(err);
         })
  }
  return (
    <div >
      <div>
         <p>Update your movie here..</p>
      </div>
      <div className="update-form"> 
      <form onSubmit={handleSubmit}>
      <label>Movie Title:</label>
       <input 
          type="text"
          placeholder="Title"
          onChange={handleInput}
          name="title"
          value={movie.title}
       />
       <br />
       <label>Movie Director</label>
       <input 
          type="text"
          name="director"
          placeholder="director"
          onChange={handleInput}
          value={movie.director}
       />
       <br />
       <label>Movie Meta-score:</label>
       <input 
          type="text"
          name="metascore"
          placeholder={movie.metascore}
          onChange={handleInput}
          value={movie.metascore}
       />
       <br />
       <label>Movie Stars:</label>
       <input type="text"
              name="stars"
              placeholder="stars"
              onChange={handleStars}
              value={movie.stars} 
              style={{width:'250px'}}
        />
        <br />      
       <button>Save</button>
      </form>
      </div>
    </div>
  )
}

export default UpdateForm;
