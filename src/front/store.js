export const initialStore=()=>{
  return{
    email:"",
    username: "",
    token:null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'login':

      const {email, username, token} = action.payload

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      return {
        ...store,
        email:email, 
        username:username, 
        token:token
      };

    case 'logout':

      localStorage.clear()

      return {
        ...store,
        email:"",
        username:"",
        token:""
      }

    default:
      throw Error('Unknown action.');
  }    
}
