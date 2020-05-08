import React, { Component } from 'react'
import './Shop.css'
import Catalog from './Catalog';
import Cart from './Cart';
import Checkout from './Checkout';

class Shop extends Component{
    constructor(){
        super();

        let items=[
            {
                id:1,
                name:"Pant",
                price:100
            },
            {
                id:2,
                name:"Shirt",
                price:100
            },
            {
                id:3,
                name:"Short",
                price:50
            }
        ]

        this.state={
            items:items,
            cartItems:[],
            orderTotal:0
        }
    }

    addToCart=(item)=>{
        console.log(JSON.stringify(item))
        this.setState({
            cartItems:[
                ...this.state.cartItems,
                item
            ]
        })
    }

    removeFromCart=(item)=>{
        console.log(JSON.stringify(item))

        this.setState({
            cartItems:this.state.cartItems.filter((currentItem)=>{
                return currentItem.id!=item.id;
            })
        })
    }

    render(){
        return (
            <div className="row">
                <h1>Shop</h1>
                <div className="column">
                    <Catalog items={this.state.items} addToCart={this.addToCart}/>
                </div>
                <div className="column">
                    <Cart items={this.state.cartItems} removeFromCart={this.removeFromCart}/>
                    <Checkout orderTotal={this.state.orderTotal}/>
                </div>
            </div>
        )
    }
}

export default Shop;