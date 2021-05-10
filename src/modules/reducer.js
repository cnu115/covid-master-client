import ACTIONS from "./action";
// import _ from "lodash";
import Api from "../middleware/api";

const player_1_name = localStorage.getItem('name');
const auth = localStorage.getItem('auth');
const token = localStorage.getItem('token');
const defaultState = {
        player_1: 100,
        player_2: 100,
        isShowQuitAlert: false,
        areYouWin: false,
        comments:[],
        player_1_name: player_1_name ? player_1_name : 'playerA',
        giveUp: false,
        isGameStarted: false,
        navLoginRegToggle: true,
        isLogin: auth ? auth : false,
        token: token ? token : null
};

const updateGameStatus = (gameStatus) => {
    let data = {};
    data.id = localStorage.getItem('gameId');
    data.gameStatus = gameStatus;
    Api.updateGame(data).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}

const logs = (type) => {
    let data = {};
    data.action_type = type;
    Api.updateLogs(data).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}

const gemeReducer = (state = defaultState, action) => {

    const player_1_health = Math.floor(Math.random() * 11); 
    const player_2_health = Math.floor(Math.random() * 11);

    logs(action.type);

  switch (action.type) {

    case ACTIONS.Types.ATTACK: {
         
        let newState = { ...state, 
            player_1: state.player_1 - player_1_health - player_1_health,
            player_2: state.player_2 - player_2_health - player_2_health,
            comments: [...state.comments, `Dragon attack the ${state.player_1_name} by ${player_1_health}`, 
            `${state.player_1_name} attack the Dragon by  ${player_2_health}`]
        }
       
        if(newState.player_1 <= 0){
             newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: false,
            }
            updateGameStatus(newState.areYouWin);
        }else if(newState.player_2 <= 0){
            newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: true,
            }
            updateGameStatus(newState.areYouWin);
        }

        return newState;
    }
    case ACTIONS.Types.BLAST: {
         
        let newState = { ...state, 
            player_1: state.player_1 - player_1_health,
            player_2: state.player_2 -  player_2_health * 2,
            comments: [...state.comments, `Dragon attack the ${state.player_1_name} by ${player_1_health}`, 
            `${state.player_1_name} attack the Dragon by  ${player_2_health * 2}`]
        }
       
        if(newState.player_1 <= 0){
             newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: false,
            }
            updateGameStatus(newState.areYouWin);
        }else if(newState.player_2 <= 0){
            newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: true,
            }
            updateGameStatus(newState.areYouWin);
        }

        return newState;
    }
    case ACTIONS.Types.HEAL: {
         
        let newState = { ...state, 
            player_1: state.player_1 + player_1_health - Math.floor(Math.random() * 11),
            player_2: state.player_2 + player_2_health - Math.floor(Math.random() * 11),
            comments: [...state.comments, `Dragon attack the ${state.player_1_name} by ${player_1_health}`, 
            `${state.player_1_name} attack the Dragon by  ${player_2_health * 2}`]
        }
       
        if(newState.player_1 <= 0){
             newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: false,
            }
        }else if(newState.player_2 <= 0){
            newState = { ...newState, 
                isShowQuitAlert: true,
                areYouWin: true,
            }
        }

        return newState;
    }
    case ACTIONS.Types.GIVE_UP: {
        const newState = {
            ...state,
            giveUp: true
        }
        updateGameStatus(newState.giveUp);
        return newState;
    }
    case ACTIONS.Types.PLAY_AGAIN: {
        return {...defaultState};
    }
    case ACTIONS.Types.CANCEL_GAME: {
       return { ...state, 
            isShowQuitAlert: false,
        }
    }
    case ACTIONS.Types.START_GAME: {
        return {...state,isGameStarted:true}
    }
    case ACTIONS.Types.LOGIN_REG: {
        console.log(action)
        return {
            ...state,
            navLoginRegToggle: action.payload
        }
    }
    case ACTIONS.Types.LOGIN: {
        return {
            ...state,
            isLogin: "true",
            player_1_name: action.payload.name,
            token: action.payload.token
        }
    }
    case ACTIONS.Types.LOGOUT: {
        localStorage.clear();
        sessionStorage.clear();
        return {
            ...defaultState,
            isLogin: "false",
            player_1_name: ''
        }
    }
    default:
      return state;
  }
};

export default gemeReducer;
