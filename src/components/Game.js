import React, { Component } from 'react';
import { connect } from "react-redux";
import ACTIONS from '../modules/action'
import SweetAlert from 'react-bootstrap-sweetalert';
import Nav from '../components/nav'
import Api from '../middleware/api';


class Game extends Component {
    state = {
        timer: false,
        timerLimit: 60000,
        isGameStarted: false
    }

    componentDidMount() {
        console.log(this.props)
    }

    countDownTimmer = () => {
        if (this.state.timer) {
            const timeInterval = setInterval(() => {

            }, this.state.timerLimit)
        }
    }
    onConfirm = () => {
        this.props.playAgain();
    }

    onCancel = () => {
        this.props.cancelGame();
    }

    attackHandler = () => {
        this.props.attack()
    }
    startGame = () => {
        const data = {}
        Api.StartGame().then(res => {
            console.log(res)
            if(res.data.status === "SUCCESS"){
                if(res.data.results){
                    localStorage.setItem('gameId',res.data.results._id);
                }
            }
        })
        this.props.startGame();
        // this.pastGames()
    }
    pastGames = () => {
        const data = {}
        Api.pastGames().then(res => {
            console.log(res)
        })
    }
    render() {
        const { player_1_name, isGameStarted, player_1, player_2, isShowQuitAlert, areYouWin, comments, giveUp } = this.props.players
        return (
            <>
                <Nav />
                <div className="row">
                    <div className="col-sm-8">
                        <div className="jumbotron text-center">
                            <div className="row">
                                <div className="col-sm-5">
                                    <button type="button" disabled className="btn btn-light" style={{ width: "246px" }}>{player_1_name}</button>
                                </div>
                                <div className="col-sm-2">
                                    <span />
                                </div>
                                <div className="col-sm-5">
                                    <button type="button" disabled className="btn btn-light" style={{ width: "246px" }}>Dragon</button>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-5">
                                    <button type="button" disabled className={player_1 <= 80 ? 'btn btn-danger' : 'btn btn-success'} style={{ width: "246px" }}>{player_1}%</button>
                                </div>
                                <div className="col-sm-2">
                                    <span className="text-center">VS</span>
                                </div>
                                <div className="col-sm-5">
                                    <button type="button" disabled className={player_2 <= 80 ? 'btn btn-danger' : 'btn btn-success'} style={{ width: "246px" }}>{player_2}%</button>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            {isGameStarted ?
                                <>
                                    <div className="row justify-content-center align-self-center">
                                        <span><b>Action Buttons</b></span>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <button type="button" onClick={() => this.attackHandler()} style={{ width: "150px" }} className="btn btn-primary">ATTACK</button>
                                        </div>
                                        <div className="col-sm-3">
                                            <button type="button" onClick={() => this.props.blast()} style={{ width: "150px" }} className="btn btn-primary">BLAST</button>
                                        </div>
                                        <div className="col-sm-3">
                                            <button type="button" onClick={() => this.props.heal()} style={{ width: "150px" }} className="btn btn-primary">HEAL</button>
                                        </div>
                                        <div className="col-sm-3">
                                            <button type="button" onClick={() => this.props.giveUp()} style={{ width: "150px" }} className="btn btn-primary">GIVE UP</button>
                                        </div>
                                    </div>
                                    <br />
                                </>
                                :
                                <div className="row justify-content-center align-self-center">
                                    <button type="button" style={{ width: "250px" }} onClick={() => this.startGame()} className="btn btn-primary">START</button>
                                </div>
                            }
                        </div>
                        {isShowQuitAlert &&
                            <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="YES"
                                confirmBtnBsStyle="success"
                                cancelBtnText="NO"
                                cancelBtnBsStyle="danger"
                                title={`You ${areYouWin ? 'WON' : 'LOSE'} ! Play again ?`}
                                onConfirm={() => this.onConfirm()}
                                onCancel={() => this.onCancel()}
                                focusCancelBtn
                            />
                        }
                        {giveUp &&
                            <SweetAlert
                                title="Dragon Won the game"
                                onConfirm={() => this.onConfirm()}
                                onCancel={() => this.onCancel()}
                            // btnSize="sm"
                            />
                        }
                    </div>
                    <div className="col-sm-4">
                        {isGameStarted &&
                            <div className="row" style={{
                                width: "450px",
                                position: "absolute",
                                top: "76%",
                                left: "50%",
                                transform: "translateX(-50%) translateY(-50%)"
                            }}
                            >
                                {comments.length > 0 &&
                                    <div className="card text-right" >
                                        <div className="card-body">
                                            {comments.slice(Math.max(comments.length - 10, 1)).map((comment, index) => <p className="card-text" key={index}>{comment}</p>)}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    players: state
});

const mapDispatchToProps = dispatch => ({
    attack: () => dispatch(ACTIONS.attack()),
    playAgain: () => dispatch(ACTIONS.playAgain()),
    blast: () => dispatch(ACTIONS.blast()),
    heal: () => dispatch(ACTIONS.heal()),
    giveUp: () => dispatch(ACTIONS.giveUp()),
    startGame: () => dispatch(ACTIONS.startGame()),
    cancelGame: () => dispatch(ACTIONS.cancelGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
