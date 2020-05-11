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
        console.log(JSON.stringify(item));

        let isItemExist=this.state.cartItems.some((cartItem)=>{
            return cartItem.id==item.id;
        })

        if(isItemExist==false){
            //New Item
            item.qty=1;
            this.setState({
                cartItems:[
                    ...this.state.cartItems,
                    item
                ],
                orderTotal:this.state.cartItems.reduce((total,cartItem)=>{
                    return total+cartItem.price * cartItem.qty;
                },0)+item.price*item.qty
            })
        }
        else
        {
            //Existing Item
            var existingItem=this.state.cartItems.find((cartItem)=>{
                return cartItem.id==item.id;
            })

            existingItem.qty=existingItem.qty+1;

            this.setState({
                cartItems:[
                    ...this.state.cartItems.filter((cartItem)=>{
                        return cartItem.id!=item.id
                    }),
                    existingItem
                ]
            },()=>{
                this.setState({
                    orderTotal:this.state.cartItems.reduce((total,cartItem)=>{
                        return total+cartItem.price * cartItem.qty;
                    },0)
                })
            })
        }
    }

    removeFromCart=(item)=>{
        console.log(JSON.stringify(item))

        this.setState({
            cartItems:this.state.cartItems.filter((currentItem)=>{
                return currentItem.id!=item.id;
            })
        },()=>{
            this.setState({
                orderTotal:this.state.cartItems.reduce((total,cartItem)=>{
                    return total+cartItem.price * cartItem.qty;
                },0)
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