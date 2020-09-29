import React from 'react';
import { BeatLoader } from 'react-spinners';

const NasaCard = (props) => {
    return (
        <div className="cardBit">

            {props.title ? <h1>Title: {props.title}</h1> : <h1></h1>}
            {props.date ? <p>Date: {props.date}</p> : <p></p>}

            <div className="innerBox">
                {props.explanation ? <p>{props.explanation}</p> :
                    <p>Loading ...</p>}
            </div>

            <div className="imgHolder">
                {props.loading ? <img src={props.url} alt="Image not available"></img> : <BeatLoader loading />}
            </div>

        </div>
    )
}

export default NasaCard;