import { 
    FETCH_SPACE_PAYLOAD, 
    FILTER_BY_PAYLOAD_VALUE, 
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE } from '../actions/types';

const initialState = {
    payloadDetails: [],
    filteredPayload: [],
    appliedPayloadFilters: []
}

export default function (state = initialState, action) {
    
    switch(action.type) {
        case FETCH_SPACE_PAYLOAD:
            let count = action.count.count;
            let countPerPage = action.payload.countPerPage || 10;
            let totalPages = Math.ceil(count/countPerPage);
            return {
                ...state,
                payloadDetails: action.payload,
                filteredPayload: action.payload.slice(0, countPerPage),
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages
            }

        case FILTER_BY_PAYLOAD_VALUE:
            let newPayloadState = Object.assign({}, state);
            let payLoadValue = action.payload.value;
            let filteredPayloadValues = state.payloadDetails.filter(item => {
                return item.payload_id.toLowerCase().includes(payLoadValue) ||
                       item.payload_type.toLowerCase().includes(payLoadValue)
            });
            let appliedPayloadFilters = state.appliedPayloadFilters;
            if (payLoadValue) {
                let index = appliedPayloadFilters.indexOf(FILTER_BY_PAYLOAD_VALUE);
                if (index===-1)
                    appliedPayloadFilters.push(FILTER_BY_PAYLOAD_VALUE);
                    newPayloadState.filteredPayloadDetails = filteredPayloadValues;
            } else {
                let index = appliedPayloadFilters.indexOf(FILTER_BY_PAYLOAD_VALUE);
                appliedPayloadFilters.splice(index, 1);
                if (appliedPayloadFilters.length === 0) {
                    newPayloadState.filteredPayloadDetails = newPayloadState.payloadDetails;
                }
            }
            return newPayloadState;

        case LOAD_NEW_PAGE:
            let loadNewPageState = Object.assign({}, state);
            let addPages = action.payload.page;
            loadNewPageState.currentPage += addPages;
            
            let perPage = loadNewPageState.countPerPage; 
            let nextSpaceXHistory;
            if (addPages === 1){
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount;
                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextSpaceXHistory = loadNewPageState.payloadDetails.slice(lowerCount, upperCount);
            }
            
            if (addPages ===-1){
                let upperCount = loadNewPageState.currentCount; 
                let lowerCount = loadNewPageState.currentCount - perPage;
                loadNewPageState.currentCount = lowerCount;
                nextSpaceXHistory = loadNewPageState.payloadDetails.slice(lowerCount - perPage, upperCount - perPage);
            }
            loadNewPageState.filteredPayload = nextSpaceXHistory;
            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`);
            return loadNewPageState;
        
            case LOAD_EXACT_PAGE:
                const exactPageState = Object.assign({}, state);
                const exactPage = action.payload.page;
                let upperCountExact = exactPageState.countPerPage * exactPage;
                let lowerCountExact = upperCountExact - exactPageState.countPerPage;

                let exactValue = exactPageState.payloadDetails.slice(
                    lowerCountExact,
                    upperCountExact
                );
                exactPageState.filteredPayload = exactValue;
                exactPageState.currentCount = upperCountExact;
                exactPageState.currentPage = exactPage;
                window.history.pushState(
                    { page: 1 },
                    "title 1",
                    `?page=${exactPageState.currentPage}`
                );
                return exactPageState;
            
            default :
                return state;
    }
}