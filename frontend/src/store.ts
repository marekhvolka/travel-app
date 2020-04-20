import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type UserData = {
  id: string
  email: string
  token: string
  mapZoomLevel: number
  mapLatitude: number
  mapLongitude: number
  selectedItemId: string
  showFullDetail: boolean
}

export enum ActionTypes {
  LOAD_USER = 'LOAD_USER',
  LOGOUT = 'LOGOUT',
  MAP_ZOOM_LEVEL_CHANGED = 'MAP_ZOOM_LEVEL_CHANGED',
  MAP_LAT_LNG_CHANGED = 'MAP_LAT_LNG_CHANGED',
  MAP_SELECT_ITEM = 'MAP_SELECT_ITEM',
  MAP_SHOW_FULL_ITEM_DETAIL = 'MAP_SHOW_FULL_ITEM_DETAIL',
  MAP_HIDE_FULL_ITEM_DETAIL = 'MAP_HIDE_FULL_ITEM_DETAIL',
}

export class LoadUserAction {
  type: typeof ActionTypes.LOAD_USER = ActionTypes.LOAD_USER
  payload: UserData

  constructor(userData: UserData) {
    this.payload = userData
  }
}

export class LogoutUserAction {
  type: typeof ActionTypes.LOGOUT = ActionTypes.LOGOUT
}

export class MapZoomLevelChangedAction {
  type: typeof ActionTypes.MAP_ZOOM_LEVEL_CHANGED = ActionTypes.MAP_ZOOM_LEVEL_CHANGED
  payload: number

  constructor(zoomLevel: number) {
    this.payload = zoomLevel
  }
}

export class MapLatLngChangedAction {
  type: typeof ActionTypes.MAP_LAT_LNG_CHANGED = ActionTypes.MAP_LAT_LNG_CHANGED
  payload: {
    latitude: number
    longitude: number
  }

  constructor(latitude: number, longitude) {
    this.payload = {
      latitude,
      longitude,
    }
  }
}

export class MapSelectItemAction {
  type: typeof ActionTypes.MAP_SELECT_ITEM = ActionTypes.MAP_SELECT_ITEM
  payload: string

  constructor(selectedItemId: string) {
    this.payload = selectedItemId
  }
}

export class MapShowFullItemDetailAction {
  type: typeof ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL = ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL
}

export class MapHideFullItemDetailAction {
  type: typeof ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL = ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL
}

export type Actions =
  | LoadUserAction
  | LogoutUserAction
  | MapLatLngChangedAction
  | MapZoomLevelChangedAction
  | MapSelectItemAction
  | MapShowFullItemDetailAction
  | MapHideFullItemDetailAction

export type State = {
  userData: UserData
  _persist: any
}

const defaultState: State = {
  userData: undefined,
  _persist: undefined,
}

function baseReducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_USER: {
      return {
        ...state,
        userData: action.payload,
      }
    }

    case ActionTypes.LOGOUT: {
      return {
        ...state,
        userData: undefined,
      }
    }

    case ActionTypes.MAP_ZOOM_LEVEL_CHANGED: {
      return {
        ...state,
        userData: {
          ...state.userData,
          mapZoomLevel: action.payload,
        },
      }
    }

    case ActionTypes.MAP_LAT_LNG_CHANGED: {
      return {
        ...state,
        userData: {
          ...state.userData,
          mapLatitude: action.payload.latitude,
          mapLongitude: action.payload.longitude,
        },
      }
    }

    case ActionTypes.MAP_SELECT_ITEM: {
      return {
        ...state,
        userData: {
          ...state.userData,
          selectedItemId: action.payload,
        },
      }
    }

    case ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL: {
      return {
        ...state,
        userData: {
          ...state.userData,
          showFullDetail: true,
        },
      }
    }

    case ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL: {
      return {
        ...state,
        userData: {
          ...state.userData,
          showFullDetail: false,
        },
      }
    }
  }

  return state
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, baseReducer)

export const store = createStore(persistedReducer, defaultState)

export const persistor = persistStore(store)
