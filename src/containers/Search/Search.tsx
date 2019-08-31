import React, {Component} from "react";
import App from "containers/App";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import "./Search.scss"
import ChefCard from "../../components/ChefCard/ChefCard";
import PopularChefs from "../../components/PopularChefs/PopularChefs";
import {connect} from "react-redux";
import { getChefs} from "../../redux/chef";
const {MDBRow, MDBContainer, MDBCol, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBBtn} = require("mdbreact");

class Search extends Component<any, any> {

  async componentDidMount() {
      const { dispatch } = this.props;
      try{
          await dispatch(getChefs({args:{}, limit: 10, next: null, previous: null   }));
      }catch (e) {

      }
    }
    viewChef = async (id: string)=> {
      const {history} = this.props;
      try {
          await history.push("/search/chef",{chefId: id});
      }catch (e) {

      }
    }
    render() {
      const {chefs } = this.props;
        return (
            <App  {...this.props}>
                <div className="search-container">
                    <div className="search-banner"/>
                <MDBContainer fluid>
                    <MDBRow center>
                        <MDBCol md="3">
                            <MDBDropdown>
                                <MDBDropdownToggle flat block
                                                   className="text-left px-3 search-text bg-white search-field mt-2 d-flex justify-content-between align-items-center">
                                    <span><MDBIcon icon="map-marker-alt"
                                                   className="mr-1"/>  <span>Phase 10, Mohali</span></span>
                                    <span><MDBIcon icon="caret-down"/></span>

                                </MDBDropdownToggle>
                                <MDBDropdownMenu basic className="z-depth-5">
                                    <MDBDropdownItem>Action</MDBDropdownItem>
                                    <MDBDropdownItem>Another Action</MDBDropdownItem>
                                    <MDBDropdownItem>Something else here</MDBDropdownItem>
                                    <MDBDropdownItem divider/>
                                    <MDBDropdownItem>Separated link</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBCol>
                        <MDBCol md="6" className="mt-2">
                            <div className="input-group search-text search-field">
                                <div className="input-group-prepend ">
                                 <span className="input-group-text bg-white" id="basic-addon">
                                 <i className="fa fa-search prefix search-icon"/>
                                </span>
                                </div>
                                <input type="text" className="form-control search-text search-field  border-left-0 form-control-lg" placeholder="Search for Chef or Cuisine"/>
                            </div>


                        </MDBCol>
                        <MDBCol md="1" className="px-0">
                            <MDBBtn flat className="search-field search-button rounded">
                                Search
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol size="10">
                            <div className="pt-4">
                            <p className="search-result-heading my-1">Homcuk Chef in Phase 10 Mohali</p>
                            <p className="search-result-subheading my-1">Showing 20 Chefs to phase 10</p>
                            </div>
                        </MDBCol>


                        </MDBRow>
                    <MDBRow end>
                        <MDBCol size="3">
                            <p className="my-0 popular-chefs "> Popular Chefs</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol md="2">
                            <SearchFilters/>
                        </MDBCol>
                        <MDBCol md="6" className="ml-4">
                            {!!chefs.length && chefs.map((chef: any,index: number) =>(
                                <ChefCard chef={chef} key={"chef"+index} viewChefProfile={()=>this.viewChef(chef.id)}/>
                            ))}

                        </MDBCol>
                        <MDBCol md="2" className="pl-0">
                            <PopularChefs/>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            </App>
        )
    }

}
const mapStateToProps = (state: any) => {
    return {
        loadingChefs: state.chef.loadingChefs,
        chefs: state.chef.chefs,
        error: state.chef.error
    }
};
const SearchListing  = connect(mapStateToProps)(Search);
export default SearchListing;
