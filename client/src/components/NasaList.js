import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import NasaCard from "./NasaCard";

export default function NasaList() {

    const [nasaInfo, setNasaInfo] = useState([]);
    const date = useRef(new Date());
    const [selectedDate, setSelectedDate] = useState(date.current);
    const [pushed, setPushed] = useState(0);
    const [isCurrentDay, setIsCurrentDay] = useState(true);
    const [current] = useState(new Date());
    const [loading, setLoading] = useState(false);

    function dateUp() {
        const tomorrow = date.current;
        tomorrow.setDate(tomorrow.getDate() + 1);
        date.current = tomorrow;
        setSelectedDate(date.current)
        setLoading(false)
        setPushed(prevPushed => prevPushed + 1)

        if (date.current.getDate() === current.getDate()) {
            setIsCurrentDay(true);
        } else {
            setIsCurrentDay(false);
        }
    }

    function dateDown() {
        const yesterday = date.current;
        yesterday.setDate(yesterday.getDate() - 1);
        date.current = yesterday;
        setSelectedDate(date.current)
        setLoading(false)
        setPushed(prevPushed => prevPushed + 1)

        if (date.current.getDate() === current.getDate()) {
            setIsCurrentDay(true);
        } else {
            setIsCurrentDay(false);
        }
    }

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=E6U2FPAaDsk5SGEeaVtBlwh9KvF3UKzTFAq3ofyI&date=${date.current.getFullYear()}-${date.current.getMonth() + 1}-${date.current.getDate()}`)
            .then(res => {
                console.log("This is the response ", res);
                setNasaInfo(res.data)
                setLoading(true)
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

                <div className="dateSelectorBox">
                    <button className='daySwitch' onClick={dateDown}>Previous</button>

                    <div className='dateWrapper'>
                        <DatePicker selected={selectedDate}
                            onChange={pickDate => {
                                setSelectedDate(pickDate);
                                date.current = pickDate;
                                setLoading(false)
                                setPushed(prevPushed => prevPushed + 1);

                                if (date.current.getDate() === current.getDate()) {
                                    setIsCurrentDay(true);
                                } else {
                                    setIsCurrentDay(false);
                                }
                            }}
                            dateFormat="yyyy/MM/dd"
                            maxDate={current}
                            showYearDropdown
                            scrollableMonthYearDropdown />
                    </div>

                    <button className='daySwitch' onClick={dateUp} disabled={isCurrentDay}>Next</button>
                </div>

                <NasaCard
                    explanation={nasaInfo.explanation}
                    url={nasaInfo.url}
                    title={nasaInfo.title}
                    date={nasaInfo.date}
                    loading={loading}></NasaCard>

            </div>

            <div className="backgroundHolder" />
        </>
    )
}
