import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Gift, Heart, Sparkles } from 'lucide-react';
import './styles.css';
import birthdayRooftop from './assets/birthday-rooftop.png';

const typedMessage = 'Happy Birthday Muski';
const wishMessage =
  "Wishing you a day filled with love, laughter, and unforgettable memories. May this new year of your life bring you endless happiness, good health, success, and all the dreams you've been working toward. Keep smiling, keep shining, and never stop believing in yourself.";
const wishClosing = 'Have an amazing birthday and a fantastic year ahead! 🥳🎁🎈❤️';

function App() {
  const [phase, setPhase] = useState('galaxy');
  const [typed, setTyped] = useState('');
  const [typedWish, setTypedWish] = useState('');
  const [showWish, setShowWish] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: index,
        left: `${(index * 47) % 100}%`,
        top: `${(index * 83) % 100}%`,
        size: `${1 + (index % 4)}px`,
        delay: `${(index % 19) * -0.4}s`,
        duration: `${5 + (index % 9)}s`,
      })),
    [],
  );

  const floaters = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        delay: `${(index % 10) * -1.2}s`,
        duration: `${11 + (index % 7)}s`,
        size: `${10 + (index % 5) * 5}px`,
        kind: index % 3 === 0 ? 'heart' : index % 3 === 1 ? 'spark' : 'petal',
      })),
    [],
  );

  function enterBlackHole() {
    setPhase('transition');
    setTimeout(() => setPhase('wish'), 2000);
  }

  useEffect(() => {
    if (phase !== 'wish') {
      return undefined;
    }

    setTyped('');
    setTypedWish('');
    setShowWish(false);
    let index = 0;

    const typer = setInterval(() => {
      index += 1;
      setTyped(typedMessage.slice(0, index));

      if (index === typedMessage.length) {
        clearInterval(typer);
        setTimeout(() => setShowWish(true), 650);
      }
    }, 158);

    return () => clearInterval(typer);
  }, [phase]);

  useEffect(() => {
    if (!showWish) {
      return undefined;
    }

    setTypedWish('');
    let index = 0;

    const wishTyper = setInterval(() => {
      index += 1;
      setTypedWish(wishMessage.slice(0, index));

      if (index === wishMessage.length) {
        clearInterval(wishTyper);
      }
    }, 34);

    return () => clearInterval(wishTyper);
  }, [showWish]);

  return (
    <main className={`app-shell ${phase}`}>
      {(phase === 'galaxy' || phase === 'transition') && (
        <section className="galaxy-page" aria-label="Galaxy entrance">
          <div className="deep-space" />
          <div className="star-field" aria-hidden="true">
            {stars.map((star) => (
              <span
                className="star"
                key={star.id}
                style={{
                  '--left': star.left,
                  '--top': star.top,
                  '--size': star.size,
                  '--delay': star.delay,
                  '--duration': star.duration,
                }}
              />
            ))}
          </div>
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />

          <div className="galaxy-copy">
            <span className="signal">
              <Sparkles size={17} />
              31 July
            </span>
            <h1>A tiny universe is waiting</h1>
            <p>Press the portal and let the stars take you to another world.</p>
            <button className="portal-button" onClick={enterBlackHole} type="button">
              <Gift size={21} />
              Enter the new space
            </button>
          </div>
        </section>
      )}

      <div className={`black-hole ${phase === 'transition' ? 'active' : ''}`} aria-hidden="true">
        <span />
      </div>

      {phase === 'wish' && (
        <section className="birthday-page" aria-label="Birthday wish for Muski">
          <img className="backdrop" src={birthdayRooftop} alt="" />
          <div className="shade" />

          <div className="float-layer" aria-hidden="true">
            {floaters.map((item) => (
              <span
                className={`floater ${item.kind}`}
                key={item.id}
                style={{
                  '--left': item.left,
                  '--delay': item.delay,
                  '--duration': item.duration,
                  '--size': item.size,
                }}
              />
            ))}
          </div>

          <section className="wish-stage">
            <div className="date-pill">
              <Sparkles size={18} />
              <span>31 July</span>
            </div>

            <div className="cake" aria-label="birthday cake">
              <span className="flame" />
              <span className="candle" />
              <span className="cake-top" />
              <span className="cake-base" />
            </div>

            

            <h2 className="typed-title">
              {typed}
              <span className="cursor" aria-hidden="true" />
            </h2>

            <div className={`love-note ${showWish ? 'show' : ''}`}>
              <Heart className="note-heart" fill="currentColor" size={26} />
              <p>{typedWish}</p>
              <span className={typedWish.length === wishMessage.length ? 'show' : ''}>{wishClosing}</span>
            </div>
          </section>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
