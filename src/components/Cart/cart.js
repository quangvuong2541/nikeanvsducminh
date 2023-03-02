import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Container, Drawer, Grid, Hidden } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as action from "./module/action/action"
import CartBag from './cartComponent/cartBag';
import * as ReactDOM from 'react-dom';
import CartSummary from './cartComponent/cartSummary';
import Paypal from '../../paypal/paypal';
import CartFavorite from './cartComponent/cartFavorite';

const useStyles = makeStyles((theme) => ({
    Container: {
        margin: '40px 0',
    },
    Cart: {
        width: 1100,

        margin: '0px auto',
        fontSize: 16,
    },
    CloseIcon: {
        float: 'right',
        color: 'grey',
        cursor: 'pointer',
    },
    PromoCode: {
        padding: '8px 0 30px 16px',
        fontSize: 12,
    },
    PromoCodeTitle: {
        fontSize: 14,
    },
    Bag: {
        fontSize: 22,
    },
    BagMobile: {
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 1.75,
    },
    NumberItems: {
        color: '#757575',
    },
    CheckoutButton: {
        width: '100%',
        color: 'white',
        backgroundColor: 'black',
        padding: '18px 24px',
        outline: 0,
        borderRadius: 30,
        border: 'none',
        cursor: 'pointer',
        fontSize: 16,
        lineHeight: 1.75,
    },
    CheckoutMobileContainer: {
        width: '100%',
        padding: '16px 0px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    MoreOptionsContainer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 2,
        display: 'none',
    },
    MoreOptionsButton: {
        width: '100%',
        color: 'white',
        backgroundColor: 'black',
        padding: '18px 24px',
        outline: 0,
        borderRadius: 30,
        border: 'none',
        cursor: 'pointer',
        fontSize: 16,
        marginBottom: 8,
        lineHeight: 1.75,
    },
    MoreOptionsCancel: {
        width: 'inherit',
        color: 'black',
        backgroundColor: 'white',
        padding: '18px 24px',
        outline: 0,
        borderRadius: 30,
        border: '1px #cccccc solid',
        cursor: 'pointer',
        fontSize: 16,
        lineHeight: 1.75,
    },
    MemberCheckoutContainer: {
        padding: 24,
    },
}));
const Cart = (props) => {
    const classes = useStyles()
    const [PromoCode, setPromoCode] = useState(true)
    const products = useSelector(state => state.reducerCart.products)
    const cancelMoreOptions = () => {
        let moreOption = document.getElementById("MoreOptionsContainer");
        ReactDOM.findDOMNode(moreOption).style.display = "none"
    }
    const sumMoney = products.reduce((sum, item) => {
        return sum + item.quantity * item.price
    }, 0)
    const { window } = props
    const container = window !== undefined
        ? () => window().document.body
        : undefined

    const [checkout, setCheckout] = React.useState(false)
    const dispatch = useDispatch()
    const history = useNavigate()
    const checkOut = () => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            alert("please sign in before checkout")
        } else {
            alert("please buy product before checkout")
        }
    }
    const transactionSuccess = (data) => {
        alert("payment success")
        const userLocal = JSON.parse(localStorage.getItem("user"))
        const { token } = userLocal
        const object = {
            products: products,
            isPayed: data.paid,
            description: "paypal"
        }
        dispatch(action.postAPICart(object, token, history))
    }
    const transactionError = (data) => {
        setTimeout(() => {
            alert("error")
        }, 2000)
    }
    const transactionCancel = (data) => {
        console.log("error", data);
    }
    const convertVNDtoUSD = () => {
        return (sumMoney / 23000).toFixed(2)
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
    return (

        <div className={classes.container}>
            {products && (
                <Container maxWidth="xl">
                    <div className={classes.cart}>
                        <Hidden mdUp>
                            <div className={classes.BagMobile}>
                                <div className={classes.Bag}>bag</div>
                                <span className={classes.NumberItems}>bag</span>
                            </div>
                        </Hidden>
                        <Grid container spacing={2}>
                            <Grid item md={8} xs={12}>
                                {PromoCode &&
                                    <div className={classes.PromoCode}>
                                        <div className={classes.PromoCodeTitle}>
                                            have a promo code
                                        </div>
                                        <div>If you have a promo code you will be able to apply it on the payment page during checkout.
                                        </div>
                                    </div>
                                }
                                <Hidden smDown >
                                    <div className={classes.Bag}>bag</div>
                                </Hidden>
                                {/*  bag  */}
                                <CartBag />
                            </Grid>

                            <Grid item md={4} xs={12}>
                                {/* summary */}
                                <CartSummary />
                            </Grid>
                        </Grid>
                        <CartFavorite />
                    </div>
                </Container>
            )}
            {/* checkout mobile  */}
            <Hidden mdUp>
                <div className={classes.CheckoutMobileContainer}>
                    <div style={{ margin: '0 12px' }}>
                        <button
                            onClick={() => checkOut()}
                            className={classes.CheckoutButton}>
                            go to checkout
                        </button>
                    </div>
                </div>
                <Drawer container={container}
                    variant="temporary"
                    anchor='bottom'
                    open={checkout ? true : false}
                    onClose={() => { setCheckout(false) }}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    <div className={classes.MemberCheckoutContainer}>
                        {/* paypal */}
                        <Paypal
                            sum={convertVNDtoUSD()}
                            transactionSuccess={transactionSuccess}
                            transactionCancel={transactionCancel}
                            transactionError={transactionError}
                        />
                        <button className={classes.MoreOptionsButton}
                            onClick={transactionLive}
                        >
                            member checkout
                        </button>
                    </div>
                </Drawer>
            </Hidden>
            <Hidden smUp>
                <div id="MoreOptionsContainer" className={classes.MoreOptionsContainer}>
                    <button className={classes.MoreOptionsButton}>
                        Move to Favourites
                    </button>
                    <button className={classes.MoreOptionsButton}>
                        Remove
                    </button>
                    <button className={classes.MoreOptionsCancel}
                        onClick={() => cancelMoreOptions()}
                    >
                        Cancel
                    </button>
                </div>
            </Hidden>

        </div>

    )
}

export default Cart