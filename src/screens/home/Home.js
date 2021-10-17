import React, { useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

const upcomingMovies = [
  { thumbnail: { uri: "https://lorempixel.com/200/200/animals",name: "animals" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/nature", name: "nature" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
  { thumbnail: { uri: "https://lorempixel.com/200/200/cats", name: "cats" } },
];

const releasedMovies = [
    { thumbnail: { uri: "https://lorempixel.com/200/200/animals", name: "animals", releaseDate: "Fri Aug 11 2017"} },
    { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city", releaseDate: "Fri Aug 11 2017"} },
    { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city", releaseDate: "Fri Aug 11 2017"} },
    { thumbnail: { uri: "https://lorempixel.com/200/200/city", name: "city", releaseDate: "Fri Aug 11 2017"} },
    { thumbnail: { uri: "https://lorempixel.com/200/200/nature", name: "nature", releaseDate: "Fri Aug 11 2017"} }
  ];

export default function Home() {
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
                <img src={image.thumbnail.uri} />
                <GridListTileBar 
                    title={image.thumbnail.name}
                    subtitle={image.thumbnail.releaseDate} 
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="column2">
          <h1>Hello</h1>
        </div>
      </div>
    </>
  );
}
