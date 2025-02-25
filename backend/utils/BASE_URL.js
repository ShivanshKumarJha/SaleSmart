import {LOCALHOST_URL, NODE_ENV, PRODUCTION_URL} from "../config/environments.js";

export const BASE_URL = NODE_ENV === 'production' ? PRODUCTION_URL : LOCALHOST_URL;