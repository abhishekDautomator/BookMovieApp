import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import moment from "moment";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
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
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";

const customStylesTextArea = {
  margin: "10px 0 10px",
};

const styles = (theme) => ({
    typo: {
        color: theme.palette.primary.light,
        margin: theme.spacing()
    },
});

function Home(props) {
  const [genres, set_genres] = useState([]);
  const [genre_list, set_genre_List] = useState([]);
  const [artists, set_artists] = useState([]);
  const [artist_list, set_artist_List] = useState([]);
  const [movie_name, set_movie_Name] = useState("");
  const [movies_list, set_movies_List] = useState([]);
  const [released_movies, set_released_movies] = useState([]);
  const [start_date, set_start_date] = useState([]);
  const [end_date, set_end_date] = useState([]);
 

  const { classes } = props;

  async function loadMovieData() {
    const input = await fetch(props.baseUrl + "/movies");
    const data = await input.json();
    set_movies_List(data.movies);
    set_released_movies(data.movies);

  }

  async function loadGenres() {
    const input = await fetch(props.baseUrl + "/genres");
    const data = await input.json();
    set_genre_List(data.genres);
  }

  async function loadArtists() {
    const input = await fetch(props.baseUrl + "/artists");
    const data = await input.json();
    const g = data.artists.map((artist) => ({
      name: artist.first_name + " " + artist.last_name,
      id: artist.id,
    }));
    set_artist_List(g);
  }

  useEffect(() => {
    loadMovieData();
    loadGenres();
    loadArtists();
  }, []);

  const onMovieSelect = (e) => {
    set_movie_Name(e.target.value);
    console.log(e.target.name + " : " + e.target.value);
  };

  const onGenreSelect = (e) => {
    set_genres(e.target.value);
    console.log(e.target.name + " : " + e.target.value);
  };

  const onArtistSelect = (e) => {
    set_artists(e.target.value);
    console.log(e.target.name + " : " + e.target.value);
  };

  const onStartDateSelect = (e) => {
    set_start_date(e.target.value);
    console.log(e.target.name + " : " + e.target.value);
  };

  const onEndDateSelect = (e) => {
    set_end_date(e.target.value);
    console.log(e.target.name + " : " + e.target.value);
  };

  const onApplyFilter = () => {
    let filterData = {
        title: movie_name,
        genreList: genres,
        artistList: artists,
        releasedatestart: start_date,
        releasedateend: end_date
    }
    let dataFilterList = released_movies.filter((movie) => {
        let dataFilter = {};
        if (filterData.title) {
            if (`${movie.title}`.toLowerCase() === `${filterData.title}`.toLowerCase()) {
                dataFilter.titleStatus = true;
            } else {
                dataFilter.titleStatus = false;
            }
        }
        if (filterData.genreList && filterData.genreList.length > 0) {
            movie.genres.map(genre => {
                if (filterData.genreList.indexOf(genre) > -1) {
                    dataFilter.genreStatus = true;
                }
            })
            if (!dataFilter.genreStatus) {
                dataFilter.genreStatus = false;
            }
        }
        if (filterData.artistList && filterData.artistList.length > 0) {
            movie.artists && movie.artists.map(artist => {
                const name = artist.first_name + " " + artist.last_name;
                if (filterData.artistList.indexOf(name) > -1) {
                    dataFilter.artistStatus = true;
                }
            })
            if (!dataFilter.artistStatus) {
                dataFilter.artistStatus = false;
            }
        }
        let endDate = new Date();
        if (filterData.releasedateend) {
            endDate = new Date(filterData.releasedateend);
        }
        if (filterData.releasedatestart) {
            const startDate = new Date(filterData.releasedatestart);
            const filmDate = new Date(movie.release_date);
            if (filmDate >= startDate && filmDate <= endDate) {
                dataFilter.releaseDateStatus = true;
            } else {
                dataFilter.releaseDateStatus = false;
            }
        }
        let status = true;
        for (let item in dataFilter) {
            if (!dataFilter[item]) {
                status = false;
                break;
            }
        }
        return status;
    })
    set_movies_List(dataFilterList);
  }

  return (
    <>
      <Header baseUrl={props.baseUrl} ></Header>
      <header className="head">Upcoming Movies</header>
      <ImageList rowHeight={250} cols={6}>
        <div className="grid_scroll" style={{ width: "100%" }}>
          {released_movies.map((movie) => (
            <ImageListItem  className="tiles_scroll" key={movie.id}>
              <img src={movie.poster_url} alt={movie.title}/>
              <ImageListItemBar title={movie.title} />
            </ImageListItem >
          ))}
        </div>
      </ImageList>
      <div className="container" style={{ width: "100%" }}>
        <div className="col1">
          <ImageList rowHeight={350} cols={4}>
            {movies_list.map((movie) => (
              <ImageListItem  className="tiles" key={movie.id}>
                <Router>
                  <Link to={"/movie/"+movie.id}>
                    <img src={movie.poster_url} alt={movie.title}/>
                  </Link>
                </Router>
                <ImageListItemBar
                  title={movie.title}
                  subtitle={
                    "Release Date:" +
                    moment(movie.release_date).format("ddd MMM DD YYYY")
                  }
                />
              </ImageListItem >
            ))}
          </ImageList>
        </div>
        <div className="col2">
          <Card>
              <CardContent>
                <Typography className={classes.typo} component="div" variant="h6">
                  FIND MOVIES BY:
                </Typography>
                <form className="form">
                  <FormControl>
                    <TextField
                      style={customStylesTextArea}
                      label="Movie Name"
                      name="movieName"
                      onChange={onMovieSelect}
                    />
                  </FormControl>
                  <FormControl variant="standard" >
                    <InputLabel id="genres">Genres</InputLabel>
                    <Select
                      labelId="genres"
                      id="genres-select"
                      name="genre"
                      value={genres}
                      label="Genres"
                      onChange={onGenreSelect}
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {genre_list.map((g) => (
                        <MenuItem key={g.id} value={g.genre}>
                          <Checkbox checked={genres.indexOf(g.genre) > -1} />
                          <ListItemText primary={g.genre} />
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
                      {artist_list.map((artist) => (
                        <MenuItem key={artist.id} value={artist.name}>
                          <Checkbox checked={artists.indexOf(artist.name) > -1} />
                          <ListItemText primary={artist.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={customStylesTextArea}
                      label="Release Date Start"
                      name="date"
                      type="date"
                      value={start_date}
                      onChange={onStartDateSelect}
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
                      renderValue={end_date}
                      onChange={onEndDateSelect}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <Button
                    style={{ marginTop: "30px", marginBottom: "10px" }}
                    color="primary"
                    variant="contained"
                    onClick={onApplyFilter}
                  >
                    APPLY
                  </Button>
                </form>
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);