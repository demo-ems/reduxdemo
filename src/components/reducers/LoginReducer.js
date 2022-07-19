const initialState = {
    LOGIN:'',
    CATLISTRES: '',
    CATLIStDATA: '',
    LOGINSUCCESSRES:'',
    HOMELISTRES:''
  }
  
  const login = (state = initialState, action) => {
    switch (action.type) {
     
        case 'Login':
          return{...state, LOGIN : action.payload , loading:false};

        case 'CatListRes': 
          return{...state, CATLISTRES : action.payload , loading:false};

        case 'CatListData': 
          return{...state, CATLIStDATA : action.payload , loading:false};

        case 'LoginSuccess': 
          return{...state, LOGINSUCCESSRES : action.payload , loading:false};

        case 'HomeDataSuccess': 
          return{...state, HOMELISTRES : action.payload , loading:false};

      default:
        return state;
    }
  };
  
   export default login;
  
  