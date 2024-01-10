// index.js

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from './Login';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Tambahkan logika untuk memeriksa apakah pengguna sudah login
    // Contoh sederhana: anggap pengguna belum login
    setLoggedIn(false);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    router.push('/dashboard'); // Ganti dengan halaman dashboard setelah login
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>RIO-MARKET</title>
        <meta name="description" content="free cashier app" />
      </Head>

      <main className={styles.main}>
        {isLoggedIn ? (
          <>
            <h1 className={styles.title}>Selamat datang di dashboard!</h1>
            {/* Tambahkan navigasi atau konten dashboard di sini */}
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
} 
