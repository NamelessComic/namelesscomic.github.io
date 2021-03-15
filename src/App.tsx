import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import cd from './data/comics.json';
interface ComicSchema {
  [index:string] : {title: string, hover: string}
}
const comicData: ComicSchema = cd;

import styles from './App.css';

export default function App() {
  const [comicId, setComicId] = useState(1);
  const key = `${comicId}`;
  if (!(key in comicData)) {
    return '404';
  }

  const {title, hover} = comicData[key];
  return (
    <div className={styles.container}>
      <Helmet>
        <title>{`${title} || Nameless Comic` }</title>
      </Helmet>
      <h2>{title}</h2>
      <img 
        src={`images/comics/${comicId}.jpg`}
        alt={hover}
        title={hover}
      />
      <button type="button" onClick={() => setComicId(comicId + 1)}>
        Next comic: {comicId}
      </button>
      <CatCounter count={comicId} />
    </div>
  );
}

function CatCounter({count}: {count: number}) {
  let cats: Array<String> = [];
  for (let i = 0; i < count; i++) {
    cats.push('🐱');
  }
  return (
    <>
      {cats}
    </>
  );
}
