import React,{useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom'
import { addItemToCart,removeItemFromcart } from './helper/CartHelper';
import {isAuthenticated} from "../auth/helper";



const Card = ({
    product,
    addtoCart = true,
    removefromCart = true,
    reload=undefined,
    setReload=f =>f,
}) => {

    const [redirect,setRedirect] = useState(false)


    const cartTitle = product ? product.name : 'A photo from unsplash'
    const cartDesc = product ? product.description : 'Default Desc'
    const cartPrice = product ? product.price : 'Default price'


    const addToCart = () => {
        addItemToCart(product , () =>setRedirect(true))
        if (isAuthenticated()) {
            console.log('added to cart')
        } else {
            alert('You need to login before add items to cart')
        }
    };


    const getRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddTocart = addToCart => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const shoRemoveFromcart = removefromCart => {
        return (
            removefromCart && (
                <button
                    onClick={() => {
                        removeItemFromcart(product.id)
                        console.log('deleted fromcart')
                        setReload(!reload )
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>

            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDesc}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddTocart(addToCart)}
                    </div>
                    <div className="col-12">
                        {shoRemoveFromcart(removefromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;