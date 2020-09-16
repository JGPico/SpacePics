import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import NasaCard from "./NasaCard";

export default function NasaList() {

    const [nasaInfo, setNasaInfo] = useState([]);
    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(7);
    const [month, setMonth] = useState(9);
    const [year, setYear] = useState(2020);

    console.log("Full date ", date)
    console.log("Today's date ", date.getDate())
    console.log("Month is ", date.getMonth())
    console.log("Year is ", date.getFullYear())

    function dateUp() {
        const tomorrow = date;
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
    }

    function dateDown() {
        const yesterday = date;
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday);
    }
    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=E6U2FPAaDsk5SGEeaVtBlwh9KvF3UKzTFAq3ofyI&date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            .then(res => {
                console.log("This is the response ", res);
                setNasaInfo(res.data)
            }).catch(err => {
                console.log("An error occured when retrieving data from the NASA API ", err)
            });
    }, [date]);

    return (
        <>
            <div className='cardHolder'>
                <button className='daySwitch' onClick={dateDown}>Previous</button>

                <NasaCard
                    explanation={nasaInfo.explanation}
                    url={nasaInfo.url}
                    title={nasaInfo.title}
                    date={nasaInfo.date}></NasaCard>

                <button className='daySwitch' onClick={dateUp}>Next</button>
            </div>
            <div className="backgroundHolder" />
        </>
    )
}
