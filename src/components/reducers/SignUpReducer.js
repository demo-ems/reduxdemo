const initialState = {
    SIGNUPRES: '',
};

const SignUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Register':
            return { ...state, SIGNUPRES: action.payload, loading: false };

        default:
            return state;
    }
};

export default SignUpReducer;
