import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import queryString from 'query-string';
import axios from 'axios';

class Item extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <li className="item">
                <div className="item_image">
                    <Link to={"/item/" + this.props.data.id}>
                        <img src={this.props.data.thumbnail} alt={this.props.data.title} className="cover"/>
                    </Link>
                </div>
                <div className="item_resume">
                    <div className="title">
                        <Link to={"/item/" + this.props.data.id}>
                            <h1 className="name">{this.props.data.title}</h1>
                        </Link>
                    </div>
                    <h2 className="price">R$ {this.props.data.price}</h2>
                    <p className="desc">{this.props.data.sold_quantity} Vendidos -  {this.props.data.seller_address.city.name}</p>
                </div>
            </li>
        )
    }
}

export default class Items extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result:""
        }
    }
    
    componentDidMount(e) {
        let self = this;
        let query = queryString.parse(this.props.location.search);
        axios.get('http://localhost:3030/api/items?search=' + query.search)
        .then(function(resp) {
            console.log(resp.data)
            self.setState({
                result:resp.data.slice(0, 4)
            });
        }).catch(function(err){
            console.log(err);
        })
    }

    render(){
        let results = [];
        if(this.state.result){
            this.state.result.map((item, idx) => {
                results.push( <Item data={item} key={idx} /> );
            })
        }

        return(
            <div>
                <Header />
                <section id="results">
                    <div className="container">
                        <div className="content">
                            <ul className="items">
                                { results.map( (item, idx) => {
                                    return item
                                }) }
                            </ul>
                        </div>
                    </div>
                </section>
        </div>
        )
    }
}
