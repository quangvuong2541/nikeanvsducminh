import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { borderRadius, fontSize } from '@mui/system'
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
        marginBottom: 32
    },
    contentLink: {
        color: "black",
        textDecoration: 'none'
    },
    trendingContainer: {
        height: 700,
        display: "flex",
        alignItems: 'flex-end',
        backgroundPosition: "center center"
    },
    trendingName: {
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
const Trending = (props) => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.title} > {props.titleTrending}   </div>
            <Grid container spacing={3}>
                {props.dataTrending.map((item, key) => {
                    return (
                        <Grid item xs={12} sm={6} key={key}>
                            <div >
                                <div className={classes.trendingContainer} style={{ backgroundImage: `url(${item.img})` }}>
                                    <div className={classes.info}>
                                        <div className={classes.trendingName}> {item.title}</div>
                                        <div >
                                            <a className={classes.shopLink} href='#a'>{item.button}</a>
                                        </div>
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

export default Trending