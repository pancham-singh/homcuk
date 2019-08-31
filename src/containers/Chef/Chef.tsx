import React from 'react';
import App from "containers/App";
import "./Chef.scss";
import {Route} from "react-router";
import Profile from "./Profile";
import Payment from "./Payment/Payment";
import BankDetails from "./BankDetails/BankDetails";
import CardDetails from "./CardDetails/CardDetails";
import Orders from "./Orders/Orders";
import Notifications from "./Notifications/Notifications";
import Documents from "./Documents/Documents";
import Dish from "./Dish/Dish";
import {connect} from "react-redux";
import {getUser} from "../../redux/auth";
import Dishes from "./Dishes/Dishes";

const {MDBContainer, MDBRow} = require("mdbreact");

class Chef extends React.Component<any, any> {
   async componentDidMount() {
       const {dispatch} = this.props;
        await dispatch(getUser());
    }

    render() {
        const {match: {url}} = this.props;
        return (
            <App login  {...this.props}>
                <MDBContainer fluid>
                    <MDBRow className="chef-container">
                        <MDBContainer className="chef-pages">
                            <Route exact path={`${url}/`} component={Profile}/>
                            <Route path={`${url}/payment`} component={Payment}/>
                            <Route path={`${url}/bank-details`} component={BankDetails}/>
                            <Route path={`${url}/card-details`} component={CardDetails}/>
                            <Route path={`${url}/orders`} component={Orders}/>
                            <Route path={`${url}/notifications`} component={Notifications}/>
                            <Route path={`${url}/documents`} component={Documents}/>
                            <Route path={`${url}/dish`} component={Dish}/>
                            <Route path={`${url}/dishes`} component={Dishes}/>
                        </MDBContainer>
                    </MDBRow>
                </MDBContainer>

            </App>
        )
    }
}

const mapStateToProps = (state:any) =>{
    return{
        user:state.auth.user
    }
};
const ChefContainer = connect<any,any,any>(mapStateToProps)(Chef);

export default ChefContainer;
