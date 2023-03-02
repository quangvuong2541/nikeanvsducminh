import React from 'react'
import { makeStyles, withStyles } from '@mui/styles';
import { Grid, InputBase } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from "../module/action/action"
import * as actionType from "../module/contants/constant"
const useStyles = makeStyles((theme) => ({
    FavouriteContainer: {
        // [theme.breakpoints.down("sm")]: {
        //     marginTop: 20,
        //     padding: "0 8px",
        // },
    },
    Title: {
        fontSize: 22,
        marginTop: 24,
    },
    Product: {
        clear: "both",
        padding: "24px 0",
        borderBottom: "1px #cccccc solid",
    },
    ProductImageContainer: {
        paddingRight: 16,
        float: "left",
    },
    ProductImage: {
        width: 150,
        height: 150,
        marginRight: 10,
        // [theme.breakpoints.down("xs")]: {
        //     width: 80,
        //     height: 80,
        // },
    },
    ProductDetail: {
        lineHeight: 1.75,
    },
    ProductName: {
        textDecoration: "none",
        color: "black",
    },
    Price: {
        float: "right",
        // [theme.breakpoints.down("xs")]: {
        //     float: 'none',
        // },
    },
    SubDetail: {
        color: "#757575",
    },
    FavouriteButton: {
        color: "black",
        backgroundColor: "white",
        padding: "8px 24px",
        borderRadius: 20,
        outline: 0,
        border: "1px #cccccc solid",
        fontSize: 16,
        cursor: "pointer",
        lineHeight: 1.75,
        marginTop: 30,
        // [theme.breakpoints.down("xs")]: {
        //     marginTop: 0,
        // },
    },
    GoToFavourites: {
        color: "#757575",
        fontSize: 14,
        marginTop: 16,
    },
    SelectContainer: {
        display: "flex",
        alignItems: "baseline",
    },
    SelectFormControl: {
        marginRight: 10,
    },
}));
const customSelect = withStyles((theme) => ({
    input: {
        fontSize: 16,
        color: "#757575",
        padding: "0px 12px",
        lineHeight: "inherit"
    }
}))(InputBase)
const CartFavorite = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const userFavor = JSON.parse(localStorage.getItem("userFavor"))
    return (
        <div className={classes.FavouriteContainer}>
            <div className={classes.Title}>Favorites</div>
            <Grid container spacing={2}>
                {!userFavor &&
                    <h1>
                        want to have cart favortite ?
                    </h1>
                }
                {userFavor &&
                    userFavor.map((item, index) => {
                        return (
                            <Grid item xs={12} md={6}>
                                <div className={classes.Product} key={index}>
                                    <div className={classes.ProductImageContainer}>
                                        <img
                                            className={classes.ProductImage}
                                            src={item.img} />
                                    </div>
                                    {/* detail */}
                                    <div className={classes.ProductDetail}>
                                        {/* name */}
                                        <div className={classes.ProductName}>
                                            {item.name}
                                        </div>
                                        {/* price */}
                                        <div className={classes.Price}>
                                            {item.price.toLocaleString()}đ
                                        </div>
                                        {/* size */}
                                        <div className={classes.SubDetail}>
                                            <div>{item.message}</div>
                                            <div className={classes.SelectContainer}>
                                                size: {item.size}
                                            </div>
                                        </div>
                                    </div>
                                    <button className={classes.FavouriteButton}
                                        onClick={() => {
                                            dispatch(
                                                action.createAction({
                                                    type: actionType.ADD_TO_CARD,
                                                    payload: item
                                                })
                                            )
                                        }}
                                    >
                                        {/* onclick dispatch  */}
                                        add to bag
                                    </button>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>



        </div>
    )
}

export default CartFavorite
