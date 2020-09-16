import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import NasaCard from "./NasaCard";

export default function NasaList() {

    const [nasaInfo, setNasaInfo] = useState([]);
    const date = useRef(new Date());
    const [pushed, setPushed] = useState(0);

    function dateUp() {
        const tomorrow = date.current;
        tomorrow.setDate(tomorrow.getDate() + 1);
        date.current = tomorrow;
        setPushed(prevPushed => prevPushed + 1)
    }

    function dateDown() {
        const yesterday = date.current;
        yesterday.setDate(yesterday.getDate() - 1);
        date.current = yesterday;
        setPushed(prevPushed => prevPushed + 1)
    }

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=E6U2FPAaDsk5SGEeaVtBlwh9KvF3UKzTFAq3ofyI&date=${date.current.getFullYear()}-${date.current.getMonth() + 1}-${date.current.getDate()}`)
            .then(res => {
                console.log("This is the response ", res);
                setNasaInfo(res.data)
            }).catch(err => {
                console.log("An error occured when retrieving data from the NASA API ", err)
                setNasaInfo(
                    {
                        explanation: "There is no picture of the day for this date",
                        date: `${date.current.getFullYear()}-${date.current.getMonth()}-${date.current.getDate()}`
                    });
            });
    }, [pushed]);

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
