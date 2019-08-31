import React from 'react';
import "./Banner.scss";
const {MDBView,MDBMask,MDBRow,MDBCol,MDBIcon,MDBContainer,MDBInput,MDBBtn} = require("mdbreact");
class Banner extends React.Component<any,any>{

    render(){
        return(
            <MDBView className="banner-container">
                <div className="banner-background">
                <MDBMask className="flex-center flex-column text-white text-center" key>
                    <p className="banner-heading">Home Made Food at your Door</p>
                    <p className="banner-subheading">We love to serve our customers with healthy</p>
                    <p className="banner-subheading banner-title">HOME MADE FOOD </p>
                    <MDBContainer className="banner-search-container">
                    <MDBRow className="banner-search">
                        <MDBCol size="1" className="d-none d-sm-block">
                            <MDBIcon size="lg" icon="map-marker-alt " />
                        </MDBCol>
                        <MDBCol size="12" md="9" className="search-field-container-xs d-md-none d-lg-none">
                            <div >
                            <MDBInput hint="Enter Your Location " />
                            </div>
                        </MDBCol>
                        <MDBCol size="10" md="9" className="search-field-container d-none d-sm-block">
                            <div >
                                <MDBInput hint="Enter Your Location"  />
                            </div>
                        </MDBCol>
                        <MDBCol size="4" md="2" className="d-none d-sm-block">
                            <MDBBtn className="search-btn" flat onClick={()=>this.props.history.push("/search")}>FIND KITCHENS</MDBBtn>
                        </MDBCol>
                    </MDBRow>

                    </MDBContainer>
                    <MDBRow className="d-block d-sm-none">
                        <MDBCol size="12" md="12" >
                            <MDBBtn className="search-btn-xs" block rounded color="primary">FIND KITCHENS</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBMask>
                </div>
            </MDBView>
        )
    }
}
export default Banner;
