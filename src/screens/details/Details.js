import React, { useState } from "react";
import Header from "../../common/header/Header";
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar
} from "@material-ui/core";
import "./Details.css";
import ReactPlayer from "react-player";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "material-ui-rating";

export default function Details() {
  const [posterUrl, setPosterUrl] = useState(
    "https://lorempixel.com/200/200/animals"
  );
  const [title, setTitle] = useState("Inception");
  const [genres, setGenres] = useState("Action, Adventure, Sci-Fi");
  const [duration, setDuration] = useState("14:8");
  const [releaseDate, setReleaseDate] = useState("Fri Jul 16 2010");
  const [rating, setRating] = useState("8.8");
  const [story_line, set_story_line] = useState(
    "jhvdbhjbhjkbcjnbdjhcb jhbdcjhbdsjkh ckjhbchjkbsdcjhb jhvhjv jhvjhgvhvg jhvjhgvhvhjv kjbkjhbjhjhb jhjhvhb"
  );
  const [wiki_url, set_wiki_url] = useState(
    "https://en.wikipedia.org/wiki/Inception"
  );
  const [trailer_url, set_trailer_url] = useState(
    "https://www.youtube.com/watch?v=YoHD9XEInc0"
  );
  const [star_rating, set_star_rating] = useState(0);
  const [artists, setArtists] = useState([
    {
      profile_url: "https://lorempixel.com/200/200/city",
      first_name: "aha",
      last_name: "hjbhb",
    },
    {
      profile_url: "https://lorempixel.com/200/200/cats",
      first_name: "aha",
      last_name: "hjbhb",
    },
    {
      profile_url: "https://lorempixel.com/200/200/cats",
      first_name: "aha",
      last_name: "hjbhb",
    },
  ]);

  return (
    <>
      <Header></Header>
      <Typography
        style={{ margin: "8px 0 0 24px", height: "24px" }}
        component="button"
        variant="text"
        className="backBtn"
        color="primary"
      >
        &lt; Back to Home
      </Typography>
      <div className="container">
        <div className="column1">
          <img className="poster" src={posterUrl}></img>
        </div>
        <div className="column2">
          <Typography variant="title" component="h2">
            {title}
          </Typography>
          <Typography>
            <b>Genre: </b>
            {genres}
          </Typography>
          <Typography>
            <b>Duration: </b>
            {duration}
          </Typography>
          <Typography>
            <b>Release Date: </b>
            {releaseDate}
          </Typography>
          <Typography>
            <b>Rating: </b>
            {rating}
          </Typography>
          <br />
          <Typography>
            <b>Plot: </b>
            <a href={wiki_url}>(Wiki Link)</a>
            {" " + story_line}
          </Typography>
          <br />
          <Typography>
            <b>Trailer: </b>
            <br />
            <ReactPlayer url={trailer_url} controls="true" />
          </Typography>
        </div>
        <div className="column3">
          <Typography>
            <b>Rate this movie</b>
          </Typography>
          <Rating
            name="starRating"
            value={star_rating}
            max={5}
            onChange={(event, newValue) => {
              set_star_rating(newValue);
            }}
            iconNormal={<StarBorderIcon style={{color:"black"}}></StarBorderIcon>}
          />
          <Typography style={{ margin: "16px 0" }}>
            <b>Artists:</b>
          </Typography>
          <GridList cellWidth={100} cols={2}>
            {artists.map((artist) => (
              <GridListTile>
                <img src={artist.profile_url} />
                <GridListTileBar
                  title={artist.first_name + " " + artist.last_name}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </>
  );
}
