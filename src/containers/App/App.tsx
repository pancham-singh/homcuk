import React from 'react';
import Header from "components/Header";
import Footer from "components/Footer";
import "./App.scss"
import Banner from "../../components/Banner/Banner";
const {ToastContainer} = require("mdbreact");

interface Props {
    banner?: boolean,
    login?: boolean,
}

interface State {

}

export default class App extends React.Component<Props, State> {

    render() {
        const {banner, login} = this.props;
        return (
            <div>
                <Header banner={banner} login={login} {...this.props}/>
                {banner && <Banner {...this.props}/>}

                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <div>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }


}
