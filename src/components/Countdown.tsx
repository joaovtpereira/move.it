import React, { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

const Countdown: React.FC = () => {
  const {
    minutes,
    seconds,
    hasFinish,
    isActive,
    resetCountdown,
    startCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>
      </div>

      {hasFinish ? (
        <button
          disabled={true}
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abondanor Ciclo
              </button>
            ) : (
              <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo
              </button>
            )}
          </>
        )
      }
    </div>
  );
}

export default Countdown;
