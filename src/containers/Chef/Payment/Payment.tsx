import React from 'react';
import "./Payment.scss"
import visa from 'assets/images/layer-1106.png';
import master from 'assets/images/layer-1113.png';

const {MDBRow, MDBCol, MDBCard, MDBInput} = require("mdbreact");

class Payment extends React.Component {

    render() {
        return (
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard className="card-body">
                        <div className="d-flex justify-content-between flex-center">
                            <div>
                                <p>Cash on Delivery</p>
                            </div>
                            <div>
                                <MDBInput label=" " color="secondary" type="radio"
                                          id="radio1"/>
                            </div>
                        </div>
                    </MDBCard>

                    <MDBCard className="card-body mt-5">

                        <div className="d-flex justify-content-between flex-center">
                            <div>
                                <img src={visa} alt="visa"/>
                                <div>
                                    <p><span>****</span> <span>****</span> <span>****</span> 8970</p>
                                    <p>Expires on :- January 15,2019</p>
                                </div>
                            </div>
                            <div>
                                <MDBInput label=" " color="secondary" type="radio"
                                          id="radio2"/>
                            </div>
                        </div>
                    </MDBCard>
                    <MDBCard className="card-body mt-5">

                        <div className="d-flex justify-content-between flex-center">
                            <div>
                                <img src={master} alt="master"/>
                                <div>
                                    <p><span>****</span> <span>****</span> <span>****</span> 8970</p>
                                    <p>Expires on :- January 15,2019</p>
                                </div>
                            </div>
                            <div>
                                <MDBInput label=" " color="secondary" type="radio"
                                          id="radio3"/>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default Payment;
