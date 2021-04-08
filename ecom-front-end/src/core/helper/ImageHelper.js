import React from 'react';

const ImageHelper = ({ product }) => {
    const imageurl = product ? product.image : `https://images.pexels.com/photos/3068661/pexels-photo-3068661.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`
    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl}
                style={
                    { maxHeight: '100%', maxWidth: '100%' }
                }
                className='mb-3 rounded'
                alt=""
            />
        </div>
    )
}


export default ImageHelper;