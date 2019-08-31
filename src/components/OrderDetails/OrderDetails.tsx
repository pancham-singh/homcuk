import React from 'react';
import "./OrderDetails.scss";
import moment from "moment";
const {MDBModal, MDBModalBody, MDBBtn, MDBRow, MDBCol} = require("mdbreact");

class OrderDetails extends React.Component<any, any> {
    render() {
        const {isOpen, toggle, order} = this.props;
        return (
            <MDBModal isOpen={ isOpen } toggle={ toggle } centered>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol md="8">
                            <p>Order ID <span>{ !!order && order.id }</span></p>
                        </MDBCol>
                        <MDBCol md="4" className="text-right">
                            {/*<p className="green-text my-0"></p>*/ }
                            <MDBBtn flat className="green-text m-0 p-0" onClick={toggle}> Delivered X</MDBBtn>
                        </MDBCol>
                    </MDBRow>

                    {!!order && order.dishes && order.dishes.map((dish: any,key: number)=><MDBRow key={key+'od'}>
                        <MDBCol md="2" >
                            <div><img alt="dish" className="dish-pic"
                                      src={ !!dish && !!dish.media && !!dish.media.length && dish.media[0].url }/>
                            </div>
                        </MDBCol>
                        <MDBCol md="6" className="pl-4">
                            <div>
                                <p className="my-0">{ dish.dishName }</p>
                                <p className="my-0">{ dish.cuisines.join(",") }</p>
                            </div>
                        </MDBCol>
                        <MDBCol md="4" className="text-right">
                            <p className="my-0">{ moment(order.deliveryDate).format("DDD ,MMM, YY") }</p>
                            <p className="my-0">{order.deliveryTime.startTime} {order.deliveryTime.endTime}</p>
                        </MDBCol>
                    </MDBRow>)}
                    <MDBRow className="py-2 my-0 border-top border-bottom">
                        <MDBCol md="8">
                            <p className="my-0">Mode Of payment</p>
                        </MDBCol>
                        <MDBCol md="4" className="text-right">
                            <p className="my-0 green-text">Successful</p>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="py-2 my-0 border-top border-bottom">
                        <MDBCol md="8">
                            <p className="my-0">SubTotal</p>
                            <p className="my-0">Tax</p>

                        </MDBCol>
                        <MDBCol md="4">
                            <p className="my-0">{order.amount}</p>
                            <p className="my-0">{order.cgst}</p>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="8">
                            <p>Total</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <p>{order.amount + order.cgst}</p>
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
            </MDBModal>
        );
    }
}

export default OrderDetails;
