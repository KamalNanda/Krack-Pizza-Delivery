import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './navlinks.module.css'
import Cart from '../../../Pages/Menu/Cart/Cart'

function Navlinks(props) {
    const [showCart, setShowCart] = useState(false)
    const toggleShow = () => {
        setShowCart(!showCart)
    }
    return (
        <div className={`ml-auto my-auto ${style.NavLinkHolder}`}>
            <NavLink exact to="/" className={style.NavLink} activeClassName={style.NavLinkActive}>
                Home
            </NavLink>
            <NavLink exact to="/menu" className={style.NavLink} activeClassName={style.NavLinkActive}>
                Menu
            </NavLink>
            <p style={{cursor:'pointer', position:'relative'}} >
                <span onClick={() => toggleShow()} className={style.NavLink} activeClassName={style.NavLinkActive}>CART</span>
                {
                    showCart   
                        ? <div style={{
                            position:'absolute',
                            width: '400px',
                            right: -100
                        }}>
                            <Cart />
                          </div>
                        : <></>
                }
            </p>

            {props.user ? <>
                <NavLink exact to="/orders" className={style.NavLink} activeClassName={style.NavLinkActive}>
                    Orders
                </NavLink>
                <NavLink exact to="/logout" className={style.NavLink} activeClassName={style.NavLinkActive}>
                    Log Out
                </NavLink>
            </> : <>
                    <NavLink exact to="/login" className={style.NavLink} activeClassName={style.NavLinkActive}>
                        Log In
                    </NavLink>
                    <NavLink exact to="/register" className={style.NavLink} activeClassName={style.NavLinkActive}>
                        Register
                    </NavLink>
                </>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Navlinks)