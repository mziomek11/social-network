import { combineEpics } from "redux-observable";

import * as authEpics from "./auth/epics";
import * as postEpics from "./post/epics";
import * as commentEpics from "./comment/epics";

export default combineEpics(
  ...Object.values(authEpics),
  ...Object.values(postEpics),
  ...Object.values(commentEpics)
);
