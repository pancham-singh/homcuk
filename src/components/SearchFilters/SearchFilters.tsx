import React,{Component} from "react";
import "./SearchFilters.scss";
const {MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBInput, MDBBtn} = require("mdbreact");

class SearchFilters extends Component{

    render(){
        const sideBarLinks = [

            {
                name: 'Sort By',
                inputType: 'none',
                selected: 'High to Low',
                links: [{
                    name: 'Rating',
                    value: 'High to Low'
                },
                    {
                        name: 'Cost',
                        value: 'High to Low'
                    },
                    {
                        name: 'Rating',
                        value: 'Low to High'
                    },
                    {
                        name: 'Recently Added',
                        value: 'New to Old'
                    }]
            },
            {
                name: 'Cuisine',
                selected: 'High to Low',
                inputType: 'none',
                links: [{
                    name: 'North India',
                    value: '150'
                },
                    {
                        name: 'Fast Food',
                        value: '100'
                    }
                ]
            },
            {
                name: 'More Filters',
                selected: 'High to Low',
                inputType: 'checkbox',
                links: [{
                    name: 'Pure Veg',
                    value: ' pure-veg'
                },
                    {
                        name: 'Chilly',
                        value: ' chilly'

                    },
                    {
                        name: 'No Wheat',
                        value: ' no-wheat'

                    },
                    {
                        name: 'No Alcohol Use',
                        value: ' no-alcohol-use'

                    },
                ]
            }
        ];

        const sideLinkCategories = sideBarLinks.map((link,key) =>(
            <MDBSideNavNav key={"sidebar-"+key}>

                <MDBSideNavCat className="cat-name" name={link.name} id={key+"sidebar"}>
                    {link.inputType ==="none" && <p className="cat-text">Popularity  -  {link.selected}</p>}

                    {link.links.map((subLink,i) => (
                        <div className="d-flex text-dark justify-content-between show" key={"sidebar"+key+i}>
                            {link.inputType ==="none"  &&  <MDBBtn flat block  className="px-4 text-left d-flex justify-content-between"><span className="filter-name">{subLink.name}</span><span className="filter-value">{subLink.value}</span></MDBBtn>}

                            {link.inputType ==="checkbox"  &&  <MDBInput labelClass="filter-name" label={subLink.name} type="checkbox" id={key+subLink.value}/>}
                        </div>
                    ))}
                </MDBSideNavCat>
            </MDBSideNavNav>
        ))
        return(
            <MDBSideNav tag="div" responsive fixed   className=" position-relative bg-white text-dark side-bar">
                <div>
                    <p className="m-4 filters">Filters</p>
                </div>
                {sideLinkCategories}
            </MDBSideNav>
        )
    }

}

export default SearchFilters;
