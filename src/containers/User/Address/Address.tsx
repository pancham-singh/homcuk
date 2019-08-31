import React, {Component} from "react";
import AddressCard from "../../../components/AddressCard/AddressCard";
import UserAddress from "../../../components/UserAddress/UserAddress";
import {connect} from "react-redux";
import {addAddress, fetchAddress} from "../../../redux/address";

const {MDBContainer, MDBRow, MDBCol, MDBBtn,MDBSpinner} = require("mdbreact");

class Address extends Component<any, any> {
    state = {
        openDialog: false,
    };

    async componentDidMount() {
        const {dispatch} = this.props;
        try {
            await dispatch(fetchAddress())
        } catch (e) {

        }
    }

    addAddress = async (payload: any) => {
        const {dispatch} = this.props;
        try {
            await dispatch(addAddress(payload))
        } catch (e) {
            console.log(e)
        }
    };

    toggleDialog = () => this.setState({openDialog: !this.state.openDialog});

    render() {
        const {addresses,loadingAddress} = this.props;
        return (
            <div>
                <MDBContainer>
                    {loadingAddress && <div className="text-center"><MDBSpinner big /></div>}

                    <MDBRow center className="my-4">
                        { !!addresses && !!addresses.length && addresses.map((address: any, key: number) => (
                            <MDBCol md="5" className="mt-4" key={ 'address' + key }>
                                <AddressCard address={ address } />
                            </MDBCol>
                        ))
                        }
                    </MDBRow>
                    <MDBRow center className="my-4">
                        <MDBBtn color="primary" onClick={ this.toggleDialog }>Add New Address</MDBBtn>
                    </MDBRow>
                    <UserAddress open={ this.state.openDialog } toggle={ this.toggleDialog }
                                 onSubmit={ this.addAddress }/>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        addresses: state.address.list,
        loadingAddress: state.address.loadingAdddress,
        addingAddress: state.address.addAddress,
        user: state.auth.user
    }
};

const UserAddressContainer = connect(mapStateToProps)(Address)
export default UserAddressContainer;
