import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from '../components/Game';
import Authentication from '../components/authentication/main';
import { connect } from 'react-redux';
import PastGames from '../components/PastGames';

const Routes = (props) => {
    const {isLogin} = props.player;
    return(
        <Router>
            <Switch>
                <Route path='/past-games'>
                   <PastGames />
                </Route>
                <Route path='/'>
                   {isLogin === "true" ? <Game /> : <Authentication /> }
                </Route>
            </Switch>
        </Router>
    )
}
const mapStateToProps = state => ({
    player: state
})

export default connect(mapStateToProps, '')(Routes);