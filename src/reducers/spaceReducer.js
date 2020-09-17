import { 
    FETCH_SPACE_DATA,
    FILTER_BY_VALUE, 
    FILTER_BY_PAYLOAD_VALUE, 
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE } from '../actions/types';

const initialState = {
    spaceXDetails: [],
    filteredSpacexX: [],
    appliedFilters: [],
}

export default function (state = initialState, action) {
    
    switch(action.type) {
        case FETCH_SPACE_DATA:
            let count = action.count.count;
            let countPerPage = action.payload.countPerPage || 10;
            let totalPages = Math.ceil(count/countPerPage);
            return {
                ...state,
                spaceXDetails: action.payload,
                filteredSpacexX: action.payload.slice(0, countPerPage),
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages
            }

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredValues = state.spaceXDetails.filter(item => {
                return item.title.toLowerCase().includes(value) ||
                        item.details.toLowerCase().includes(value) 
            });
            let appliedFilters = state.appliedFilters;
            if (value) {
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                if (index===-1)
                    appliedFilters.push(FILTER_BY_VALUE);
                    newState.filteredSpaceDetails = filteredValues;
            } else {
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                appliedFilters.splice(index, 1);
                if (appliedFilters.length === 0) {
                    newState.filteredSpaceDetails = newState.spaceXDetails;
                }
            }
            return newState

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
                nextSpaceXHistory = loadNewPageState.spaceXDetails.slice(lowerCount, upperCount);
            }
            
            if (addPages ===-1){
                let upperCount = loadNewPageState.currentCount; 
                let lowerCount = loadNewPageState.currentCount - perPage;
                loadNewPageState.currentCount = lowerCount;
                nextSpaceXHistory = loadNewPageState.spaceXDetails.slice(lowerCount - perPage, upperCount - perPage);
            }
            loadNewPageState.filteredSpacexX = nextSpaceXHistory;
            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`);
            return loadNewPageState;
        
            case LOAD_EXACT_PAGE:
                const exactPageState = Object.assign({}, state);
                const exactPage = action.payload.page;
                let upperCountExact = exactPageState.countPerPage * exactPage;
                let lowerCountExact = upperCountExact - exactPageState.countPerPage;

                let exactValue = exactPageState.spaceXDetails.slice(
                    lowerCountExact,
                    upperCountExact
                );
                exactPageState.filteredSpacexX = exactValue;
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