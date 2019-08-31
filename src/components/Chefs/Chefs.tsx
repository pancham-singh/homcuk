import React from 'react';
import "./Chefs.scss";
import Chef from "components/Chef";
import {getChefs} from "../../redux/chef";
import {connect} from "react-redux";


const {MDBRow, MDBCol, MDBContainer, MDBBtn} = require("mdbreact");


class Chefs extends React.Component<any, any> {
    async componentDidMount() {
        const { dispatch } = this.props;
        try{
            await dispatch(getChefs({args:{}, limit: 10, next: null, previous: null   }));
        }catch (e) {

        }
    }
    render() {
        const {chefs} = this.props;

        return (
            <MDBContainer className="px-0">
                <div className="d-flex justify-content-center flex-wrap">
                    {!!chefs && chefs.map((chef: any,key: number) => ( <div className="p-1 " key={'hchef'+key}><Chef chef={chef}/></div>))}
                </div>
                <MDBRow center className="view-all-btn mt-5">
                    <MDBCol md="12">
                        <MDBBtn color="primary" outline rounded className="view-btn" onClick={()=>this.props.history.push("/search")} >View All...</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
const mapStateToProps = (state: any) => {
    return {
        loadingChefs: state.chef.loadingChefs,
        chefs: state.chef.chefs,
    }
}

const HomepageChefs = connect(mapStateToProps)(Chefs);
export default HomepageChefs;
