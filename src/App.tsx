import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import hotkeys from 'hotkeys-js';
import {
  useRouteMatch,
  Link,
  useHistory,
} from 'react-router-dom';


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

function comicImg(comicId: number): string {
  return `images/comics/${comicId}.jpg`;
}

function preloadComics(comicIds: Array<number>): void {
  comicIds.forEach((id) => {
    const img = new Image();
    img.src = comicImg(id);
  });
}

function ComicView({comicId}: {comicId: number}) {
  const history = useHistory();

  const key = `${comicId}`;
  const {hover} = comicData[key];
  const random = randomInt(lastComic) + 1;

  const isFirst = comicId === 1;
  const isLast = comicId === lastComic;

  const prev = Math.max(comicId - 1, 1);
  const next = Math.min(comicId + 1, lastComic);

  // Register hotkeys.
  useEffect(() => {
    hotkeys('shift+left', () => history.push('/1'));
    hotkeys('left', () => history.push(`/${prev}`));
    hotkeys('right', () => history.push(`/${next}`));
    hotkeys('shift+right', () => history.push(`/${lastComic}`));
    hotkeys('x', () => history.push(`/${random}`));
    return () => hotkeys.unbind('shift+left,left,right,shift+right,x');
  });

  // Preload other images.
  useEffect(() => {
    preloadComics([11, prev, random, next, lastComic]);
  });

  return (
    <>
      <div className="header">
        <Link 
          to="1" 
          className={isFirst ? 'disabled' : ''}
          title="Shift + Left Arrow"
        >
          « First
        </Link>
        <Link 
          to={`/${prev}`}
          className={isFirst ? 'disabled' : ''}
          title="Left Arrow"
        >
          ← Previous
        </Link>
        <Link to={`/${random}`} title="X">
          Random
        </Link>
        <Link 
          to={`/${next}`}
          className={isLast ? 'disabled' : ''}
          title="Right Arrow"
        >
          Next →
        </Link>
        <Link 
          to={`/${lastComic}`}
          className={isLast ? 'disabled' : ''}
          title="Shift + Right Arrow"
        >
          Last »
        </Link>
      </div>
      <img 
        src={comicImg(comicId)}
        alt={hover}
        title={hover}
      />
    </>
  );
}