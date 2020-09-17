import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpaceX, filterText, loadNewPage, loadExactPage } from '../actions/SpaceActions';
import SpaceXDetails from './SpaceXDetails';
import Title from './Title';

class SpaceX extends Component {

    componentDidMount () {
        const params = new URLSearchParams(window.location.search);
        const pageQueryParam = params.get('page');
        if (!pageQueryParam) {
            window.history.pushState({page: 1}, "title 1", "?page=1");
        } 
        this.props.fetchSpaceX({count: 20})
    }

    filterData(e) {
        let input = e.target.value;
        this.props.filterText({value: input})
    }

    nextPage() {
        this.props.loadNewPage({page: 1})
     }
     
     previousPage() {
        this.props.loadNewPage({page: -1});
     }
     
     goToPage(page) {
        this.props.loadExactPage({page})
     }

    render() {
        return (
            <React.Fragment>
                <div className="spacex-header">
                    <Title title='SpaceX History' />
                    <div>
                        <label>Search:  </label>
                        <input type='text' placeholder='search' onChange={e => {this.filterData(e)}}></input>
                    </div>          
                </div>
                <SpaceXDetails spaceX={this.props.spaceX}/> 

                <section className='section'>
                    <div className='container'>
                        <div className="pagination" role="navigation" aria-label="pagination">
                            <button className="button pagination-previous" onClick={()=> {
                                this.previousPage()
                            }}>Previous</button>
                            <button className="button pagination-next" onClick={() => {
                                this.nextPage()
                            }}>Next page
                            </button>
                            <ul className="pagination-list">
                                {
                                    [...Array(this.props.spaceX.filteredPages)].map((value, index) => (
                                        <button
                                            className={`button pagination-link ${this.props.spaceX.currentPage === index + 1 ? "is-current" : ""}`}
                                            aria-label="Page 1"
                                onClick={() => this.goToPage(index + 1)}

                                            aria-current="page">
                                            {index + 1}
                                        </button>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    spaceX: state.spaceX
});

export default connect( mapStateToProps, {fetchSpaceX, filterText, loadNewPage, loadExactPage} )(SpaceX)