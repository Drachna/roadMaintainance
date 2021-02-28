export const initialcomplainState = {
  complains: []
}

export const ComplainReducer = (state = initialcomplainState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_COMPLAINS':
      return action.payload

    case 'ADD_COMPLAIN':
      return [...state, action.payload]

    case 'ADD_ACTION':
      return {
        ...state,
        complains: state.complains.map((complain, index) => {
          return complain._id === action.payload._id ? action.payload : complain
        })
      }

    case 'ADD_UPVOTE':
      return {



      }







    default:
      return state

  }
};

