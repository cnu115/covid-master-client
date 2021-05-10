// import React from 'react';
import axios from "axios";

let Host = "http://localhost:4000";

let loginUrl = `${Host}/user/login`;
let registrationUrl = `${Host}/user/register`;

let startGame = `${Host}/player/create`;
const getPastGames = `${Host}/player/getPastGames`;
const updateGame = `${Host}/player/updateGame`;
const updateLogs = `${Host}/player/logs`;



const token = localStorage.getItem('token')

// console.log(token)

axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
};


const Api = {
    Registration: (data) =>
        axios({
                method: "POST",
                url: registrationUrl,
                data: data
            }),
    Login: (data) =>
        axios({
                method: "POST",
                url: loginUrl,
                data: data
            }),
    StartGame: (data={}) => 
        axios({
            method: "POST",
            url: startGame,
            data: data
        }),
    pastGames: (data={}) => 
        axios({
            method: "GET",
            url: getPastGames,
            data: data
        }),
    updateGame: (data) => 
        axios({
            method: "PUT",
            url: updateGame,
            data: data
        }),
    updateLogs: (data) => 
        axios({
            method: "POST",
            url: updateLogs,
            data: data
        }),

};

export default Api;