const initialState={
    users:[],
    favorites:[]
};

const reducer =(state=initialState, action)=>{
   switch(action.type){
    case 'POPULATE_USERS':
        return {...state,users:action.payload.users}
    case 'POPULATE_FAVORITES':
        return {...state,favorites:action.payload.favorites}
    case 'DELETE_FAVORITE':
        return{
            ...state,
            mentors: state.favorites.filter(list=>list._id !==action.payload.id)
        }
    default:
        return state;
   }
}

export default reducer;
