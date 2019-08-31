import React from 'react';
import "./FooterBanner.scss"
import android from "assets/images/layer-63_3.png";
import ios from "assets/images/layer-64.png";
import apps from "assets/images/layer-39.png";

const {MDBContainer,MDBRow,MDBCol,MDBView} = require("mdbreact");

class FooterBanner extends React.Component{

    render(){
        return(
            <MDBView className="banner-container ">
                <div className="banner-background-footer ">
                   <MDBContainer fluid className="mx-4 pt-5">
                       <div className="d-flex align-content-end flex-nowrap bd-highlight">
                           <MDBRow>
                               <MDBCol size="12" md="6" className="d-flex align-content-center pt-5">
                                   <div>
                                       <p className="banner-heading">Best home chefs at your doorstep</p>
                                       <p className="banner-subheading">Choose from a variety of chefs, cuisines or dishes preparing at a home near you.</p>
                                       <p className="banner-subheading">Download the App now.</p>

                                       <div>
                                           <img className="app-images" src={android} alt="android app"/>
                                           <img className="app-images" src={ios} alt="ios app"/>
                                       </div>
                                   </div>
                               </MDBCol>
                               <MDBCol size="12" md="6" className="d-flex align-content-end align-items-end">
                                       <img src={apps}  className="apps-image" alt="apps"/>
                               </MDBCol>
                           </MDBRow>
                       </div>

                   </MDBContainer>
                </div>
            </MDBView>
        )
    }

}
export default FooterBanner;
