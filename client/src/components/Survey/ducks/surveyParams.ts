import { SurveyParams } from 'common/types/entities/survey'

export interface SurveyParamsState {
  survey: SurveyParams
}

const initialState: SurveyParamsState = {
  survey: {
    age: 0,
    gender: 'n',
    score1: [],
    score2: [],
    score3: [],
  },
}

const RESET = 'Layout/SurveyParams/RESET'
const UPDATE = 'Layout/SurveyParams/UPDATE'

export const resetSurveyParams = () => {
  return {
    type: RESET,
  }
}

export const updateSurveyParams = (SurveyParams: SurveyParamsState) => dispatch => {
  dispatch({
    state: SurveyParams,
    type: UPDATE,
  })
}

const surveyParams = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.state,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default surveyParams
