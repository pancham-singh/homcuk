import React, {Component} from "react";
import App from "containers/App";
import "./ChefDetails.scss";
import PopularChefs from "../../../components/PopularChefs/PopularChefs";
import DishCard from "../../../components/DishCard/DishCard";
import {u1F311} from 'react-icons-kit/noto_emoji_regular/u1F311';
import {Icon} from 'react-icons-kit';
import FooterBanner from "../../../components/FooterBanner/FooterBanner";
import {connect} from "react-redux";
import {getChef} from "../../../redux/chef";
import {addToCart, getCart} from "../../../redux/cart";
import placeholderImage  from '../../../assets/images/layer-46.png';

import PlaceOrder from "../../../components/PlaceOrder/PlaceOrder";

const {MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBInput, MDBCard, MDBBtn} = require("mdbreact");

class ChefDetails extends Component<any, any> {
    AnyType: any[] = [];
    state = {
        total: 0,
        dishes: this.AnyType,
        toggleOrder: false
    };

    addUpdateCart = async () => {
        let {dishes, total} = this.state;
        const {dispatch, user: {id: userId}, details: {chef: {id: chefId}}} = this.props;
        if (!!dishes.length && total > 0) {
            try {
                const cartPayload = {
                    userId,
                    chefId,
                    dishes: dishes.map((d) => {
                        return {id: d.id, qty: d.qty}
                    })
                };
                await dispatch(addToCart(cartPayload));
            } catch (e) {
            }
        }
    }

    addToCart = (dish: any) => {
        let {dishes, total} = this.state;
        const exists = dishes.findIndex((d: any) => d.id === dish.id);
        if (exists > -1) {
            dishes[exists].qty++;
            dishes[exists].total += dish.price;
            total += dish.price;
        }
        this.setState({dishes, total}, () => {

            this.addUpdateCart()
        });


    };

    removeFromCart = (dish: any) => {
        let {dishes, total} = this.state;
        const exists = dishes.findIndex((d: any) => d.id === dish.id);
        if (exists > -1 && dish.qty >= 1) {
            dishes[exists].qty -= 1;
            dishes[exists].total -= dish.price;
            total -= dish.price

        }
        this.setState({dishes, total}, () => {
            this.addUpdateCart()
        });
    };

    async componentDidMount() {
        const {dispatch, history} = this.props;
        try {
            if (!!history.location.state) {
                const {chefId} = history.location.state;
                await dispatch(getChef(chefId));
                await this.initialDishes();
                await dispatch(getCart());
            }
        } catch (e) {

        }
    }
    toggleOrder = () => this.setState({toggleOrder : !this.state.toggleOrder});

    initialDishes = () => {
        const {details} = this.props;
        const dishes = !!details && !!details.dishes.length && details.dishes.map((dish: any) => {
            return {
                id: dish.id,
                name: dish.dishName,
                qty: 0,
                total: 0,
                media: dish.media,
                description: dish.description,
                price: dish.price,
                veg: dish.type.indexOf("vegetarian") > -1
            }
        });
        this.setState({dishes})
    };

    checkout = async () => {
        const {total: amount} = this.state;
        if(amount > 0){
            this.toggleOrder()
        }
    };



    render() {
        const {details,cart} = this.props;
        const {dishes} = this.state;

        const itemsToAdd = !!details && dishes.map((item: any, key: number) => (
            <MDBRow between className="my-1" key={ "cart-item-" + key }>
                <MDBCol md="6">
                    <p className="my-1"><span className={ `border text-center border-success` }><Icon
                        className={ `${ item.veg ? 'chef-detail-veg' : 'chef-detail-non-veg' }` }
                        icon={ u1F311 }/> </span><span className="ml-1 chef-detail-cart-item">{ item.name }</span></p>
                </MDBCol>
                <MDBCol md="3" className="px-0">
                    <div className="input-group search-text  border">
                        <div className="input-group-prepend ">
                                                  <span className="input-group-text border-0 bg-white p-0"
                                                        id="basic-addon">
                                             <MDBBtn flat className="py-1 px-2 mx-1 text-success"
                                                     onClick={ () => this.removeFromCart(item) }>-</MDBBtn>
                                              </span>
                        </div>
                        <input type="text"
                               className="form-control text-success  text-center mt-1  border-0 form-control-sm" readOnly
                               value={ item.qty }/>
                        <div className="input-group-append ">
                                                  <span className="input-group-text border-0 bg-white p-0"
                                                        id="basic-addon">
                                                    <MDBBtn flat
                                                            className="py-1 px-2 mx-1 text-success"
                                                            onClick={ () => this.addToCart(item) }>+</MDBBtn> </span>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md="3" className="text-right">
                    <p className="my-1 chef-detail-cart-item-price">&#x20B9;{ item.total }</p>
                </MDBCol>
            </MDBRow>
        ));
        return (<App { ...this.props }>
            <div>
                <MDBContainer>
                    <MDBRow className="my-2 mx-1">
                        <MDBCol md="3">
                            <img src={placeholderImage}
                                 className="rounded chef-detail-image" alt="aligment"/>
                        </MDBCol>
                        <MDBCol md="9" className="d-flex align-items-center px-0 pr-0">
                            <div className="container-fluid pr-0">
                                <div>
                                    <p className="my-2 chef-detail-name">{ !!details && details.chef && `${ details.chef.firstName } ${ details.chef.lastName }` }</p>
                                    <p className="my-2 chef-detail-address"><span><MDBIcon
                                        icon="map-marker-alt"/></span> Plot No 123,Phase 11 Mohali Punjab India</p>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <p><span> <MDBBadge color="success"
                                                        className="text-center p-1 rounded chef-card-rating m-2"><span><MDBIcon
                                        icon="star"/></span> { !!details && details.chef && details.chef.rating }/5 </MDBBadge>
                           </span><span className="chef-reviews">{ !!details && details.chef && details.chef.reviewsCount } Review</span>
                                    </p>
                                    <div>
                                        <MDBInput color="primary" containerClass="py-1 m-0 border border-primary"
                                                  className="py-0" label="Veg Only" type="checkbox" id="checkbox1"/>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow end className="position-relative chef-detail-search">
                        <MDBCol md="4">
                            <div className="input-group search-text border-primary border">
                                <div className="input-group-prepend ">
                                 <span className="input-group-text border-0 bg-white" id="basic-addon">
                                 <i className="fa fa-search prefix search-icon"/>
                                </span>
                                </div>
                                <input type="text" className="form-control    border-0 form-control-md"
                                       placeholder="Search for Dish"/>
                            </div>
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
                <div className="container-background pt-4 ">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="4">
                                <MDBCard className="p-2 mx-3 rounded-0">
                                    <MDBRow between>
                                        <MDBCol md="6">
                                            <p className="chef-detail-cart">Cart</p>
                                        </MDBCol>
                                        <MDBCol md="6" className="text-right">
                                            <p className="my-1 chef-detail-cart-items">{ this.state.dishes.length } ITEM</p>
                                        </MDBCol>
                                    </MDBRow>
                                    { itemsToAdd }
                                    <MDBRow between>
                                        <MDBCol md="9">
                                            <p className="chef-detail-sub-total mt-1 mb-0">Subtotal</p>
                                            <p className="chef-detail-extra-charges mb-3">Extra Charge may apply</p>
                                        </MDBCol>
                                        <MDBCol md="3" className="text-right">
                                            <p className="chef-detail-sub-total">&#x20B9; { this.state.total }</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <MDBBtn flat block className=" bg-primary checkout-button" onClick={()=>this.checkout()}>Checkout</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>

                            </MDBCol>
                            <MDBCol md="6">
                                { !!details && !!details.dishes.length && details.dishes.map((dish: any, key: number) =>
                                    <DishCard key={ 'dishcared' + key } dish={ dish }
                                              onAdd={ () => this.addToCart(dish) }/>) }
                            </MDBCol>
                            <MDBCol md="2">
                                <p className="popular-chefs">More Popular Chefs</p>
                                <PopularChefs/>

                            </MDBCol>

                        </MDBRow>
                        <PlaceOrder
                            open={this.state.toggleOrder}
                            toggleOrder={this.toggleOrder}
                            orderDetails={this.state}
                            cart={cart}
                            {...this.props}/>
                    </MDBContainer>
                </div>
            </div>
            <FooterBanner/>
        </App>)
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        details: state.chef.chef,
        dishes: state.dish.dishes,
        cart: state.cart.cart,
        order: state.order.order,

    }
}
const ChefProfileDetails = connect(mapStateToProps)(ChefDetails);
export default ChefProfileDetails;
