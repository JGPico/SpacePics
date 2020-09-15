import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NasaCard from "./NasaCard";

export default function NasaList() {

    const [nasaInfo, setNasaInfo] = useState([]);
    const [day, setDay] = useState(13);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=E6U2FPAaDsk5SGEeaVtBlwh9KvF3UKzTFAq3ofyI&date=2020-09-${day}`)
            .then(res => {
                console.log("This is the response ", res);
                setNasaInfo(res.data)
            }).catch(err => {
                console.log("An error occured when retrieving data from the NASA API ", err)
            });
    }, [day]);

    return (
        <>
            <div className='cardHolder'>
                <NasaCard
                    explanation={nasaInfo.explanation}
                    url={nasaInfo.url}
                    title={nasaInfo.title}
                    date={nasaInfo.date}></NasaCard>
            </div>
            <div className="backgroundHolder" />
        </>
    )
}
