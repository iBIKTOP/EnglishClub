import React from 'react';
import welcome from "../../../../img/eng1.jpg";

export default class WelcomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-container">
                <img src={welcome} className='welcomeImg'></img>
            </div>
        );
    }


}