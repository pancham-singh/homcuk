import React, {Component} from "react";
import "./DishCard.scss";
const {MDBRow, MDBCol, MDBCard, MDBBtn} = require("mdbreact");

class DishCard extends Component<any,any> {

    render() {
        const {dish,onAdd} = this.props;
        return (
            <MDBCard className="my-2">
                <MDBRow>
                    <MDBCol md="4">
                        <img src={!!dish && !!dish.media.length && dish.media[0].url}
                             className="rounded chef-detail-image" alt="aligment"/>
                    </MDBCol>
                    <MDBCol md="8" className="px-0">
                        <div className="container-fluid">
                                <div className="d-flex justify-content-between mt-1 pr-2 align-items-center">
                                    <span className=" my-0 dish-card-name">{!!dish && dish.dishName}</span>
                                    <span className="veg-only text-success  my-1">Veg Only</span>
                                </div>
                                <p className="order-cuisine-name my-1">{!!dish && dish.cuisines.join(",")}</p>
                                <p className="my-1 dish-card-featured">{!!dish && dish.description}</p>
                                <div className="d-flex justify-content-between pr-3 mt-5 align-items-center">
                                    <span className="order-price"> &#x20B9; {!!dish && dish.price}</span>
                                    <span><MDBBtn flat size="sm" className="bg-primary text-white" onClick={onAdd}>ADD</MDBBtn></span>
                                </div>
                        </div>

                    </MDBCol>
                </MDBRow>
            </MDBCard>
        )
    }
}

export default DishCard;
