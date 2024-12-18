import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ModalContext } from '../contexts/ModalContextProvider';
import { CREATE_GAMEOVER_MODAL_OPTIONS } from './Gameboard';
import useLocalStorage from '../hooks/useLocalStorage';

const Timer = React.forwardRef(({ wordlist, gameOver, score, size, children }, ref) => {
  const startTime = useRef();
  const timeoutRef = useRef();
  const [time, setTime] = useState(0);
  const [highScore, setHighScore] = useLocalStorage('highscore', { [size.join('x')]: 0 });
  const [, setModalOptions] = useContext(ModalContext);

  useEffect(() => {
    startTime.current = Date.now();
    const interval = 1000;
    let expected = Date.now() - interval;
    const count = () => {
      if (gameOver.current) return;

      const elapsed = Date.now() - startTime.current;

      setTime(elapsed);

      // handle drift
      const dt = Date.now() - expected;
      timeoutRef.current = setTimeout(count, Math.max(0, interval - dt));
      expected += interval;
    };
    timeoutRef.current = setTimeout(count, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [gameOver, ref]);

  useImperativeHandle(ref, () => startTime.current, []);

  useEffect(() => {
    if (wordlist.length === 0 || !wordlist.every((w) => w.found)) return;
    gameOver.current = true;
    clearTimeout(timeoutRef.current);

    if (score > (highScore[size.join('x')] || 0))
      setHighScore((prev) => {
        const next = { ...prev };
        next[size.join('x')] = score;
        return next;
      });

    setModalOptions(CREATE_GAMEOVER_MODAL_OPTIONS(score, highScore, size, () => window.location.reload()));
  }, [gameOver, highScore, score, setHighScore, setModalOptions, size, wordlist]);

  const formatTime = (time) => {
    const sec = Math.floor(time / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const formatedTimeArr = hr === 0 ? [min % 60, sec % 60] : [hr % 60, min % 60, sec % 60];
    return formatedTimeArr.map((v) => (('' + v).length === 1 ? '0' + v : '' + v)).join(':');
  };

  return (
    <div className='flex flex-center timer box-shadow round-corner'>
      {children}
      <p>{formatTime(time)}</p>
    </div>
  );
});

export default Timer;
