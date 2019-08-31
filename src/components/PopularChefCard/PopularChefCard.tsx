import React, {Component} from "react";
import "./PopularChefCard.scss"
import placeholderImage  from '../../assets/images/layer-46.png';
const {MDBMask, MDBView, MDBBadge, MDBIcon} = require("mdbreact");

class PopularChefCard extends Component<any, any> {

    render() {
        const {chef} = this.props;
        return (
            <div className="rgba-white-strong border-light border my-2">
                <MDBView>
                    <div className="text-center">
                    <img
                        src={placeholderImage}
                        className="img-fluid"
                        alt=""
                    />
                    </div>
                    <MDBMask className="d-flex justify-content-end align-items-end">
                        <MDBBadge color="success"
                                  className="text-center p-1 rounded chef-card-rating m-2"><span><MDBIcon icon="star"/></span> 3.7/5</MDBBadge>

                    </MDBMask>
                </MDBView>
                <div className="p-1">
                    <p className="my-1 pop-chef-name">{!!chef && `${chef.firstName} ${chef.lastName}`}</p>
                    <p className="my-1 pop-chef-location">Sector 70,Mohali</p>
                    <p className="my-1 pop-chef-offer">Shai Paneer on 50% upto oder Rs 300</p>

                </div>
            </div>
        )
    }
}

export default PopularChefCard;
