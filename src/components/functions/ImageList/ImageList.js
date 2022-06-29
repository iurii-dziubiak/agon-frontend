import React, { useState, useEffect } from 'react';
import './ImageList.css';
// import {dataHandler} from "../../../data/dataHandler.js";
// const items = dataHandler.getGames();

export function ImageList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetch('http://localhost:8088/api/games')
                .then(response => response.json())
                .then(result => setData(result));
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul className="mdc-image-list my-image-list">
                {data.map((value, index) => {
                    return <li key={index} className="mdc-image-list__item">
                        <img className="mdc-image-list__image" src={process.env.PUBLIC_URL + '/img/' + value.image} alt="description mk"/>
                        {/*<div className="mdc-image-list__supporting">*/}
                        {/*    <span className="mdc-image-list__label">{value.name}</span>*/}
                        {/*</div>*/}
                    </li>
                })}
            </ul>
        </div>
    );
}