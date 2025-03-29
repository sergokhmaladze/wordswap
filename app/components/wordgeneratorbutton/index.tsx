'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface Word {
  english: string;
  georgian: string;
}

function WordGenerator(): React.JSX.Element {
  const [words, setWords] = useState<Word[]>([]);
  const [randomWord, setRandomWord] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/words.json')
      .then((response) => response.json())
      .then((data: Word[]) => setWords(data))
      .catch((error) => console.error('error loading json:', error));
  }, []);

  const generateRandomWord = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex].georgian);
      setCurrentIndex(randomIndex);
      setMessage('');
      setUserInput('');
    }
  };

  const checkTranslation = () => {
    if (currentIndex !== null && userInput) {
      const correctTranslation = words[currentIndex].english;
      if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
        setMessage('✅ Correct!');
      } else {
        setMessage(
          `❌ Incorrect. The correct translation is: ${correctTranslation}`
        );
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <button
          onClick={generateRandomWord}
          type="button"
          className={styles.container__button}
        >
          Generate Word
        </button>
      </div>
      <div className={styles.container__randomWord}>
        <p className={styles.container__randomWord__dis}>{randomWord}</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="enter the english word"
          value={userInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
        ></input>
      </div>
      <button onClick={checkTranslation}>Check</button>
      {message && <p>{message}</p>}
    </>
  );
}

export default WordGenerator;
