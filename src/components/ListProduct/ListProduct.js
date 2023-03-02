import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Grid, Hidden } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionType from "./module/constant/constant"
import * as action from "./module/action/action"
import API from '../../Axios/API';
import ListProductButtonMobile from './ListProductComponent/ListProductButtonMobile';
import ListProductMain from './ListProductComponent/ListProductMain';

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 44,
        marginBottom: 44,
        padding: "0 20px"
    }
}))

const ListProduct = () => {
    const classes = useStyles()
    const [HideFilter, setHideFilter] = useState(false)
    const [SortBy, setSortBy] = useState(false)
    const gender = useSelector(state => state.reducerURL.gender)
    const typeProduct = useSelector(state => state.reducerURL.typeProduct)
    const GenderAndTypeProduct = {
        "gender": gender,
        "typeProduct": typeProduct
    }
    const dispatch = useDispatch()
    const data = useSelector(state => state.reducerURL.data)
    const dataSearchList = useSelector(state => state.reducerURL.dataSearchList)
    const dataSearchInput = useSelector(state => state.reducerURL.dataSearchInput)



    React.useEffect(() => {
        const callAPI = async () => {
            try {
                if (gender === 'search' && typeProduct == ' search') {
                    const res = await API(`product`, "GET")
                    const dataAll = res.data
                    const dataSearch = dataAll.filter((item, index) => {
                        return item.name.toLowerCase().indexOf(dataSearchInput.toLowerCase()) > -1
                    })
                    dispatch(action.createAction({ type: ActionType.FETCH_API_LIST_PRODUCT, payload: dataSearch }))
                } else {
                    dispatch(action.createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: true }))
                    const res = await API(`product/?gender=${gender}&typeProduct=${typeProduct}`, "GET")
                    dispatch(action.createAction({ type: ActionType.FETCH_API_LIST_PRODUCT, payload: res.data }))
                    dispatch(action.createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: false }))
                }
                localStorage.setItem("GenderAndTypeProduct", JSON.stringify(GenderAndTypeProduct))
            } catch (error) {
                console.log({ ...error });
            }
            return () => {
                dispatch(action.createAction({ type: ActionType.CHANGE_GENDER_TYPEPRODUCT, payload: { gender: null, typeProduct: null } }))
            }
        }
        callAPI()
    }, [gender, typeProduct, dataSearchList])

    // call data tu redux
    const filterColor = useSelector(state => state.reducerURL.filterColor)
    const filterSize = useSelector(state => state.reducerURL.filterSize)
    const filterSort = useSelector(state => state.reducerURL.dataSort)
    const dataFilter = useSelector(state => state.reducerURL.dataFilter)
    const sortByTitle = useSelector(state => state.reducerURL.sortByTitle)
    // / hàm handle filter 
    const handleFilter = (filter) => {
        // tạo lại mảng data ban đầu đã được sort by để filter
        var SortData = []
        for (let i = 0; i < dataSort.length; i++) {
            SortData.push(dataSort[i])
        }

        // const filterColorArray = filterColor;
        // const filterSizeArray = filterSize;
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: dataSort }))
        //nếu bấm vô multi color thì reset
        if (filter === '') {
            dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: data }))
        }
        else {
            if (SortData) {
                //chạy for filter color
                if (filterColor.length > 0) {
                    for (let i = 0; i < filterColor.length; i++) {
                        var colors = SortData.filter((item, index) => {
                            // return item.imgDetails[0].color == filterColor[i] || item.imgDetails[1]?.color == filterColor[i] || item.imgDetails[2]?.color == filterColor[i]
                            // chạy for số lần = số phối màu của giày
                            for (let j = 0; j < item.imgDetails.length; j++) {
                                //tách chuỗi rồi so sánh với filterColor 
                                const colorSplit = item.imgDetails[j].color.split('/');
                                for (let n = 0; n < colorSplit.length; n++) {
                                    if (colorSplit[n] === filterColor[i]) {
                                        return item
                                    }
                                }
                                // if(item.imgDetails[j].color == filterColor[i]){
                                //     return item
                                // }     
                            }
                        })
                        SortData = colors;
                        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: colors }))
                    }
                }
                //chạy for filter size
                if (filterSize.length > 0) {
                    for (let m = 0; m < filterSize.length; m++) {
                        var sizes = SortData.filter((item, index) => {
                            for (let j = 0; j < item.sizes.length; j++) {
                                if (item.sizes[j].size === filterSize[m]) {
                                    return item
                                }
                            }
                        })
                        SortData = sizes;
                        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: sizes }))
                    }
                }
            }
        }
    }
    const handleSortLowHigh = () => {
        //sort by dataSort
        const DataSort = [];
        for (let i = 0; i < dataSort.length; i++) {
            DataSort.push(dataSort[i])
        }
        DataSort.sort((a, b) => a.price > b.price ? 1 : -1)

        //sort by dataFilter
        const DataSortFilter = [];
        for (let i = 0; i < dataFilter.length; i++) {
            DataSortFilter.push(dataFilter[i])
        }
        DataSortFilter.sort((a, b) => a.price > b.price ? 1 : -1)

        dispatch(action.createAction({ type: ActionType.SORT_DATA, payload: DataSort }))
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: DataSortFilter }))
        dispatch(action.createAction({ type: ActionType.SORT_BY_TITLE, payload: 'Price: Low-High' }))
    }

    const handleSortHighLow = () => {
        //sort by dataSort
        const DataSort = [];
        for (let i = 0; i < dataSort.length; i++) {
            DataSort.push(dataSort[i])
        }
        DataSort.sort((a, b) => a.price < b.price ? 1 : -1)

        //sort by dataFilter
        const DataSortFilter = [];
        for (let i = 0; i < dataFilter.length; i++) {
            DataSortFilter.push(dataFilter[i])
        }
        DataSortFilter.sort((a, b) => a.price < b.price ? 1 : -1)

        dispatch(action.createAction({ type: ActionType.SORT_DATA, payload: DataSort }))
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: DataSortFilter }))
        dispatch(action.createAction({ type: ActionType.SORT_BY_TITLE, payload: 'Price: High-Low' }))
    }

    const handleNewest = () => {
        //sort by dataSort
        const DataSort = [];
        for (let i = dataSort.length - 1; i >= 0; i--) {
            DataSort.push(dataSort[i])
        }

        //sort by dataFilter
        const DataSortFilter = [];
        for (let i = dataFilter.length - 1; i >= 0; i--) {
            DataSortFilter.push(dataFilter[i])
        }

        dispatch(action.createAction({ type: ActionType.SORT_DATA, payload: DataSort }))
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: DataSortFilter }))
        dispatch(action.createAction({ type: ActionType.SORT_BY_TITLE, payload: 'Newest' }))
    }

    const handleFeatured = () => {
        dispatch(action.createAction({ type: ActionType.SORT_DATA, payload: data }))
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR_DATA, payload: data }))
        dispatch(action.createAction({ type: ActionType.FILTER_COLOR, payload: { filterColor: [] } }));
        dispatch(action.createAction({ type: ActionType.FILTER_SIZE, payload: { filterSize: [] } }));
        dispatch(action.createAction({ type: ActionType.SORT_BY_TITLE, payload: '' }))
    }

    // hàm viết hoa chữ cái đầu
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className={classes.container}>
            <AppBar position="sticky" className={classes.Head}>
                {gender == 'search' && typeProduct == 'search' ?
                    <div className={classes.SearchName}>
                        {dataSearchInput} ({dataSort.length})
                    </div>
                    :
                    <div className={classes.SearchName}>
                        {capitalizeFirstLetter(gender)}'s {capitalizeFirstLetter(typeProduct)} {dataFilter.length > 0 && <span>({dataFilter.length})</span>}
                    </div>
                }
                {/*Filter button*/}
                <Hidden smDown>
                    <div className={classes.FilterButton}>
                        <button className={classes.HideFilter} onClick={() => setHideFilter(!HideFilter)}>
                            {HideFilter && <span>Show Filter</span>}
                            {!HideFilter && <span>Hide Filter</span>}
                            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/filter-1739026-1477153.png" className={classes.IconFilter} alt='' />
                        </button>
                        <div className={classes.SortByContainer}>
                            <button className={classes.SortBy} onClick={() => setSortBy(!SortBy)}>
                                Sort By{sortByTitle !== '' && <span style={{ color: '#757575' }}>: {sortByTitle}</span>}
                                {SortBy && <ExpandLessIcon />}
                                {!SortBy && <ExpandMoreIcon />}
                            </button>
                            {SortBy &&
                                <div className={classes.SortByItemContainer}>
                                    <div className={classes.SortByItem}><a href="#" className={classes.SortByLink} onClick={() => handleFeatured()}>Featured</a></div>
                                    <div className={classes.SortByItem}><a href="#" className={classes.SortByLink} onClick={() => handleNewest()}>Newest</a></div>
                                    <div className={classes.SortByItem}><a href="#" className={classes.SortByLink} onClick={() => handleSortHighLow()}>Price: High-Low</a></div>
                                    <div className={classes.SortByItem}><a href="#" className={classes.SortByLink} onClick={() => handleSortLowHigh()}>Price: Low-High</a></div>
                                </div>
                            }
                        </div>
                    </div>
                </Hidden>

                {/*Filter button mobile*/}
                <Hidden mdUp>
                    <ListProductButtonMobile
                        handleFilter={handleFilter}
                        handleFeatured={handleFeatured}
                        handleNewest={handleNewest}
                        handleSortLowHigh={handleSortLowHigh}
                        handleSortHighLow={handleSortHighLow}
                    />
                </Hidden>
            </AppBar>

            <div className={classes.ListProductContainer}>
                <Grid container spacing={2}>
                    {/*Filter */}
                    <Hidden smDown>
                        {!HideFilter &&
                            <ListProductFilter handleFilter={handleFilter} />
                        }
                    </Hidden>

                    {/*List Product*/}
                    {!HideFilter &&
                        <Grid item sm={12} md={10}>
                            <ListProductMain data={dataFilter} />
                        </Grid>
                    }
                    {HideFilter &&
                        <Grid item xs={12}>
                            <ListProductMain data={dataFilter} />
                        </Grid>
                    }
                </Grid>
            </div>
        </div>
    );
}

export default ListProduct