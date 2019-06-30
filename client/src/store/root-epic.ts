import { combineEpics } from "redux-observable";

import * as authEpics from "./auth/epics";
import * as postEpics from "./post/epics";

export default combineEpics(...Object.values(authEpics), ...Object.values(postEpics));
