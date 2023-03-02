import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
        marginBottom: 32
    },
    contentLink: {
        color: "black",
        textDecoration: 'none'
    },
    MoreNikeContainer: {
        height: 540,
        display: "flex",
        alignItems: 'flex-end',
        backgroundPosition: "center center"
    },
    MoreNikeName: {
        color: "white",
        fontSize: 25,
        fontWeight: 400,
        marginBottom: 30
    },
    shopLink: {
        color: "black",
        textDecoration: "none",
        margin: "0 8px 8px 0 ",
        padding: '8px 28px',
        backgroundColor: "white",
        borderRadius: "20px",
        fontSize: 16,
        transition: "all 0.75s",

        "&:hover": {
            opacity: 0.5

        }
    },
    info: {
        padding: 40
    }


}))
const MoreNike = (props) => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.title}>{props.titleMoreNike}</div>
            <Grid container spacing={3} >
                {props.dataMoreNike.map((item, key) => {
                    return (
                        <Grid item xs={12} sm={4} key={key}>
                            <div className={classes.contentLink}>
                                <div className={classes.MoreNikeContainer} style={{ backgroundImage: `url(${item.img})` }}>
                                    <div className={classes.shopLink}>
                                        {item.titleButton}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>

        </div>
    )
}

export default MoreNike