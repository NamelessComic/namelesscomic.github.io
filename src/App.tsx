import React from 'react';
import { Helmet } from 'react-helmet';
import {
  useRouteMatch,
  Link
} from "react-router-dom";

import cd from './data/comics.json';
interface ComicSchema {
  [index:string] : {title: string, hover: string}
}
const comicData: ComicSchema = cd;

import styles from './App.css';

const lastComic = Object.keys(comicData).length;

function randomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function App() {
  const match = useRouteMatch('/:comicId');

  const comicId = Number.parseInt(match?.params?.comicId) || lastComic; 

  if (!(comicId in comicData)) {
    return <div className={styles.container}>404</div>;
  }

  const {title} = comicData[comicId];

  return (
    <>
      <Helmet>
        <title>{`${title} || Nameless Comic` }</title>
      </Helmet>
      <div className={styles.container}>
        <ComicView comicId={comicId} />
      </div>
    </>
  );
}

function ComicView({comicId}: {comicId: number}) {
  const key = `${comicId}`;

  const {hover} = comicData[key];
  
  const random = randomInt(lastComic) + 1;
  return (
    <>
      <div className={styles.header}>
        <Link to="1">
          First 
        </Link>
        <Link to={`/${comicId - 1}`}>
          Previous
        </Link>
        <Link to={`/${random}`}>
          Random 
        </Link>
        <Link to={`/${comicId + 1}`}>
          Next
        </Link>
        <Link to={`/${lastComic}`}>
          Last
        </Link>
      </div>
      <img 
        src={`images/comics/${comicId}.jpg`}
        alt={hover}
        title={hover}
      />
    </>
  );
}