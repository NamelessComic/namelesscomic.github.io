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

import ScrollToTop from './ScrollToTop';

const lastComic = Object.keys(comicData).length;

function randomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function App() {
  const match = useRouteMatch('/:comicId');

  const comicId = Number.parseInt(match?.params?.comicId) || lastComic; 

  if (!(comicId in comicData)) {
    return '404';
  }

  const {title} = comicData[comicId];

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>{`${title} || Nameless Comic` }</title>
      </Helmet>
      <ComicView comicId={comicId} />
    </>
  );
}

function ComicView({comicId}: {comicId: number}) {
  const key = `${comicId}`;
  const {hover} = comicData[key];
  const random = randomInt(lastComic) + 1;

  const isFirst = comicId === 1;
  const isLast = comicId === lastComic;

  return (
    <>
      <div className="header">
        <Link 
          to="1" 
          className={isFirst ? 'disabled' : ''}
        >
          « First
        </Link>
        <Link 
          to={`/${Math.max(comicId - 1, 0)}`}
          className={isFirst ? 'disabled' : ''}
        >
          ← Previous
        </Link>
        <Link to={`/${random}`}>
          Random
        </Link>
        <Link 
          to={`/${Math.min(comicId + 1, lastComic)}`}
          className={isLast ? 'disabled' : ''}
        >
          Next →
        </Link>
        <Link 
          to={`/${lastComic}`}
          className={isLast ? 'disabled' : ''}
        >
          Last »
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