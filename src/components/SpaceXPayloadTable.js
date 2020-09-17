import React from 'react';

import '../App.css';

function PayLoadTable({ payload }) {

    let payloadDetail;
    if (typeof payload.filteredPayloadDetails !== 'undefined' && payload.filteredPayloadDetails.length > 0) { 
        payloadDetail = payload.filteredPayloadDetails
    }else {
        payloadDetail = payload.filteredPayload
    }
 
    const payloadTableData = 
            <table className='table'>        
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Manufacturer</th>
                        <th>Orbit</th>
                        <th>Customer</th>
                        <th>Payload</th>
                        <th>Country</th>
                        <th>Payload Mass</th>
                    </tr>
                </thead>
                <tbody>
                { payloadDetail.map(item => (
                    <tr>
                        <td>{item.payload_id}</td>
                        <td>{item.manufacturer !== null ? item.manufacturer : 'Not Defined'}</td>
                        <td>{item.orbit}</td>
                        <td>{item.customers.map(customer => customer)}</td>
                        <td>{item.payload_type}</td>
                        <td>{item.nationality !== null ? item.nationality : 'Not Defined'}</td>
                        <td>{item.payload_mass_kg !== null ? item.payload_mass_kg + `kg` : 'Not Defined'}</td>
                    </tr>
                ))}
                </tbody> 
            </table>

    return (
        <React.Fragment>
            { payloadTableData }      
        </React.Fragment>   
    )

}

export default PayLoadTable