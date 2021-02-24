import React, { useState, useEffect } from 'react';

let Shop = () => {
    let [cart, setCart] = useState([]);

    useEffect(() => {
    }, [cart])

    let productList = [
        {sku: 9325336130810,
        name: 'Game of Thrones: Season 1',
        price: 39.49},
      
        {sku: 9325336028278,
        name: 'The Fresh Prince of Bel-Air',
        price: 19.99},
      
        {sku: 9780201835953,
        name: 'The Mythical Man-Month',
        price: 31.87,
        promo: 'promo1'}, //Buy 10 or more copies of The Mythical Man-Month, and receive them at the discounted price of $21.99
      
        {sku: 9781430219484,
        name: 'Coders at Work',
        price: 28.72,
        promo: 'promo2'}, //3 for the price of 2 deal on Coders at Work. (Buy 3 get 1 free)
      
        {sku: 9780132071482,
        name: 'Artificial Intelligence',
        price: 119.92},
    ];
      
    let createProductsList = (products) => {
        let items = []
      
        products.map( product => {
          return items.push(
            <React.Fragment>
                <li key={product.sku} className='product' >
                    <span className='product__name'>{product.name}</span> 
                    <span>
                        <span className='product__price'>${product.price.toFixed(2)}</span>
                        <button onClick={() => updateCart(product, 'add')}>Add to cart</button>
                    </span>
                </li>
            </React.Fragment>
            )
        })
      
        return (
            <ul className='product-list'>
                {items}
            </ul>
        )
    }
      
    let updateCart = (product, action) => {
        let productToBeUpdated = cart.find( item => item.sku === product.sku);

        if (productToBeUpdated) {
            action === 'add' ? productToBeUpdated.quantity++ : productToBeUpdated.quantity--;
            if (productToBeUpdated.quantity <= 0){
                let newCart = cart.filter(cartItem => cartItem !== productToBeUpdated);
                setCart( cart => [...newCart]);
            }
            else{
                setCart(cart => [...cart]);
            }
        } 
        
        else {
                productToBeUpdated = {
                    sku: product.sku,
                    name: product.name,
                    price: product.price,
                    promo: product.promo ? product.promo : null,
                    quantity: 1,
                }
                setCart(cart => [...cart, productToBeUpdated]);
            }
        
    }

    let clearCart = () => {
        setCart([]);
    }

    let renderCartItems = (cartItems) => {
        let list = [];
        let total = 0;

        cartItems.map( item => {
            let subTotal = 0;

            if (item.promo){
                if (item.promo === 'promo1' && item.quantity >= 10){
                    let discountedPrice = 21.99;
                    subTotal = discountedPrice*item.quantity
                }
                else if (item.promo === 'promo2' && item.quantity >= 3){
                    let freeItemsQuantity = Math.floor(item.quantity/3);
                    subTotal= item.price*(item.quantity - freeItemsQuantity);
                }
                else{
                    subTotal = item.price*item.quantity
                }
            }

            else{
                subTotal= item.price*item.quantity;
            }
            
            total += subTotal;

            return(
                list.push(
                    <li key={`cart-${item.sku}`} className='product'>
                        <span className='product__name'>{item.name}</span> 
                        <span>
                            x {item.quantity}
                            <span className='product__price'>{` $${subTotal.toFixed(2)}`}</span>
                            <button onClick={() => updateCart(item, 'remove')}>Remove</button>
                        </span>
                    </li>)
            )
        });

        return (
            <React.Fragment>

                <ul className='product-list'>
                    {list}
                </ul>

                <div className='cart__total-container'>
                    <h3>Total: ${total.toFixed(2)} </h3>
                    <button onClick={() => clearCart()}>Clear Cart</button>
                </div>

            </React.Fragment>)
    }

    return (
        <React.Fragment>
            <h2>Our Products:</h2>
            {createProductsList(productList)}
            <h2>Cart:</h2>
            {renderCartItems(cart)}
        </React.Fragment>
    );
}

export default Shop;
