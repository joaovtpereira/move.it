import Head from 'next/head';
import { GetServerSideProps } from 'next';

import {ChallengesProvider} from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ChallengeBox from "../components/ChallengeBox";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(props : HomeProps) {
  console.log(props);
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
                <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

/*  
  Esse metodo permite que o Next faça primeiro uma chamada, para que depois
  ele construe a pagina, isso é importante para que por ex motores de busca
  possam conseguir acessar essas inf, caso a mesma seja importante 
*/

/*  
  Tudo que se executa nessa função, executa no servidor node e nao do browser
*/

/* 
  Por exemplo para blogs, é interessante que voce faça essa chamda dentro desta
  função, pois com isso os mecanismos de buscas vao ter acessos aos dados das
  postagens antes que a pag seja montada
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}