import { legacy_createStore } from "redux";
import rootReducer from "./reducer";

export default legacy_createStore(rootReducer);
