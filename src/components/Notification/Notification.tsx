import React from 'react';
import dish from 'assets/images/dsc-0937.png';
import "./Notification.scss"
const {MDBCard,MDBRow,MDBCol} = require("mdbreact");
class Notification extends React.Component{
    render(){
        return(
            <MDBCard className="m-3 card-body" >
                    <MDBRow start>
                        <MDBCol md="1">
                            <img className="dish-image-order" src={dish} alt="dish"/>
                        </MDBCol>
                        <MDBCol md="6" className="order-heading">
                            <p className="card-p order-dish-name">Chicken Briyani Successfuly Order</p>
                            <p className="card-p order-name">Order Number:<span className="order-number">1336965845</span></p>

                        </MDBCol>
                        <MDBCol md="4" className="text-right">
                            <p className="card-p order-dish-name">January 12,2019</p>
                            <p className="card-p order-dish-address">Monday 12:40 PM</p>
                        </MDBCol>
                    </MDBRow>
            </MDBCard>
        )
    }
}
export default Notification;
