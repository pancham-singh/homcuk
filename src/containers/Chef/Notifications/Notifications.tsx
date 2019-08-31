import React from 'react';
import Notification from 'components/Notification';
const {MDBContainer,MDBRow,MDBCol} = require("mdbreact");

class Notifications extends React.Component{

    render(){
        return(
          <MDBContainer>
              <MDBRow>
                  <MDBCol md="12">
                      <Notification/>
                  </MDBCol>
                  <MDBCol md="12">
                      <Notification/>
                  </MDBCol>
                  <MDBCol md="12">
                      <Notification/>
                  </MDBCol>
                  <MDBCol md="12">
                      <Notification/>
                  </MDBCol>
              </MDBRow>
          </MDBContainer>
        )
    }
}
export default Notifications;