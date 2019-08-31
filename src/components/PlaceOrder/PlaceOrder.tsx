import React, {Component} from "react";
import {fetchAddress} from "../../redux/address";
import {connect} from "react-redux";
import {placeOrder} from "../../redux/order";
import "./PlaceOrder.scss";
import momment from 'moment';

const {MDBBtn, MDBModal, MDBModalBody, MDBDatePicker, MDBTimePicker,MDBInput} = require("mdbreact");

class PlaceOrder extends Component<any, any> {
    state = {
        deliveryDate: new Date().toISOString(),
        startTime: '12:00',
        endTime: '12:00',
        addressId: ''
    };

    async componentDidMount() {
        const {dispatch} = this.props;
        try {
            await dispatch(fetchAddress())
        } catch (e) {
        }
    }

    getPickerValue = (value: any) => {
        this.setState({deliveryDate: value});
    };
    getStartTime = (value: any) => {
        this.setState({startTime: value});
    };
    getEndTime = (value: any) => {
        this.setState({startTime: value});
    };
    placeOrder = async () => {
        const {dispatch, cart: {cartId},orderDetails,addresses,history} = this.props;
        let {startTime, endTime, deliveryDate,addressId} = this.state;
        if(!addressId){
            addressId=  addresses[0].id;
        }
        try {
            await dispatch(placeOrder({
                cartId,
                amount: orderDetails.total,
                deliveryTime:{startTime,endTime},
                deliveryDate: momment(deliveryDate).valueOf(),
                deliveryAddressId:addressId
            }));
            await history.push("/user/order-history");


        } catch (e) {
        }
    };
    render() {
        const {toggleOrder, open,orderDetails,addresses} = this.props;
        const items = orderDetails.dishes;
        return (
            <MDBModal isOpen={ open } toggle={ toggleOrder } fullHeight position="right">
                <MDBModalBody>
                    <p className="text-primary">Place order</p>
                    <div>
                        <p>Order Details</p>
                        {items.map((item: any,key: number) => (
                            <div className="d-flex" key={'item'+key}>
                                <div className="mr-2"><img alt="dish" className="order-item-pic"  src={!! item && !!item.media && item.media.length && item.media[0].url}/></div>
                                <div ><p className="my-1">{item.name|| item.dishName}</p>
                                <p className="order-dish-desc">{item.description}</p></div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>Delivery Address</p>
                            { !!addresses && !!addresses.length &&
                            addresses.map((address: any,key: number) => (
                                <MDBInput id={address.id}  key={'addr'+key} onClick={()=>this.setState({addressId:address.id})} checked={this.state.addressId===address.id}  label={address.street1} type="radio"
                                 />
                            ))
                            }
                    </div>
                    <div>
                        <p>Delivery Date</p>
                        <MDBDatePicker getValue={ this.getPickerValue } className="w-100"/>
                    </div>
                    <div>
                        <p>Start Time</p>
                        <MDBTimePicker id="timePicker" label="12hrs format" getValue={ this.getStartTime } />
                    </div>
                    <div>
                        <p>End Time</p>
                        <MDBTimePicker id="timePicker" label="12hrs format" getValue={ this.getEndTime } />
                    </div>
                    <div>
                        <MDBBtn color="primary" block onClick={this.placeOrder }>Order Now</MDBBtn>
                    </div>
                </MDBModalBody>

            </MDBModal>

        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        order: state.order.order,
        loading: state.order.loadingOrders,
        addresses: state.address.list,

    }
};

const OrderDialog = connect(mapStateToProps)(PlaceOrder);
export default OrderDialog;
