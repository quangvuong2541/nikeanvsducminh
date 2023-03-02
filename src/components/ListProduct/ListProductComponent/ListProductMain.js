import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(theme => ({
  ListProductMainContainer: {
    padding: "0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  ProductNotFound:{
    fontSize: 28,
    textAlign: 'center',
    color: '#111',
  },
  ProductLink: {
    color: "black",
    textDecoration: "none",
    cursor: 'pointer',
    fontSize: 16,
    "&:hover": {
      "& $ProductDetailColorway": {
        display: "none"
      },
      "& $ProductColorway": {
        display: "block"
      }
    }
  },
  ProductImage: {
    width: "100%",
    height: "300px",
    [theme.breakpoints.down("xs")]: {
      height: "150px",
      width: "100%",
    }
  },
  ProductDetailColorway: {
    lineHeight: 1.75,
    display: "block"
  },
  ProductDetail: {
    lineHeight: 1.75,
    display: "block"
  },
  ProductColorway: {
    display: "none"
  },
  ProductColorwayImage: {
    width: 36,
    height: 36
  },
  Message: {
    paddingTop: 12,
    color: "#fa5400"
  },
  ProductType: {
    color: "#757575"
  },
  Price: {
    paddingTop: 10
  }
}));

export default function ListProductMain(props) {
  const classes = useStyles();
  const history = useHistory();
  const filterColor = useSelector(state => state.reducerURL.filterColor);
  const filterSize = useSelector(state => state.reducerURL.filterSize);
  const dataSearchInput = useSelector(state => state.reducerURL.dataSearchInput);
  const isLoading = useSelector(state => state.reducerURL.isLoading);
 
  const [imgURL, setImgURL] = React.useState({
    URL: '',
    index: null,
  });
  
  var listLazyLoad = [];
  for (let i = 0; i < 15; i++) {
    listLazyLoad.push(
      <Grid item xs={6} md={4}>
        <span className={classes.ProductLink}>
          <Skeleton animation="wave">
            <img className={classes.ProductImage} src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/13f77ac7-f477-4120-baac-bbe0467ccf3a/custom-kd-13-music-by-you.jpg"/>
          </Skeleton>
          <div className={classes.ProductDetailColorway}>
            <Skeleton animation="wave" width="100%"><div className={classes.ProductName}>ProductName</div></Skeleton>
            <div className={classes.ProductType}>
              <Skeleton animation="wave" width="100%"><div>Basketball Shoes</div></Skeleton>
              <Skeleton animation="wave" width="30%"><div>1 Colours</div></Skeleton>
            </div>
          </div>
          <Skeleton animation="wave" width="50%"><div className={classes.Price}>2.000.000 ₫</div></Skeleton>
        </span>     
      </Grid>
    )
  }
  return (
    <div>
      {isLoading ?
      <Grid container spacing={2} className={classes.ListProductMainContainer}>
        {listLazyLoad}
      </Grid>
      :
      <Grid container spacing={2} className={classes.ListProductMainContainer}>
        {props.data.length == 0 && (filterColor.length > 0 || filterSize.length > 0 || dataSearchInput.length > 0) && isLoading == false &&
          <Grid item xs={12}><div className={classes.ProductNotFound}>Sorry, we can't find your product</div></Grid>
        }
        {props.data.map((item, index) => {
          if(item.status === 1){
          return (
            <Grid item xs={6} md={4}>
              <span className={classes.ProductLink}>
                <img
                  className={classes.ProductImage}
                  src={imgURL.URL !== '' && imgURL.index === index ? imgURL.URL : item.img}
                  onClick={()=>{history.push(`/detailProduct/${item._id}`)}}
                />
                <div className={classes.Message}></div>
                <div className={classes.ProductDetailColorway}>
                  <div className={classes.ProductName}>
                    {item.name}
                  </div>
                  <div className={classes.ProductType}>
                    <div>{item.message}</div>
                    <div>{item.color} Colours</div>
                  </div>
                </div>
                <div className={classes.ProductColorway}>
                  {item.imgDetails.map(item1 => {
                    return (
                      <img
                        className={classes.ProductColorwayImage}
                        src={item1.imgs[0].img}
                        onMouseOver={()=>setImgURL({URL: item1.imgs[0].img, index})}
                        alt=''
                      />
                    )
                  })}
                </div>
                <div className={classes.Price}>{item.price.toLocaleString()} ₫</div>
              </span>
            </Grid>
          );
        }})}
      </Grid>
      }
    </div>
  );
}