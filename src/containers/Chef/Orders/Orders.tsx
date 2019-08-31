import React from 'react';
// import OrderCard from 'components/OrderCard';
import "./Orders.scss"
import {fetchOrdersFilters, updateOrder} from "../../../redux/order";
import OrderCard from "../../../components/OrderCard/OrderCard";
import {connect} from "react-redux";
import {ORDER_STATUS} from "../../../Utill/Validator";
import OrderPopup from "../../../components/OrderPopup/OrderPopup";
import OrderDetails from "../../../components/OrderDetails/OrderDetails";

const {MDBContainer, MDBRow, MDBCol, MDBBtnGroup, MDBBtn} = require("mdbreact");

class Orders extends React.Component<any, any> {
    state = {type: ORDER_STATUS.RECEIVED, viewDetails: false, newOrder: true};
    selectOrderType = (type: string) => {
        this.setState({type});
        this.viewOrders(type);
    };

    viewOrderDetails = () => {
        this.setState({viewDetails: !this.state.viewDetails});
    };

    componentDidMount() {
        this.viewOrders(ORDER_STATUS.RECEIVED);
    }

    updateOrder = async (status: string, id: string, deliveryDate: number) => {
        const {dispatch} = this.props;
        try {
            await dispatch(updateOrder({status, deliveryDate}, id))
            await this.viewOrders(ORDER_STATUS.ACCEPTED);

        } catch (e) {

        }
    }

    viewOrders = async (status: string) => {
        const {dispatch, user} = this.props;
        try {
            await dispatch(fetchOrdersFilters({
                args: {chefId: user.id}, limit: 50,
                next: null,
                previous: null
            }))
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {type, viewDetails} = this.state;
        const {orders} = this.props;
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12" md="12" className="text-center">
                        <MDBBtnGroup className="w-100">
                            <MDBBtn className="tab-button " outline={ type !== ORDER_STATUS.RECEIVED }
                                    onClick={ () => this.selectOrderType(ORDER_STATUS.RECEIVED) } color="secondary">Pending
                                Orders</MDBBtn>
                            <MDBBtn className="tab-button " outline={ type !== ORDER_STATUS.ACCEPTED }
                                    onClick={ () => this.selectOrderType(ORDER_STATUS.ACCEPTED) } color="secondary">Confirmed
                                Orders</MDBBtn>
                            <MDBBtn className="tab-button" outline={ type !== ORDER_STATUS.IN_KITCHEN }
                                    onClick={ () => this.selectOrderType(ORDER_STATUS.IN_KITCHEN) } color="secondary">Post
                                Orders</MDBBtn>
                        </MDBBtnGroup>
                    </MDBCol>
                    <MDBCol md="12" xs="12" sm="12">
                        { !orders && <p className="text-center">No orders available</p> }
                        <MDBRow center>
                            { !!orders && orders.map((order: any, key: number) => (
                                <MDBCol md="5" xs="12" sm="5" key={ 'order' + key }>
                                    <OrderCard order={ order } onViewDetails={ this.viewOrderDetails }/>
                                    <OrderDetails isOpen={ viewDetails } order={ order }
                                                  toggle={ () => this.viewOrderDetails() }/>
                                    { <OrderPopup
                                        isOpen={ order.status[order.status.length - 1].orderStatus === 'Received' }
                                        onCancel={ () => this.updateOrder(ORDER_STATUS.CANCELED_BY_CHEF, order.id, order.deliveryDate) }
                                        onAccept={ () => this.updateOrder(ORDER_STATUS.ACCEPTED, order.id, order.deliveryDate) }
                                        onViewDetails={ this.viewOrderDetails }/> }
                                </MDBCol>))
                            }
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        user: state.auth.user
    }
};
const ChefOrders = connect(mapStateToProps)(Orders)

export default ChefOrders;
