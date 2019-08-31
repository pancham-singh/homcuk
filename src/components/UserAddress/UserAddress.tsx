import React, {Component} from "react";
import "./UserAddress.scss";
import {Autocomplete, GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const {default: Geocode} = require("react-geocode/lib");
const {MDBModal, MDBModalBody, MDBBtn} = require("mdbreact");
const Google_API_KEY = 'AIzaSyD5OGtGZL2IMopFJrJcbYTS6LHIJk5PHRg';
Geocode.setApiKey(Google_API_KEY);
Geocode.enableDebug();


class UserAddress extends Component<any, any> {
    AnyType: any;

    state = {
        markerLat: 28.7041,
        markerLng: 77.1025,
        address: '',
        flatNo: ' ',
        pinCode: '',
        fullAddress: this.AnyType
    };

    componentDidMount(): void {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                markerLat: location.coords.latitude,
                markerLng: location.coords.longitude
            })
        });
    }

    onSave = () => {
        const {fullAddress, address, flatNo, pinCode} = this.state;
        const { onSubmit } = this.props;
        if (!!fullAddress && !!fullAddress.length) {
            const len = fullAddress.length;
            const payload = {
                street1: address,
                street2: flatNo,
                pinCode: pinCode,
                city: fullAddress[len - 3].formatted_address,
                state: fullAddress[len - 2].formatted_address,
                country: fullAddress[len - 1].formatted_address,
            };
            onSubmit(payload);
        }
    };
    changeLocation = (coordinates: any) => {
        this.setState({
            markerLat: coordinates.latLng.lat(),
            markerLng: coordinates.latLng.lng()
        }, () => {
            Geocode.fromLatLng(coordinates.latLng.lat().toString(), coordinates.latLng.lng().toString()).then(
                (response: any) => {
                    const address = response.results[0].formatted_address;
                    console.log(address);

                    this.setState({address: address, fullAddress: response.results});
                },
                (error: any) => {
                    console.error(error);
                }
            );
        })
    };
    onLoad = (autocomplete: any) => {
        console.log('autocomplete: ', autocomplete)
        this.autocomplete = autocomplete
    }

    onPlaceChanged = () => {
        if (this.autocomplete !== null) {
            console.log(this.autocomplete.getPlace())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }
    private autocomplete: any;

    render() {
        const {open, toggle} = this.props;
        const {markerLng: lng, markerLat: lat} = this.state;
        return (
            <MDBModal isOpen={ open } toggle={ toggle }>
                <div className="p-2"><p>Add New Address</p></div>
                <MDBModalBody>
                    <LoadScript
                        id="script-loader"
                        googleMapsApiKey={ Google_API_KEY }
                        libraries={ ["places"] }
                    >
                        <GoogleMap
                            id='example-map'
                            mapContainerStyle={ {
                                height: "200px",
                            } }
                            onClick={ this.changeLocation }
                            zoom={ 7 }
                            center={ {lat: lat, lng: lng} }
                        >
                            <Marker
                                position={ {lat: lat, lng: lng} }
                            />
                        </GoogleMap>
                        <div className="form-group border p-2">
                            <label htmlFor="formGroupExampleInput">Address</label>
                            <Autocomplete
                                onLoad={ this.onLoad }
                                // onPlacesChanged={this.onPlaceChanged}
                            >
                                <input
                                    type="text"
                                    className="form-control border-0"
                                    id="formGroupExampleInput"
                                    defaultValue={ this.state.address }
                                />
                            </Autocomplete>
                        </div>
                        <div className="form-group border p-2">
                            <label htmlFor="formGroupExampleInput">Door/Flat No</label>
                            <input
                                type="text"
                                className="form-control border-0"
                                id="formGroupExampleInput"
                                onChange={ (evt) => this.setState({flatNo: evt.target.value}) }
                                defaultValue={ this.state.flatNo }
                            />
                        </div>

                        <div className="form-group border p-2">
                            <label htmlFor="formGroupExampleInput">PIN Code</label>
                            <input
                                type="text"
                                className="form-control border-0"
                                id="formGroupExampleInput"
                                onChange={ (evt) => this.setState({pinCode: evt.target.value}) }
                                defaultValue={ this.state.pinCode }
                            />

                        </div>
                        <div>
                            <MDBBtn color="primary" block onClick={ () => this.onSave() }>Save Address and
                                Proceed</MDBBtn>
                        </div>
                    </LoadScript>

                </MDBModalBody>
            </MDBModal>
        )
    }
}

export default UserAddress;
