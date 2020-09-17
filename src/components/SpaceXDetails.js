import React from 'react';

import '../App.css';

function SpaceXDetails({ spaceX }) {
    let spaceXDetail;
    console.log(spaceX.filteredSpaceDetails)
    if (typeof spaceX.filteredSpaceDetails !== 'undefined' && spaceX.filteredSpaceDetails.length > 0) { 
        spaceXDetail = spaceX.filteredSpaceDetails
    }else {
        spaceXDetail = spaceX.filteredSpacexX
    }
    
         
    const spaceXDataDisplayed = spaceXDetail.map(item => (
        <div className='space-card' key={item.id}>
            <p>
                <b>Title : </b>
                {item.title}
            </p>
            <p>
                <b>Flight Number : </b> 
                {item.flight_number !== 'null' && item.flight_number}
            </p>
            <p>
                <b>Event Date : </b>
                {item.event_date_utc && item.event_date_utc.slice(0, 10)}
            </p>
            <p>
                <b>Details : </b>
                {item.details}
            </p>  
        </div>
    ))

    return (
        <div className="spacex-container">
            { spaceXDataDisplayed }
        </div>
    )
}

export default SpaceXDetails