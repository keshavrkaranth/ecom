import React, { useState } from 'react'
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate, isAuthenticated } from "../auth/helper";


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false,
        didRedirect: false

    })
    const { email, password, error, success, loading, didRedirect } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }



    const onSubmit = (event) => {
        event.preventDefault()
        setValues({
            ...values,
            error: false,
            loading: true,
        })
        signin({ email, password })
            .then(
                data => {
                    console.log(data)
                    if (data.token) {

                        authenticate(data, () => {
                            setValues({
                                ...values,
                                didRedirect: true,

                            })
                        })
                    }
                    else {
                        setValues({
                            ...values,
                            loading: false,

                        })
                    }
                }
            )
            .catch(err => console.log(err))

    }
    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    const loadingmessage = () => {
        return (
            loading && (
                <div className='alert alert-info'>
                    <h2>Loading...</h2>
                </div>

            )
        )
    }

    const signInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form >

                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input
                                className='form-control'
                                value={email}
                                onChange={handleChange('email')}
                                type='email' />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input
                                className='form-control'
                                value={password}
                                onChange={handleChange('password')}
                                type="password" />
                        </div>
                        <button className='btn btn-success btn-block' onClick={onSubmit} >Signin</button>
                    </form>
                </div>
            </div>
        )
    }





    return (
        <Base title='Welcome to sign in page' desc='T-Shirt store'>
            {loadingmessage()}


            {signInForm()}
            <p className='text-center'>
                {JSON.stringify(values)}
            </p>
            {performRedirect()}

        </Base>
    )
}

export default Signin