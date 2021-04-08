import react, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { cartEmpty } from './helper/CartHelper'
import { getmeToken, processPayment } from './helper/PaymentHelper'
import { createOrder } from './helper/OrderHelper'
import DropIn from 'braintree-web-drop-in-react'
import { isAuthenticated, signout } from "../auth/helper";

const PymentB = ({ products, reload = undefined, setReload = f => f, }) => {
    const [info, setInfo] = useState({
        loading: false,
        sucess: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user.id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token)
            .then(info => {
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error,
                    })
                    signout(() => {
                        return <Redirect to='/' />
                    })
                }
                else {
                    const clientToken = info.clientToken
                    setInfo({ clientToken })
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + parseInt(p.price)
        })
        return amount
    }

    const showbtnDropin = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                        (
                            <div>
                                <DropIn
                                    options={{ authorization: info.clientToken }}
                                    onInstance={instance => (info.instance = instance)}
                                />
                                <button onClick={onPurchase} className='btn btn-block btn-success'>Buy Now</button>

                            </div>
                        ) :
                        (
                            <h3>Plz Login First or Add something in cart</h3>
                        )
                }
            </div>
        )
    }

    const onPurchase = () => {
        setInfo({ loading: true })
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount(),
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        if (response.error) {
                            if (response.code == '1') {
                                console.log('PAYMENT FAILED')
                                signout(() => {
                                    return <Redirect to='/' />
                                })
                            }
                        } else {
                            setInfo({
                                ...info,
                                sucess: response.sucess,
                                loading: false

                            })
                            console.log('PAYMENT SUCCESS')
                            let product_names = ''
                            products.forEach(function (item) {
                                product_names += item.name + ", "
                            })
                            const orderData = {
                                products: product_names,
                                transaction_id: response.transaction.id,
                                amount: response.transaction.amount,

                            }
                            createOrder(userId, token, orderData)
                                .then(response => {
                                    if (response.error) {
                                        if (response.code == '1') {
                                            console.log('Order failed')
                                        }
                                        signout(() => {
                                            return <Redirect to='/' />
                                        })
                                    }
                                    else {
                                        if (response.sucess == true) {
                                            console.log('Order placed')
                                        }
                                    }
                                })
                                .catch(error => {
                                    setInfo({ loaging: false, sucess: false })
                                    console.log('Order failed', error)
                                })
                            cartEmpty(() => {
                                console.log('cart is empty')
                            })
                            setReload(!reload)

                        }
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log("Nonce", e))
    }


    return (
        <div>
            <h4>your bill is {getAmount()} RS </h4>
            {showbtnDropin()}
        </div>
    )
}
export default PymentB;