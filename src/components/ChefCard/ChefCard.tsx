import React, {Component} from "react";
import "./ChefCard.scss"

const {MDBCard, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBBadge, MDBIcon} = require("mdbreact");

class ChefCard extends Component<any, any> {

    render() {
        const {chef} = this.props;
        const chefImage = !!chef && chef.profilPic ? chef.profilePic : "https://via.placeholder.com/100x100.png?text=Chef Profile Pic"
        const { address } = chef;
        return (
            <MDBCard className="my-2" >
                <MDBContainer fluid>
                    <MDBRow className="mx-1 px-0 border-bottom py-4 ">
                        <MDBCol md="12" className="d-flex px-0">
                            <div>
                                <img src={ chefImage } className="rounded float-left chef-card-image" alt="aligment"/>

                            </div>
                            <div className="d-flex justify-content-between container-fluid pr-0">

                                <div>
                                    <p className="my-1 chef-card-chef-name">{ `${ chef.firstName } ${ chef.lastName }` }</p>
                                    { !!address &&
                                    <p className="my-1 chef-card-chef-location">{ `${ address.street1 } ${ address.city }` }</p> }
                                    { !!address &&
                                    <p className="my-1 chef-card-chef-address">{ `${ chef.address.street1 }  ${ address.city } ${address.state}  ${address.country} ` }</p> }
                                </div>
                                <div className="text-center">
                                    <p className="my-1 veg-only text-success">Veg Only</p>
                                    <MDBBadge color="success"
                                              className="text-center p-1 rounded chef-card-rating"><span><MDBIcon
                                        icon="star"/></span> {chef.rating}/5</MDBBadge>
                                    <p className="my-1 chef-reviews"> {chef.reviewsCount} Reviews</p>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="py-4">
                        <MDBCol md="4">
                            <p className="my-1 chef-card-dish-prop">CUISINE NAME:</p>
                        </MDBCol>
                        <MDBCol md="8">
                            <p className="my-1 chef-card-dish-value">North Indian</p>
                        </MDBCol>

                        <MDBCol md="4">
                            <p className="my-1 chef-card-dish-prop">PRICE:</p>
                        </MDBCol>
                        <MDBCol md="8">
                            <p className="my-1 chef-card-dish-value">700/-</p>
                        </MDBCol>


                        <MDBCol md="4">
                            <p className="my-1 chef-card-dish-prop">PREPRATION TIME:</p>
                        </MDBCol>
                        <MDBCol md="8">
                            <p className="my-1 chef-card-dish-value">45 minutes</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <p className="my-1 chef-card-dish-prop">DISH FEATURED:</p>
                        </MDBCol>
                        <MDBCol md="8">
                            <p className="my-1 chef-card-dish-value">Fresh Vegetabels with spicy souces served with
                                bowel rice and pudina chatni</p>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBRow end>
                    <MDBCol md="8" className="d-flex">
                        <MDBBtn flat className="border py-4 text-primary m-0 border-light w-50 chef-card-button" onClick={this.props.viewChefProfile}>View
                            Chef Profile</MDBBtn>
                        <MDBBtn flat className="m-0 w-50 bg-primary white-text chef-card-button">Order Now</MDBBtn>
                    </MDBCol>
                </MDBRow>

            </MDBCard>
        )
    }
}

export default ChefCard;
