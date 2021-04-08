import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from "../auth/helper";
import cart from '../images/cart.png'


const currentTab = (history,path) =>{
    if (history.location.pathname === path){
        return {color:'#2ecc72'}
    }else {
        return {color: '#FFFFFF'}
    }
}




const Menu = ({history,path}) => {
    return (
        <div>
            <ul className='nav nav-tabs bg-dark'>
                <li className="nav-item">
                    <Link style={currentTab(history,'/')} className='nav-link' to='/'>Home</Link>
                </li>

                {isAuthenticated() && <li className="nav-item">
                    <Link style={currentTab(history,'/user/dashbord')} className='nav-link' to='/user/dashbord'>Dashbord</Link>
                </li>}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history,'/signup')} className='nav-link' to='/signup'>Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history,'/signin')} className='nav-link' to='/signin'>Signin</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item justify-content-end ml-auto">
                        <Link style={currentTab(history,'/cart')} className='nav-link' to='/cart'>Cart</Link>
                    </li>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className='nav-link text-warning'
                          onClick={()=>{
                              signout(()=>{
                                  history.push('/')
                              })
                          }}>
                        Signout
                    </span>
                    </li>
                )}

            </ul>
        </div>
    )
}

export default withRouter(Menu);
