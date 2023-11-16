import Head from 'next/head';
import UserLogin from '../components/UserLogin'
import styles from '../styles/Home.module.css';
import { Typography, Stack } from '@mui/material';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spezi Dashboard Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack spacing={3}>
          <Typography variant="h4" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }} >
            Welcome to your Dashboard!
          </Typography>
          <UserLogin ></UserLogin>
        </Stack>
      </main>
    </div>
  );
}
