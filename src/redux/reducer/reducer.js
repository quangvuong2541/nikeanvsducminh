import { combineReducers } from "redux";
import reducerURL from "../../components/ListProduct/module/reducer/reducer";
import reducerCard from "../../components/Cart/module/reducer/reducers"
const rootReducer = combineReducers({
  reducerURL,
  reducerCard,
  
});
export default rootReducer;
