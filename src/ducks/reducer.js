const initialState = {
    user: {
      name: 'Donald Trump',
      pic: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Official_Portrait_of_President_Donald_Trump.jpg'

    }
  };
  
  const LOGIN = 'LOGIN';
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export const login = (user) => {
    return {
      type: LOGIN,
      payload: user,
    };
  };