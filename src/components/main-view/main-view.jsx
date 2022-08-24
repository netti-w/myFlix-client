import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          "Director": {
            "Name": "Yorgos Lanthimos",
            "Bio": "Georgios \"Yorgos\" Lanthimos is a Greek film director, film producer, screenwriter, photographer, and theatre director. He has received three Academy Award nominations for his work: Best Original Screenplay for The Lobster (2015) and Best Director and Best Picture for The Favourite (2018).",
            "Birth": 1973
          },
          "Genre": {
            "Name": "Drama",
            "Description": "The drama genre features stories with high stakes and a lot of conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters."
          },
          "_id": "62eac6151ef36b8f67491b08",
          "Title": "The Lobster",
          "ReleaseYear": 2015,
          "Description": "In a dystopian near future, according to the laws of The City, single people are taken to The Hotel, where they are obliged to find a romantic partner in 45 days or they're transformed into beasts and sent off into The Woods.",
          "ImagePath": "https://m.media-amazon.com/images/M/MV5BNDQ1NDE5NzQ1NF5BMl5BanBnXkFtZTgwNzA5OTM2NTE@._V1_FMjpg_UX1000_.jpg",
          "Featured": false,
          "Actors": [
            "Colin Farrell",
            "Rachel Weisz",
            "Jessica Barden"
          ]
        },
        {
          "Director": {
            "Name": "Ari Aster",
            "Bio": "Ari Aster is an American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019)",
            "Birth": 1986
          },
          "Genre": {
            "Name": "Horror",
            "Description": "Horror is a genre of storytelling intended to scare, shock, and thrill its audience. Horror can be interpreted in many different ways, but there is often a central villain, monster, or threat that is often a reflection of the fears being experienced by society at the time."
          },
          "_id": "62eac5ab1ef36b8f67491b05",
          "Title": "Midsommar",
          "ReleaseYear": 2019,
          "Description": "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
          "ImagePath": "https://m.media-amazon.com/images/M/MV5BMDZjZWE0ZjktZjBlOS00YmFiLWFlYjctY2IwZmUxMzQyZjUyXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
          "Featured": true,
          "Actors": [
            "Florence Pugh",
            "Jack Reynor",
            "Vilhelm Blomgren"
          ]
        },
        {
          "Director": {
            "Name": "John Musker",
            "Bio": "John Edward Musker is an American animator, film director, screenwriter, and film producer.",
            "Birth": 1953
          },
          "Genre": {
            "Name": "Animation",
            "Description": "Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI)."
          },
          "_id": "62eac5db1ef36b8f67491b07",
          "Title": "The Little Mermaid",
          "ReleaseYear": 1989,
          "Description": "A mermaid princess makes a Faustian bargain in an attempt to become human and win a prince's love.",
          "ImagePath": "https://m.media-amazon.com/images/M/MV5BN2JlZTBhYTEtZDE3OC00NTA3LTk5NTQtNjg5M2RjODllM2M0XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_FMjpg_UX1000_.jpg",
          "Featured": false,
          "Actors": [
            "Jodi Benson (voice)",
            "Samuel E. Wright (voice)",
            "Rene Auberjonois(voice)"
          ]
        }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // condensed
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">This list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;