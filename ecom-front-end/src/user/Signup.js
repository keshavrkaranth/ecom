import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper/index'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });
    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true,
                    })
                } else {

                    setValues({
                        ...values,
                        error: true,
                        success: false,
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const successMessage = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className='alert alert-success'

                        style={{ display: success ? "" : "none" }}
                    >
                        New account Created successfully.Please
                        <Link to='/Signin' > Login now</Link>
                    </div>
                </div>
            </div>
        )
    }

    const ErrorMessage = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className='alert alert-danger'

                        style={{ display: error ? "" : "none" }}
                    >
                        Check all Fields again
                    </div>
                </div>
            </div>
        )
    }

    const signupForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form >
                        <div className='form-group'>
                            <label className='text-light'>Name</label>
                            <input
                                className='form-control'
                                value={name}
                                onChange={handleChange('name')}
                                type="text" />
                        </div>
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
                        <button className='btn btn-success btn-block' onClick={onSubmit}>Signup</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Signup" desc='A sign up for Ecom'>
            {successMessage()}
            {ErrorMessage()}
            {signupForm()}
            <p className='text-white text-center'>
                {JSON.stringify(values)}
            </p>
        </Base >
    )
}

export default Signup
