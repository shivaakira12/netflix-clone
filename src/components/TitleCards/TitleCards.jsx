import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjQ0MGZmYjFjZjgxMDRmZTBjYzJmYjRhNTMxNDU1MCIsIm5iZiI6MTY4NjM5MzI2My42MjksInN1YiI6IjY0ODQ1MWFmZTM3NWMwMDBhY2M1MzMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6s2d--Mi27fKtaOIjgtjqPFmiPGrTXSRbpUIqV6URw`, // Hardcoded API key
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        console.log("API Response:", res);
        setApiData(res.results || []);
      })
      .catch((err) => console.error("Fetch Error:", err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="titlecards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`}>
              <div className="card" key={index}>
                <img
                  src={
                    card.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                      : "path/to/fallback-image.jpg"
                  }
                  alt={card.original_title || "Movie Poster"}
                />
                <p>{card.original_title}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
