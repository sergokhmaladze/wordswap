'use client';
import WordGenerator from './components/wordgeneratorbutton';
import styles from './page.module.css';

export default function Home(): React.JSX.Element {
  return (
    <main className={styles.main}>
      <div>
        <WordGenerator></WordGenerator>
      </div>
    </main>
  );
}
