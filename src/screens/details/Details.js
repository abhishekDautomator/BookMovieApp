import React, { useEffect, useState, setState } from "react";
import Header from "../../common/header/Header";
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import "./Details.css";
import ReactPlayer from "react-player";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { makeStyles,withStyles} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";


const UseStyles = withStyles({
    iconFilled: {
      color: "yellow"
    }
  })(Rating);

export default function Details(props) { 

  const [movie_detail, set_movie_detail] = useState({
    poster_url:"",
    artists:[],
    title:"",
    genres:[],
    duration:0,
    release_date:"",
    rating:0,
    storyline:"",
    id:"",
    wiki_url:"",
    trailer_url:"",
    censor_board_rating:""
  });

    async function data(){
        const rawData = await fetch(props.baseUrl + "movies/"+props.match.params.id ,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        });
        const data = await rawData.json();
        set_movie_detail(data);
    }

    const handleRatingChange = (value) =>{
        console.log(value);
        set_movie_detail({...movie_detail,rating:value*2});
    }


    useEffect(() => {
        data();
    }, []);

  return (
    <>
      <Header baseUrl={props.baseUrl} movieid={movie_detail.id} detailButton></Header>
        <Typography
          style={{ margin: "8px 0 0 24px", height: "24px" }}
          component="button"
          variant="text"
          className="backBtn"
          color="primary"
        >
        <Link to="/" style={{textDecoration: "none"}}>
          &lt; Back to Home
        </Link>
        </Typography>
      <div className="container">
        <div className="column1">
          <img className="poster" src={movie_detail.poster_url}></img>
        </div>
        <div className="column2">
          <Typography variant="title" component="h2">
            {movie_detail.title}
          </Typography>
          <Typography>
            <b>Genre: </b>
            {movie_detail.genres.join(", ")}
          </Typography>
          <Typography>
            <b>Duration: </b>
            {movie_detail.duration}
          </Typography>
          <Typography>
            <b>Release Date: </b>
            {moment(movie_detail.release_date).format("ddd MMM DD YYYY")}
          </Typography>
          <Typography>
            <b>Rating: </b>
            {movie_detail.rating}
          </Typography>
          <br />
          <Typography>
            <b>Plot: </b>
            <a href={movie_detail.wiki_url}>(Wiki Link)</a>
            {" " + movie_detail.storyline}
          </Typography>
          <br />
          <Typography>
            <b>Trailer: </b>
            <br />
            <ReactPlayer url={movie_detail.trailer_url} controls="true" />
          </Typography>
        </div>
        <div className="column3">
          <Typography>
            <b>Rate this movie</b>
          </Typography>
          <UseStyles
            name="rating"
            value={movie_detail.rating/2}
            max={5}
            visuallyHidden="false"
            onChange={(e, newValue)=>{handleRatingChange(newValue);}}
            icon={
                <StarBorderIcon fontSize="inherit" />
            }
            />
          <Typography style={{ margin: "16px 0" }}>
            <b>Artists:</b>
          </Typography>
          <GridList cellWidth={100} cols={2}>
            {movie_detail.artists.map((artist) => (
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
