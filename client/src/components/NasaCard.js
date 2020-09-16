import React from 'react';

const NasaCard = (props) => {
    return (
        <div className="cardBit">

            {props.title ? <h1>Title: {props.title}</h1> : <h1>Invalid Date</h1>}
            {props.date ? <p>Date: {props.date}</p> : <p></p>}

            <div className="innerBox">
                {props.explanation ? <p>{props.explanation}</p> :
                    <p>The Nasa API doesn't have an image for this date</p>}
                <div className="imgHolder">
                    <img src={props.url} alt="Image not available"></img>
                </div>
            </div>

        </div>
    )
}

export default NasaCard;