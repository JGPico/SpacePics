import React from 'react';

const NasaCard = (props) => {
    return (
        <div className="cardBit">
            <h2>Title: {props.title}</h2>
            <p>Date: {props.date}</p>
            <div className="innerBox">
                <p>Explanation: {props.explanation}</p>
                <div className="imgHolder">
                    <img src={props.url} alt="Cool Pic"></img>
                </div>
            </div>
        </div>
    )
}

export default NasaCard;