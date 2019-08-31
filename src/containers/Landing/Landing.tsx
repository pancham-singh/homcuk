import React, {Component} from 'react';
import App from "../App/App";
import "./Landing.scss";
import Chefs from "components/Chefs";
import FooterBanner from "../../components/FooterBanner/FooterBanner";
import steps from 'assets/images/steps-homcuk.png';
import food from 'assets/images/layer-14.png';
import NewDishes from "components/NewDishes/NewDishes";

const {MDBRow, MDBCol, MDBContainer} = require("mdbreact");

class Landing extends Component<any,any> {

    render() {
        return (
            <App banner {...this.props}>
                <MDBRow className="remove-row-padding">
                    <MDBCol md="12" xs="12" sm="12">
                        <MDBContainer className="landing-container" fluid>
                            <MDBRow center>
                                <MDBCol md="12" xs="12" sm="12">
                                    <p className="landing-heading">Get Fresh Home Made Food At Your Doorstep! </p>
                                    <p className="follow-the-steps">follow these steps</p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow center>
                                <MDBCol md="12" sm="12" xs="6" className="steps">
                                    <img src={steps} alt="steps" className="steps-image"/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow end className="mt-5">
                                <MDBCol size="12" md="5">
                                    <div>
                                        <p className="display-text">Food <span
                                            className="highlighted-text">DELIVERY</span> or
                                            pickup from  <span className="highlighted-text">HOME CHEF</span></p>
                                    </div>
                                    <div>
                                        <p className="display-text-2">
                                           Home Food delivery or pick up from home Chef. Explore home chefs to pick up
                                            fresh home food or get it delivered at your doorstep. A place for every taste and order home food which
                                            you crave. Find nutritious meals with flexible timings & reasonable rates. Fresh Home made food ready to be delivered
                                            at your doorstep,prepare especially for you.
                                        </p>
                                    </div>
                                </MDBCol>
                                <MDBCol size="12" md="6">
                                    <img src={food} alt="steps" className="food-image"/>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow center className="mt-5">
                                <MDBCol md="10" className="px-0 mt-4">
                                    <p className="display-text text-center"><span className="highlighted-text">Home Chefs</span> Available Near You
                                    </p>
                                    <Chefs {...this.props}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow center className="mt-5">
                                <MDBCol md="10" className="px-0">
                                    <p className="display-text text-center">Homemade <span className="highlighted-text">Dishes</span> Available Near You
                                    </p>
                                    <NewDishes/>
                                </MDBCol>
                            </MDBRow>

                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size="12">
                        <FooterBanner/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <div className="news-letter-container" >
                            <MDBRow center>
                                <MDBCol size="12">
                                    <p className="heading-news-letter">Want Exciting deals or our weekly Newsletter?  get weekly
                                        Email:</p>
                                </MDBCol>
                                <MDBCol size="12" className="inputs d-none d-md-block">
                                        <div className="input-group mb-3 w-100 justify-content-center">
                                            <div >
                                        <input
                                            type="text"
                                            placeholder="Enter Your Address"
                                            className="form-control input-email"
                                        />
                                            </div>
                                            <div className="input-group-append">
                                                <button className="btn btn-md btn-secondary m-0 px-3 submit-button-letter" type="button"
                                                >Submit
                                                </button>
                                            </div>
                                    </div>
                                </MDBCol>

                                <MDBCol size="12" className="d-block d-sm-none">
                                    <div className="input-group mb-3 w-100 justify-content-center">
                                        <input
                                            type="text"
                                            placeholder="Enter Your Address"
                                            className="form-control input-email rounded-pill"
                                        />
                                        <div className="input-group-append mt-2 text-center ">
                                            <button className="btn btn-md btn-secondary m-0 px-3 submit-button-letter rounded-pill" type="button"
                                            >Submit
                                            </button>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
            </App>
        )
    }
}

export default Landing;
