import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengeContextProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge:  () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

export const ChallengesContext = createContext({} as ChallengeContextProps);

export function ChallengesProvider({children} : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  const levelUp = () => {
    setLevel(level + 1);
  }

  const startNewChallenge = () => {
    // Quando faz Math.random() multiplicado por um número, voce esta falando que
    // vai ser pego um numero de 0 até o numero a ser multipĺicado
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  const resetChallenge = () => {
    setActiveChallenge(null);
  }


  const completeChallenge = () => {
    if(!activeChallenge) {
      return null;
    }

    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience > experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}