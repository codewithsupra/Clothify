import { USER_ACTION_TYPES } from "./user.types";
import createAction from '../../utils/reducer/reducer.utils.jsx'
export const setCurrentUser=(user)=>{
 return createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user);

}