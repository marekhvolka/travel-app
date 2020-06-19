import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { User } from './models/User'

export enum ActionTypes {
  LOAD_USER = 'LOAD_USER',
  LOGOUT = 'LOGOUT',
  MAP_ZOOM_LEVEL_CHANGED = 'MAP_ZOOM_LEVEL_CHANGED',
  MAP_LAT_LNG_CHANGED = 'MAP_LAT_LNG_CHANGED',
  MAP_SELECT_ITEM = 'MAP_SELECT_ITEM',
  MAP_SHOW_FULL_ITEM_DETAIL = 'MAP_SHOW_FULL_ITEM_DETAIL',
  MAP_HIDE_FULL_ITEM_DETAIL = 'MAP_HIDE_FULL_ITEM_DETAIL',
  TOGGLE_FAVOURITE_ITEM = 'TOGGLE_FAVOURITE_ITEM',
  TOGGLE_SEARCH = 'TOGGLE_SEARCH',
}

export class LoadUserAction {
  type: typeof ActionTypes.LOAD_USER = ActionTypes.LOAD_USER
  payload: User

  constructor(userData: User) {
    this.payload = userData
  }
}

export class LogoutUserAction {
  type: typeof ActionTypes.LOGOUT = ActionTypes.LOGOUT
}

export class MapZoomLevelChangedAction {
  type: typeof ActionTypes.MAP_ZOOM_LEVEL_CHANGED = ActionTypes.MAP_ZOOM_LEVEL_CHANGED
  payload: {
    guideId: string,
    zoomLevel: number
  }

  constructor(guideId: string, zoomLevel: number) {
    this.payload = {
      zoomLevel,
      guideId
    }
  }
}

export class MapLatLngChangedAction {
  type: typeof ActionTypes.MAP_LAT_LNG_CHANGED = ActionTypes.MAP_LAT_LNG_CHANGED
  payload: {
    guideId: string
    latitude: number
    longitude: number
  }

  constructor(guideId: string, latitude: number, longitude) {
    this.payload = {
      guideId,
      latitude,
      longitude,
    }
  }
}

export class MapSelectItemAction {
  type: typeof ActionTypes.MAP_SELECT_ITEM = ActionTypes.MAP_SELECT_ITEM
  payload: {
    guideId: string,
    selectedItemId: string
  }

  constructor(guideId: string, selectedItemId: string) {
    this.payload = {
      guideId,
      selectedItemId
    }
  }
}

export class MapShowFullItemDetailAction {
  type: typeof ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL = ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL
  payload: {
    guideId: string
  }

  constructor(guideId: string) {
    this.payload = {
      guideId
    }
  }
}

export class MapHideFullItemDetailAction {
  type: typeof ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL = ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL
  payload: {
    guideId: string
  }

  constructor(guideId: string) {
    this.payload = {
      guideId
    }
  }
}

export class ToggleFavouriteItemAction {
  type: typeof ActionTypes.TOGGLE_FAVOURITE_ITEM = ActionTypes.TOGGLE_FAVOURITE_ITEM
  payload: {
    guideId: string,
    selectedItemId: string
  }

  constructor(guideId: string, selectedItemId: string) {
    this.payload = {
      guideId,
      selectedItemId
    }
  }
}

export class ToggleSearchAction {
  type: typeof ActionTypes.TOGGLE_SEARCH = ActionTypes.TOGGLE_SEARCH

  payload: {
    guideId: string
  }

  constructor(guideId: string) {
    this.payload = {
      guideId
    }
  }
}

export type Actions =
  | LoadUserAction
  | LogoutUserAction
  | MapLatLngChangedAction
  | MapZoomLevelChangedAction
  | MapSelectItemAction
  | MapShowFullItemDetailAction
  | MapHideFullItemDetailAction
  | ToggleFavouriteItemAction
  | ToggleSearchAction

export type State = {
  userData: User
  _persist: any
}

const defaultState: State = {
  userData: undefined,
  _persist: undefined,
}

const baseReducer = (state: State, action: Actions): State => {
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
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              mapZoomLevel: action.payload.zoomLevel,
            }
          }
        },
      }
    }

    case ActionTypes.MAP_LAT_LNG_CHANGED: {
      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              mapLatitude: action.payload.latitude,
              mapLongitude: action.payload.longitude,
            }
          }
        },
      }
    }

    case ActionTypes.MAP_SELECT_ITEM: {
      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              selectedItemId: action.payload.selectedItemId,
            }
          }
        },
      }
    }

    case ActionTypes.MAP_SHOW_FULL_ITEM_DETAIL: {
      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              showFullDetail: true,
            }
          }
        },
      }
    }

    case ActionTypes.MAP_HIDE_FULL_ITEM_DETAIL: {
      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              showFullDetail: false,
            }
          }
        },
      }
    }

    case ActionTypes.TOGGLE_FAVOURITE_ITEM: {
      let favouriteItemsIds

      if (state.userData.guidesData &&
        state.userData.guidesData[action.payload.guideId] &&
        state.userData.guidesData[action.payload.guideId].favouriteItemsIds[action.payload.selectedItemId]) {
        favouriteItemsIds = {
          ...state.userData.guidesData[action.payload.guideId].favouriteItemsIds
        }

        delete favouriteItemsIds[action.payload.selectedItemId]
      } else {
        favouriteItemsIds = {
          ...(state.userData.guidesData ? state.userData.guidesData[action.payload.guideId].favouriteItemsIds : {}),
          [action.payload.selectedItemId]: {}
        }
      }

      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              favouriteItemsIds
            }
          }
        }
      }
    }

    case ActionTypes.TOGGLE_SEARCH: {
      return {
        ...state,
        userData: {
          ...state.userData,
          guidesData: {
            ...state.userData.guidesData,
            [action.payload.guideId]: {
              ...(state.userData.guidesData || {})[action.payload.guideId],
              showSearch: !state.userData.guidesData[action.payload.guideId].showSearch
            }
          }
        }
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
