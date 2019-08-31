import React from 'react';
import orderAvatar from '../../assets/images/orders (1).png';
import './OrderPopup.scss';
const {MDBModal, MDBModalBody, MDBModalFooter, MDBBtn,MDBRow,MDBCol} = require("mdbreact");

class OrderPopup extends React.Component<any, any> {
    render() {
        const {isOpen, toggle} = this.props;
        return (
            <MDBModal isOpen={isOpen} toggle={toggle} centered >
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol md="12" className="text-right">
                            <MDBBtn flat onClick={this.props.onViewDetails}>View Details</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center">
                        <img src={orderAvatar} alt="order-avatar" className="image-popup"/>
                        <div><p>You Got Order</p></div>

                    </div>
                    <div>
                        <p className="order-desc">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                        </p>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn flat className="btn-blue w-50"  size="md" rounded onClick={this.props.onAccept} >Accept</MDBBtn>
                    <MDBBtn color="primary" className=" w-50" size="md"  rounded onClick={this.props.onCancel}>Cancel</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}

export default OrderPopup;
