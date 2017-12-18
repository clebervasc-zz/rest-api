import React from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:"",
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({redirect: true});
    }

    render(){
        if(this.state.redirect)
            return <Redirect to={{pathname: '/items', search: '?search='+this.state.search}} push />
        
        return(
            <header id="header">
                <nav>
                    <div className="container">
                        <div className="content">
                            <Link to="/" className="logo">
                                Mercado Livre Brasil - Onde comprar e vender de Tudo
                            </Link>
            
                            <form id="formSearch" className="form-inline" onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Pesquisar produto" name="search" id="search" onChange={this.handleChange}/>
                                <button type="submit" id="send">
                                    <i className="fa fa-search"><span>Buscar</span></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}