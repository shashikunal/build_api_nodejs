import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  PHOTO_UPLOADED,
  GET_PROFILES,
  GET_REPOS,
  GET_WAKATIME,
  GET_WAKATIME_STATS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  wakatime: [],
  wakatimestats: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case PHOTO_UPLOADED:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case GET_WAKATIME:
      return {
        ...state,
        wakatime: payload,
        loading: false,
      };
    case GET_WAKATIME_STATS:
      return {
        ...state,
        wakatimestats: payload,
        loading: false,
      };
    default:
      return state;
  }
}
