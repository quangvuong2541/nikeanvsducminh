import React, { useState } from 'react'
import { Hidden } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as action from "../module/action/action"
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paypal from '../../../paypal/paypal';

const useStyles = makeStyles((theme) => ({
    Summary: {
        padding: "0 20px"
    },
    Title: {
        fontSize: 22,
        marginBottom: 12
    },
    PriceDetail: {
        marginBottom: 8,
        lineHeight: 1.75
    },
    HelpIcon: {
        width: 16,
        height: 16,
        marginLeft: 8,
        cursor: "pointer"

    },
    HelpToolTip: {
        fontSize: 14,
        padding: "0 5px",
        width: 220,
        borderRadius: 2,
        lineHeight: 1.3,
        cursor: "pointer"
    },
    price: {
        float: "right"
    },
    totalPrice: {
        margin: "12px 0",
        borderTop: "1px #ccccc solid",
        borderBottom: "1px #ccccc solid",
        padding: "14px 0"
    },
    checkout: {
        padding: "20px 16px"
    },
    checkOutButton: {
        width: "100%",
        color: "white",
        backgroundColor: "black",
        padding: "18px 24px",
        outline: 0,
        borderRadius: 30,
        border: "none",
        cursor: "pointer",
        fontSize: 16,
        marginBottom: 12
    },
    checkOutMobileContainer: {
        width: "100%",
        padding: "16px 12px",
        position: "fixed",
        bottom: 0
    }
}))

const CartSummary = () => {
    const classes = useStyles()
    const [openHelp, setOpenHelp] = useState(false);
    const handleHelpClose = () => {
        setOpenHelp(false)
    }
    const [checkOut, setCheckOut] = useState(false);
    const dispatch = useDispatch()
    const products = useSelector(state => state.reducerCart.products)
    //  use naviga: điều hướng trang
    const history = useNavigate()
    // tính tổng tiền dùng hàng reducer của es6
    const sumMoney = products.reduce((sum, item) => {
        return sum + item.quantity * item.price
    }, 0)
    const checkOuts = () => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            console.log("please signin before checkout")
        } else {
            if (products.length > 0) {
                setCheckOut(true)
            } else {
                console.log("please buy product before checkout")
            }
        }
    }
    const transactionSuccess = (data) => {
        console.log("Payment success")
        for (const item of products) {
            delete item.sizes
            delete item.message
        }
        const userLocal = JSON.parse(localStorage.getItem("user"))
        const { token } = userLocal
        const object = {
            products: products,
            isPayed: data.paid,
            description: "paypal"
        }
        dispatch(action.postAPICart(object, token, history))
    }
    const transactionLive = (data) => {
        for (const item of products) {
            delete item.sizes
            delete item.message
        }
        const userLocal = JSON.parse(localStorage.getItem("user"))
        const { token } = userLocal
        const object = {
            products: products,
            isPayed: false,
            description: "payment on delivery"
        }
        dispatch(action.postAPICart(object, token, history))
    }
    const transactionError = (data) => {
        setTimeout(() => {
            console.log("payment fail")
              
        }  , 2000)
    }
    const transactionCancel = (data) => {
        console.log("error", data);
    }
    const convertVNDtoUSD = () => {
        return (sumMoney / 23000).toFixed(2)
    }

    return (
        <div className={classes.Summary}>
            <div className={classes.Title}>Summary</div>
            <div className={classes.PriceDetail}>
                Subtotal
                <ClickAwayListener onClickAway={handleHelpClose}>
                    <Tooltip
                        arrow
                        placement="bottom-end"
                        onClose={handleHelpClose}
                        open={openHelp}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={
                            <div className={classes.HelpToolTip}>
                                The subtotal reflects the total price of your order, including
                                taxes, before any applicable discounts. It does not include
                                delivery costs and international transaction fees.                            </div>
                        }
                    >
                        <HelpIcon
                            className={classes.HelpIcon}
                            onClick={() => setOpenHelp(!openHelp)} />
                    </Tooltip>
                </ClickAwayListener>
                <div className={classes.totalPrice}>
                    Total:
                    <div className={classes.price}>
                        {sumMoney.toLocaleString()}đ
                    </div>
                </div>
                {/*  checkout */}
                {!checkOut && (
                    <Hidden smDown>
                        <div className={classes.checkout}>
                            <button
                                className={classes.checkOutButton}
                                onClick={() => { checkOuts() }}
                            >
                                Guess Checkout
                            </button>
                            <button className={classes.checkOutButton}>
                                Member Checkout
                            </button>
                        </div>
                    </Hidden>
                )}
                <Hidden smDown>
                    {checkOut && (
                        <Paypal
                            sum={convertVNDtoUSD()}
                            transactionSuccess={transactionSuccess}
                            transactionCancel={transactionCancel}
                            transactionError={transactionError}
                        />
                    )}{
                        checkOut && (
                            <button onClick={transactionLive}
                                className={classes.checkOutButton}
                            >Payment on delivery</button>
                        )
                    }
                </Hidden>

            </div>
        </div>
    )
}

export default CartSummary