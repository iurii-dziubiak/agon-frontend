import mk from '../../../static/img/mk.jpg';
import './ImageList.css';
import {dataHandler} from "../../../data/dataHandler.js";

export function ImageList() {
    const games = fetch("http://localhost:8088/api/games")
        .then(response => {
            if (response.status === 200) {
                return  response.json();
            } else {
                throw new Error('Something went wrong on API server!');
            }
        });


    return (
        <div>

            <ul className="mdc-image-list my-image-list">

                <li className="mdc-image-list__item">
                    <div className="">
                        <img className="mdc-image-list__image" src='../../../static/img/mk.jpg' alt="description mk"/>
                    </div>
                    <div className="mdc-image-list__supporting">
                        <span className="mdc-image-list__label">Text label</span>
                    </div>
                </li>

                <li className="mdc-image-list__item">
                    <div className="mdc-image-list__image-aspect-container">
                        <img className="mdc-image-list__image" src={mk} alt="description mk"/>
                    </div>
                    <div className="mdc-image-list__supporting">
                        <span className="mdc-image-list__label">Text label</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}