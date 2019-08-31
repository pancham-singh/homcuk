import React from 'react';
import "./OrderCard.scss"
import moment from "moment";

const {MDBCard, MDBRow, MDBCol, MDBCardBody, MDBIcon} = require("mdbreact");

class OrderCard extends React.Component<any, any> {
    render() {
        const {onViewDetails, order} = this.props;
        return (
            <MDBCard border="light" className="m-3">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md="2">
                            <img className="dish-image-order"
                                 src={ !!order && !!order.dishes[0].media && !!order.dishes[0].media.length && order.dishes[0].media[0].url }
                                 alt="dish"/>

                        </MDBCol>
                        <MDBCol md="6" className="order-heading">
                            <p className="card-p order-dish-name">{ !!order && order.dishes[0].dishName }</p>
                            <p className="card-p order-dish-address">Sector 67, Chandigarh</p>
                        </MDBCol>
                        <MDBCol md="3" className="d-flex justify-content-between">
                            <MDBIcon icon="check" className="status-icons-success"/>
                            <p className="card-p order-dish-name order-status">{ order.status[order.status.length - 1].orderStatus }</p>
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="8">
                            <p className="card-p order-name">Order Number:<span
                                className="order-number">{ order.id }</span></p>
                            <p className="card-p order-name">{ order.amount }</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <p className="card-p order-date">{ moment(order.deliveryDate).format("DD ,MMM,YY") }</p>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow between>
                        <MDBCol size="6" className="text-left">
                            <div className="form-group">
                                <button className="form-control order-btn">Re-Order Now</button>
                            </div>
                        </MDBCol>
                        <MDBCol size="6" md="6">
                            <div className="form-group details-button">
                                <button className="form-control order-btn" onClick={ onViewDetails }>View Details
                                </button>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )
    }
}

export default OrderCard;
