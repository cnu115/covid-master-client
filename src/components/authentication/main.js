import {connect} from 'react-redux';
import Nav from '../nav'
import Login from './login'
import Register from './register'

const MainSection = (props) => {
    const { navLoginRegToggle } = props.players
    return (
        <>
        <Nav />
        <main className="login-form">
            <div className="cotainer">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{ navLoginRegToggle ? 'Login': 'Register' }</div>
                            <div className="card-body">
                                {navLoginRegToggle ? <Login /> : <Register /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
        </>

    )
}
const mapStateToProps = state => ({
    players: state
});

export default connect(mapStateToProps, '')(MainSection);