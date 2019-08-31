import React from 'react';
import "./Chef.scss";
import ReactRating from 'react-rating';
import placeholderImage  from '../../assets/images/layer-46.png';

const {MDBIcon} = require("mdbreact");


interface Props {
  chef?: any
}
interface State {

}


class Chef extends React.Component<any,any>{
    render(){
        const {chef} = this.props
        return(
            <div>
                <img  src={placeholderImage} className="chef-image  rounded-circle d-none d-sm-block" alt="" />
                <img  src={placeholderImage} className="chef-image-xs  rounded-circle d-block d-sm-none" alt="" />
                <div>
                    <p className="chef-name">{!!chef && `${chef.firstName} ${chef.lastName}`}</p>
                    <p className="chef-address">Yamuna Nagar, Delhi</p>
                </div>
                <div className="text-center pt-2">
                    <ReactRating
                        placeholderRating={!!chef && chef.rating}
                        placeholderSymbol={<MDBIcon icon="star" className="rating-filled" />}
                        emptySymbol={<MDBIcon far icon="star" className="rating-unfilled icon" />}
                        fullSymbol={<MDBIcon icon="star" className="rating-filled"/>}
                        readonly
                    /></div>
            </div>
        )
    }

}
export default Chef;
