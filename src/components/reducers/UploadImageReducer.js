const initialState = {
    IMAGEUPLOADRES: '',
};

const UploadImageReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'UPLOADIMAGE':
            return { ...state, IMAGEUPLOADRES: action.payload, loading: false };

        default:
            return state;
    }
};

export default UploadImageReducer;
