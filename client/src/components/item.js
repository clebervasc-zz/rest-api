import React from 'react';
import Header from './header';
import axios from 'axios';


export default class Details extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:"",
            thumbnail:"",
            title:"",
            permalink:"",
            price:"",
            description:""
        }
    }

    componentDidMount(e) {
        let self = this;
        
        axios.get('http://localhost:3030/api/items/' + this.props.match.params.id)
        .then(function(resp) {
            console.log(resp)
            self.setState({
                id:resp.data.id,
                thumbnail:resp.data.pictures[0].url,
                title:resp.data.title,
                price:resp.data.price
            })
        }).catch(function(err){
            console.log(err);
        })


        axios.get('http://localhost:3030/api/items/' + this.props.match.params.id + '/description')
        .then(function(resp) {
            console.log(resp.data)
            self.setState({
                description:resp.data.text
            })
        }).catch(function(err){
            console.log(err);
        })

    }

    render(){
        let desc = this.state.description;
        function createDomElem() { return {__html: desc }; };
        return(
            <div>
                <Header />
                <section id="details">
                   <div className="container">
                       <div className="content" name={this.state.id}>
                           <div className="product">
                               <div className="cover">
                                   <div className="image">
                                       <img src={this.state.thumbnail} alt={this.state.title} />
                                    </div>
                               </div>

                               <div className="infos">
                                    <h1>{this.state.title}</h1>
                                    <h2>R$ {this.state.price}</h2>
                                    <button>Compar Agora</button>
                                </div>
                           </div>
                           <div className="productDetails">
                               <h3>Descrição do produto</h3>
                               <div dangerouslySetInnerHTML={createDomElem()} />
                           </div>
                       </div>
                   </div>
               </section>
            </div>
        )
    }
}