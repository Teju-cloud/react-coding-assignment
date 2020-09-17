import { 
    FETCH_SPACE_DATA, 
    FETCH_SPACE_PAYLOAD, 
    FILTER_BY_VALUE, 
    FILTER_BY_PAYLOAD_VALUE,
    LOAD_NEW_PAGE, 
    LOAD_EXACT_PAGE  } from './types'

export const fetchSpaceX = (payload) => dispatch => {
    fetch('https://api.spacexdata.com/v3/history')
        .then( res => res.json())
        .then (spacex => 
          dispatch({
            type: FETCH_SPACE_DATA,
            payload: spacex,
            count: payload,
        })
    )
} 

export const fetchSpaceXPayload = (payload) => dispatch => {
    fetch('https://api.spacexdata.com/v3/payloads')
        .then( res => res.json())
        .then (spacexpayload => 
            dispatch({
            type: FETCH_SPACE_PAYLOAD,
            payload: spacexpayload,
            count: payload,
        })
    )
}

export const filterText = payload => ({
    type: FILTER_BY_VALUE,
    payload
  });

  export const filterPayloadText = payload => ({
    type: FILTER_BY_PAYLOAD_VALUE,
    payload
  });


export const loadNewPage = (payload) => ({
   type: LOAD_NEW_PAGE,
   payload
});

export const loadExactPage = (payload) => ({
   type: LOAD_EXACT_PAGE,
   payload
});

