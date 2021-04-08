import React,{useState,useEffect} from 'react'
import Base from "./Base";
import {loadCart} from "./helper/CartHelper";
import Card from "./Card";
import PaymentB from "./PaymentB";


const Cart = () => {
    const [reload,setReload]=useState(false)
    const [products,setProducts] = useState([])
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])


    const loadAllproducts = (products) =>{
        if(products.length>0){
        return(
            <div>
                {products.map((product,index) => (
                    <Card
                    key={index}
                    product={product}
                    removefromCart={true}
                    addtoCart={false}
                    reload={reload}
                    setReload={setReload}
                    />

                ))}
            </div>
        );}else {
            return (
                <div>
                    <h1>No products</h1>
                </div>
            )
        }
    };
    const loadCheckout = () =>{
        return(
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }


    return (
        <Base title='Cart Page' desc='Welcome to checkout'>
            <div className="row text-center">
                <div className="col-6">
                    {loadAllproducts(products)}
                </div>
                <div className="col-6">
                    {products.length >0 ?
                        (
                            <PaymentB products={products} setReload={setReload} />
                        ) :
                        (
                        <h3>Plz login or add somethong in cart</h3>
                    )}
                </div>
            </div>
            
        </Base>
    )
}



export default Cart;
