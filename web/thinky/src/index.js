import { ThinkyApp } from "./ThinkyApp";
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <ThinkyApp/>
    </BrowserRouter>,
    document.querySelector('#root')
)