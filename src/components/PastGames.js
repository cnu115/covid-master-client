import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Nav from '../components/nav'
import Api from '../middleware/api';

const PastGames = () => {

    const [pastGames, updatePastGames] = useState([]);

    useEffect(() => {
        Api.pastGames().then(res => {
            console.log(res)
            if(res.data.status === "SUCCESS"){
                updatePastGames(res.data.results);
            }
        }).catch(err => {
            console.log(err)
        })
    },[])

    const getPastResutls = () => {
        if(pastGames.length === 0) return null;
        return pastGames.map((game, i) => {
            return <tr key={i}>
                    <th scope="row">{new Date(game.StartTime).toLocaleString()}</th>
                    <td>{game.gameStatus}</td>
            </tr>
        })
    }

    return (
        <>
        <Nav />
        <div className="container">
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Last Played</th>
                    <th scope="col">Game Status</th>
                </tr>
            </thead>
            <tbody>
                {getPastResutls()}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default PastGames;