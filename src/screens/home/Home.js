import React, { useState } from "react";
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

const upcomingMovies = [
  {
    thumbnail: {
      uri: "https://lorempixel.com/200/200/animals",
      name: "animals",
    },
  },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  {
    thumbnail: { uri: "https://lorempixel.com/200/200/nature", name: "nature" },
  },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
];

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
          {upcomingMovies.map((image) => (
            <GridListTile className="tiles_scroll">
              <img src={image.thumbnail.uri} />
              <GridListTileBar title={image.thumbnail.name} />
            </GridListTile>
          ))}
        </div>
      </GridList>
      <div className="container" style={{ width: "100%" }}>
        <div className="column1">
          <GridList cellHeight={350} cols={4}>
            {releasedMovies.map((image) => (
              <GridListTile className="tiles">
                <img src={image.thumbnail.uri} onClick={openMoviePage} />
                <GridListTileBar
                  title={image.thumbnail.name}
                  subtitle={"Release Date:" + image.thumbnail.releaseDate}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="column2">
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
