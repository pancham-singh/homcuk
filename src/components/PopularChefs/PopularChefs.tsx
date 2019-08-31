import React,{Component} from "react";
import PopularChefCard from "../PopularChefCard/PopularChefCard";
import {connect} from "react-redux";
import {getChefs} from "../../redux/chef";

class PopularChefs extends Component <any,any>{

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
            <div>
                {!!chefs && chefs.map((chef: any,key: number) => (<PopularChefCard chef={chef} key={'rchef'+key}/>))}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loadingChefs: state.chef.loadingChefs,
        chefs: state.chef.chefs,
    }
}

const RandomChefs = connect(mapStateToProps)(PopularChefs);
export default RandomChefs;
