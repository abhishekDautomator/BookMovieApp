import React,{ useState} from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { GridList, GridListTile, GridListTileBar} from "@material-ui/core";

const images = [
    { thumbnail: { uri: 'https://lorempixel.com/200/200/animals',name:'animals'}},
    { thumbnail: { uri: 'https://lorempixel.com/200/200/city'  ,name:'city'}},
    { thumbnail: { uri: 'https://lorempixel.com/200/200/city'  ,name:'city'}},
    { thumbnail: { uri: 'https://lorempixel.com/200/200/city'  ,name:'city'}},
    { thumbnail: { uri: 'https://lorempixel.com/200/200/nature'  ,name:'nature'} },
    { thumbnail: { uri: 'https://lorempixel.com/200/200/cats'  ,name:'cats'} },
    { thumbnail: { uri: 'https://lorempixel.com/200/200/cats'  ,name:'cats'} },
    { thumbnail: { uri: 'https://lorempixel.com/200/200/cats'  ,name:'cats'} },
  ];

export default function Home() {
  return (
    <>
      <Header></Header>
      <header className="head">Upcoming Movies</header>
        <GridList cellHeight={180} cols={6} >
            <div className="grid_scroll" style={{width: '100%'}}>
            {images.map((image) => (
            <GridListTile>
                <img src={image.thumbnail.uri} />
                <GridListTileBar
                    title={ image.thumbnail.name}
                />
            </GridListTile>
            ))}
            </div>
        </GridList>
    </>
  );
}
