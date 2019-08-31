import React,{Component} from "react";
import OrderHistoryCard from "../../../components/OrderHistoryCard";
import {connect} from "react-redux";
import { fetchOrdersFilters} from "../../../redux/order";
import PlaceOrder from "../../../components/PlaceOrder/PlaceOrder";
const {MDBRow,MDBCol,MDBContainer,MDBSpinner} = require("mdbreact");

class OrderHistory extends Component<any,any>{
    state = {
        viewOrder: false,
    }
    async componentDidMount() {
        const {dispatch,user} = this.props;
        try {
            await dispatch(fetchOrdersFilters({args:{userId:user.id},limit: 50,
                next: null,
                previous: null}))
        }catch (e) {
            console.log(e)
        }
    }
    viewOrder = () => this.setState({viewOrder:!this.state.viewOrder});

    render(){
        const {orders,loadingOrders} = this.props;
        return(
            <MDBContainer className="px-md-5 py-md-3">
                {loadingOrders && <div className="text-center"><MDBSpinner big /></div>}

                <MDBRow>
                   {!!orders && orders.map((order: any,key: number) =>
                       (<MDBCol size="12" className="my-3" key={'order'+key}>
                       <OrderHistoryCard order={order} viewOrder={this.viewOrder}/>
                           <PlaceOrder open={this.state.viewOrder} toggleOrder={this.viewOrder} orderDetails={order} cart={{cartId:order.cartId}}/>
                       </MDBCol>))}
               </MDBRow>

            </MDBContainer>
        )
    }
}

const mapStateToProps = (state: any) =>{
    return{
        orders: state.order.orders,
        user: state.auth.user,
        loadingOrders: state.order.loadingOrders
    }
}
const UserOrders = connect(mapStateToProps)(OrderHistory);
export default UserOrders;
