import React from 'react'
import Carousel from './BodyComponent/Carousel'
import { makeStyles } from '@mui/styles'
import Trending from './BodyComponent/Trending'
import MoreNike from './BodyComponent/MoreNike'
import ProductScroll from './BodyComponent/ProductScroll'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "0 44px 50px"
  },
  bodyComponent: {
    marginTop: 84
  }
}))
const Body = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.body}>
      {/* carousel */}
      <div className={classes.bodyComponent}>
        <Carousel carouselImg={props.carouselImg} />
      </div>
      {/*  trending */}
      <div className={classes.bodyComponent}>
        <Trending dataTrending={props.dataTrending}
          titleTrending={props.titleTrending} />
      </div>
      {/* More Nike */}
      <div className={classes.bodyComponent}>
        <MoreNike titleMoreNike={props.titleMoreNike}
          dataMoreNike={props.dataMoreNike} />
      </div>

      <div className={classes.bodyComponent}>
        <ProductScroll />
      </div>
    </div>
  )
}

export default Body