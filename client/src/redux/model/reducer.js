import ACTIONS from "./types";

const initialState = {
  allModels: [],
  models: [],
  modelsCount: 0,
  contents: [],
  contentsUpdated: false,
  discords: [],
  discordsCount: 0,
  accounts: [],
  accountsCount: 0,
  history: [],
  historyCount: 0,
}

const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_MODELS:
      return {
        ...state,
        models: action.payload.actors,
        modelsCount: action.payload.actorsCount,
      };
    case ACTIONS.LOAD_ALL_MODELS:
      return {
        ...state,
        allModels: action.payload.actors,
      };
    case ACTIONS.LOAD_DISCORDS:
      return {
        ...state,
        discords: action.payload.discords,
        discordsCount: action.payload.discordsCount,
      };
    case ACTIONS.LOAD_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload.accounts,
        accountsCount: action.payload.accountsCount,
      };
    case ACTIONS.GET_MODEL_CONTENT:
      return {
        ...state,
        contents: action.payload.actor.contents,
        contentsUpdated: action.payload.actor.updated,
      };
    case ACTIONS.LOAD_ACCOUNT_HISTORY:
      return {
        ...state,
        history: action.payload.history,
        historyCount: action.payload.historyCount,
      };
    default:
      return state;
  }
};

export default modelReducer;