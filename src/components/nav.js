import { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import ACTIONS from '../modules/action';

const Nav = (props) => {
    const loginRegisterToggle = (auth) => {
        let value = true
        if(auth !== 'login'){
            value = false;
        }
        props.loginRegiToggle(value)
    }
    const {isLogin} = props.player
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>Covid Master</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {isLogin !== "true" ? 
                        <>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => loginRegisterToggle('login')} href="#">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => loginRegisterToggle('register')} href="#">Register</a>
                            </li>
                        </>
                        : <>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/past-games'}>Past Games</Link>
                         </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => props.logOut()} href="#">Logout</a>
                         </li>
                         </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    player: state
})

const mapDispatchToProps = dispatch => ({
    loginRegiToggle: (payload) => dispatch(ACTIONS.loginRegiToggle(payload)),
    logOut: () => dispatch(ACTIONS.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
