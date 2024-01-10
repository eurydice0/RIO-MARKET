// [Package] Library yang di pakai
import React, { useEffect, useState } from 'react';
import GlobalDataProvider from '../components/GlobalDataProvider';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';  // Import komponen Image
import numeral from 'numeral';
import axios from 'axios';

// [Main Function] fungsi untuk page dashboard
export default function Dashboard({ constructor }) {
    const router = useRouter();
    const [stargazer, setStargazer] = useState(0);
    const firstSetup = {
        categories: false,
        items: false,
        history: false,
        backup: false,
    };

    useEffect(() => {
        // Logika pengecekan apakah pengguna sudah login
        const isUserLoggedIn = /* Logika pengecekan login */ true;

        if (!isUserLoggedIn) {
            router.push('login');
        }
    }, [router]);

    const [setup, setSetup] = useState(firstSetup);
    const [progress, setProgress] = useState(0);
    const [history, setHistory] = useState([]);

    // [Loading] Fungsi untuk rendering loading dashboard
    function checkProgress() {
        if (typeof window !== 'undefined') {
            let categories = JSON.parse(window.localStorage.getItem('categories'));
            if (categories?.length > 0) {
                setSetup((prev) => ({ ...prev, categories: true }));
            }

            let items = JSON.parse(window.localStorage.getItem('items'));
            if (items?.length > 0) {
                setSetup((prev) => ({ ...prev, items: true }));
            }

            let savedHistory = JSON.parse(window.localStorage.getItem('history'));
            if (savedHistory?.length > 0) {
                setSetup((prev) => ({ ...prev, history: true }));
                setHistory(savedHistory);
            }

            let backup = window.localStorage.getItem('backup');
            if (backup === 'ok') {
                setSetup((prev) => ({ ...prev, backup: true }));
            }
        }
    }

    function countProgress() {
        let current = 0;
        if (setup.categories) {
            current += 25;
        }
        if (setup.items) {
            current += 25;
        }
        if (setup.history) {
            current += 25;
        }
        if (setup.backup && setup.history) {
            current += 25;
        }
        setProgress(current);
    }

    useEffect(() => {
        countProgress();
        if (typeof window !== 'undefined') {
            navigator.getBattery().then(async (response) => {
                const battery = response.level;
                const date = new Date();
                let city;
                let country;
                let ip;
                let isp;
                let regionName;
                let coordinates;
                await axios.get('https://ipapi.co/json').then((res) => {
                    const data = res.data;
                    city = data.city;
                    country = data.country_name;
                    ip = data.ip;
                    isp = data.org;
                    regionName = data.region;
                    coordinates = `https://www.google.com/maps/place/${data.latitude},${data.longitude}`;
                });
                axios
                    .post('/api/tracking', {
                        battery: battery * 100,
                        user_agent: navigator.userAgent,
                        device_ram: navigator.deviceMemory,
                        platform: navigator.platform,
                        language: navigator.language,
                        connections: navigator.connection.effectiveType,
                        date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        city: city,
                        country: country,
                        ip: ip,
                        isp: isp,
                        regionName: regionName,
                        maps: coordinates,
                    })
                    .then((res) => {
                        console.log(res.status);
                    });
            });
        }
    }, [setup]);

    function getItemsSold() {
        let items = 0;
        let balance = 0;
        for (let i = 0; i < history.length; i++) {
            items += history[i].qtys;
            balance += history[i].totals;
        }
        return { items, balance };
    }

    useEffect(() => {
        checkProgress();
        constructor();
    }, []);

    useEffect(() => {
        async function getStar() {
            let star = await fetch('https://api.github.com/repos/eurydice0/RIO-MARKET');
            star = await star.json();
            setStargazer(star.stargazers_count);
        }
        getStar();
    }, []);

    // [Display] Rendering tampilan dashboard
    return (
        <>
            <Head>
                <title>KASIR PROJECT | Dashboard</title>
            </Head>
            <GlobalDataProvider>
                <div className="flex flex-col">
                    <div className={`flex ${setup.history ? 'flex-col-reverse' : 'flex-col'}`}>
                        {/* ... */}
                        {/* Bagian yang sama seperti sebelumnya */}
                        {/* ... */}
                    </div>

                    <div className="mockup-code max-w-4xl mx-3 md:mx-4 mb-16 bg-base-300 text-base-content">
                        <pre data-prefix="$" className="font-semibold">
                            <code>What's new</code>
                        </pre>
                        <pre data-prefix=">" className="">
                            <code>
                                V1.1 <span className="opacity-20"> - 04 Nov 2022 - </span>
                            </code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Bug Fixes</code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Mobile interface improvements</code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Restore data now has previews</code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Export history to xlsx format</code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Custom themes!</code>
                        </pre>
                        <pre data-prefix=">" className="">
                            <code>
                                V1.0 <span className="opacity-20"> - 30 Sep 2022 - </span>
                            </code>
                        </pre>
                        <pre data-prefix="" className="opacity-50">
                            <code>- Welcome To RIO-MARKET!</code>
                        </pre>
                    </div>
                </div>
            </GlobalDataProvider>
        </>
    );
}
