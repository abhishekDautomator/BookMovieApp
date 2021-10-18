import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
  CardContent,
  Typography,
  FormControl,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const releasedMovies = [
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/animals",
      name: "animals",
      releaseDate: "Fri Aug 11 2017",
    },
  },
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/city",
      name: "city",
      releaseDate: "Fri Aug 11 2017",
    },
  },
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/city",
      name: "city",
      releaseDate: "Fri Aug 11 2017",
    },
  },
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/city",
      name: "city",
      releaseDate: "Fri Aug 11 2017",
    },
  },
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/nature",
      name: "nature",
      releaseDate: "Fri Aug 11 2017",
    },
  },
];

const customStylesTextArea = {
  margin: "10px 0 10px",
};

const openMoviePage = () => {};

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066ff",
    },
  },
});

const genresList = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const artistsList = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function Home() {
  const [genres, setGenres] = useState([]);

  const [artists, setArtists] = useState([]);

  const [data, setData] = useState("");

  const [upcoming_movies, set_upcoming_movies] = useState([]);
  const [released_movies, set_released_movies] = useState([]);

  async function loadData() {
    const input = await fetch(
      "http://localhost:8085/api/v1/movies?page=1&limit=10"
    );
    const data = await input.json();
    console.log(data.movies);
    set_upcoming_movies(data.movies);
    const released = data.movies.filter((movie) =>
      Object.keys(movie).some((m) => movie[m] === "RELEASED")
    );
    set_released_movies(released);
  }

  useEffect(() => {
    loadData();
  }, []);

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onGenreSelect = (e) => {
    const {
      target: { value },
    } = e;
    setGenres(typeof value === "string" ? value.split(",") : value);
  };

  const onArtistSelect = (e) => {
    const {
      target: { value },
    } = e;
    setArtists(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Header></Header>
      <header className="head">Upcoming Movies</header>
      <GridList cellHeight={180} cols={6}>
        <div className="grid_scroll" style={{ width: "100%" }}>
          {upcoming_movies.map((movie) => (
            <GridListTile className="tiles_scroll">
              <img src={movie.poster_url} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </div>
      </GridList>
      <div className="container" style={{ width: "100%" }}>
        <div className="col1">
          <GridList cellHeight={350} cols={4}>
            {released_movies.map((movie) => (
              <GridListTile className="tiles">
                <img src={movie.poster_url} onClick={openMoviePage} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    "Release Date:" +
                    moment(movie.release_date).format("ddd MMM DD YYYY")
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="col2">
          <Card>
            <ThemeProvider theme={theme}>
              <CardContent>
                <Typography className="cardComponent" component="div">
                  FIND MOVIES BY:
                </Typography>
                <form className="form">
                  <FormControl>
                    <TextField
                      style={customStylesTextArea}
                      label="Movie Name"
                      name="movieName"
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <InputLabel id="genres">Genres</InputLabel>
                    <Select
                      labelId="genres"
                      id="genres-select"
                      value={genres}
                      label="Genres"
                      onChange={onGenreSelect}
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {genresList.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          <Checkbox checked={genres.indexOf(genre) > -1} />
                          <ListItemText primary={genre} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard">
                    <InputLabel id="artists">Artists</InputLabel>
                    <Select
                      labelId="artists"
                      id="artists-select"
                      value={artists}
                      label="Artists"
                      onChange={onArtistSelect}
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {artistsList.map((artist) => (
                        <MenuItem key={artist} value={artist}>
                          <Checkbox checked={artists.indexOf(artist) > -1} />
                          <ListItemText primary={artist} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={customStylesTextArea}
                      label="Release Date Start"
                      name="releaseDateStart"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={customStylesTextArea}
                      label="Release Date End"
                      name="releaseDateEnd"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <Button
                    style={{ marginTop: "30px", marginBottom: "10px" }}
                    color="primary"
                    variant="contained"
                  >
                    APPLY
                  </Button>
                </form>
              </CardContent>
            </ThemeProvider>
          </Card>
        </div>
      </div>
    </>
  );
}
