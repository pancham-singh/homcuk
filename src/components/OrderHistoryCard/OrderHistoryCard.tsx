import React, {Component} from "react";
import "./OrderHistoryCard.scss";
import moment from 'moment';
const {MDBBtn} = require("mdbreact");
class OrderHistoryCard extends Component <any,any>{

    render() {
        const {order,viewOrder} = this.props;
        const cuisines = !!order ? order.dishes.map((d: any) =>d.cuisines) : [];
        const dishes = !!order ? order.dishes.map((d: any) => `${d.dishName} ${d.qty}x`) : [];
        return (<div className="d-flex container-fluid align-items-center mx-2 border-light border px-3 py-2">
            <div>
                <img
                    src={!!order && !!order.dishes[0].media && !!order.dishes[0].media.length && order.dishes[0].media[0].url}
                    className=" order-image"
                    alt=""
                />
            </div>
            <div className="container-fluid">
                <div className="d-flex justify-content-between container-fluid bottom-line">
                    <div>
                        <p className="my-0 order-chef-name">{!!order && `${order.chef.firstName} ${order.chef.lastName}`}</p>
                        <p className="my-0 order-cuisine-name">{cuisines.join(",")}</p>
                        <p className="my-0 order-name">ORDER #{!!order && order.id} | {moment(!!order && order.deliveryDate).format("DDD, MMM YY")},{!!order && order.deliveryTime.startTime}</p>
                    </div>
                    <div>
                        <p className="my-0 order-status">Delivered on {moment(!!order && order.deliveryDate).format("DDD, MMM YY")},{!!order &&order.deliveryTime.endTime}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between container-fluid pt-3">
                    <div>
                        <p className="my-0 order-dish-name">{dishes.join(",")}</p>
                    </div>
                    <div>
                        <p className="order-price">&#x20B9;{!!order && order.amount}</p>
                    </div>
                </div>
                <div>
                    <MDBBtn  color= "primary" className="button-text" onClick={viewOrder}>REORDER</MDBBtn>
                    <MDBBtn color= "primary" className="button-text" outline onClick={viewOrder}>View Details</MDBBtn>

                </div>
            </div>
        </div>)
    }

}

export default OrderHistoryCard;
