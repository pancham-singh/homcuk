import React, {Component} from "react";
import "./AddressCard.scss";

const {MDBRow, MDBCol, MDBIcon, MDBBtn} = require("mdbreact");

class AddressCard extends Component<any, any> {

    render() {
        const {address} = this.props;
        return (
            <div className="border border-light p-4">
                <MDBRow>
                    <MDBCol size="1">
                        <MDBIcon icon="home"/>
                    </MDBCol>
                    <MDBCol size="10">
                        <p className="my-0 address-type">{ address.street2 }</p>
                        <p className="my-0 address-name">{ address.street1 }
                            { address.city } { address.pinCode } { address.country }</p>
                        <MDBRow className="my-0">
                            <MDBBtn flat color="primary" className="px-2 py-0 my-0 address-button">Edit</MDBBtn>
                            <MDBBtn flat color="primary" className="px-2 py-0 my-0 address-button">Delete</MDBBtn>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>


            </div>
        )
    }

}

export default AddressCard
