import React, { useState, useEffect } from 'react'
import Base from './Base';
import { getProducts } from './helper/CoreApiCalls'
import '../styles.css';
import Card from './Card';

export default function Home() {


    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)

    const loadAllproducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log((error))
                } else {
                    setProducts(data);
                }
            })


    };
    useEffect(() => {
        loadAllproducts();
    }, );

    return (
        <Base title='Home Page' desc='Welcome to T shirt Store'>
            <div className="row">
                {products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    );
                })}

            </div>
        </Base>
    );
}
