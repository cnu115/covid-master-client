// types of action
const Types = {
    ATTACK: "ATTACK",
    PLAY_AGAIN: "PLAY_AGAIN",
    BLAST: "BLAST",
    HEAL: "HEAL",
    GIVE_UP: "GIVE_UP",
    START_GAME: "START_GAME",
    CANCEL_GAME: "CANCEL_GAME",
    PROFILE: "PROFILE",
    LOGIN_REG: "LOGIN_REG",
    LOGOUT: "LOGOUT",
    LOGIN: "LOGIN"
};
// actions
const attack = () => ({
    type: Types.ATTACK,
});

const playAgain = () => ({
    type: Types.PLAY_AGAIN,
})

const blast = () => ({
    type: Types.BLAST,
})

const heal = () => ({
    type: Types.HEAL,
})

const giveUp = () => ({
    type: Types.GIVE_UP,
})

const startGame = () => ({
    type: Types.START_GAME
})
const cancelGame = () => ({
    type: Types.CANCEL_GAME
})
const profileApi = () => ({
    type: Types.PROFILE
})
const loginRegiToggle = (payload) => ({
    type: Types.LOGIN_REG,
    payload: payload
});

const logOut = () => ({
    type: Types.LOGOUT
});

const logIn = (payload) => ({
    type: Types.LOGIN,
    payload: payload,
})



export default {
    attack,
    playAgain,
    blast,
    heal,
    giveUp,
    startGame,
    cancelGame,
    profileApi,
    loginRegiToggle,
    logOut,
    logIn,
    Types
};