import { RootState } from "MyTypes";

type Headers = { [header: string]: string };

export const apiPath: string = "http://localhost:5000/api/";

export const tokenHeaders = (state: RootState) => {
  const token = state.auth.status.token;
  const headers: Headers = defaultHeaders;
  if (token) {
    headers["x-auth-token"] = token;
  }
  return headers;
};

export const defaultHeaders: Headers = {
  "Content-type": "application/json"
};
