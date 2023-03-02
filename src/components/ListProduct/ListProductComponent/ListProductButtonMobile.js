import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import CancelIcon from '@material-ui/icons/Cancel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {connect} from "react-redux";
import {useSelector, useDispatch} from "react-redux";
import * as ActionType from "../module/Constants/contants"
import * as action from "../module/Actions/action"


const useStyles = makeStyles((theme) => ({
    FilterButton:{
        float: 'right',
        display: 'flex',
        alignItems: 'center',
    },
    HideFilter:{
        fontSize: 16,
        paddingRight: 25,
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
    },
    FilterMobileDrawer:{
        height: '100%',
        padding: '0 20px',
        fontSize: 16,
    },
    Title: {
        padding: '36px 0 20px',
        fontSize: 24,
    },
    CancelIcon: {
        float: 'right',
        width: 32,
        height: 32,
    },
    SortBy:{
        fontSize: 16,
        padding: '8px 0 16px',
    },
    FilterGroup:{
        marginTop: 22,
        borderTop: '1px solid #e5e5e5',
    },
    FilterName:{
        padding: '12px 0',
    },
    FilterCheckboxContainer:{
        paddingLeft: 5,
    },
    FilterCheckbox:{
        margin: '10px 0',
    },
    Color:{
        width: 28,
        height: 28,
        borderRadius: '50%',
        paddingTop: 3,
        color: 'white',
        fontWeight: 'bold'
    },
    ColorContainer:{
        cursor: 'pointer',
    },
    ColorName:{
        marginTop: 5,
        fontSize: 12,
    },
    ClearApplyContainer:{
        margin: '16px 0',
    },
    FilterMobileDrawerClear:{
        fontSize: 16,
        padding: '15px 16px',
        width: '100%',
        borderRadius: 32,
        outline: 'none',
        border: 'none',
    },
    FilterMobileDrawerApply:{
        fontSize: 16,
        padding: '15px 16px',
        width: '100%',
        borderRadius: 32,
        outline: 'none',
        border: 'none',
        background: 'black',
        color: 'white',
    },
    size:{
        padding: "5px 10px",
        textAlign: 'center',
        border: '1px #CCCCCC solid',
        borderRadius: 5,
        cursor: 'pointer',
    },
}));

const BlackCheckbox = withStyles({
    root: {
        width: 30,
        height: 30,
        color: '#cccccc',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlackRadio = withStyles({
    root: {
        width: 30,
        height: 30,
        color: '#cccccc',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


function ListProductButtonMobile(props) {
    const classes = useStyles();

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [HideFilterMobile, setHideFilterMobile] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector(state => state.reducerURL.data);

    //call data từ store
    const filterColor = useSelector(state => state.reducerURL.filterColor);
    const filterSize = useSelector(state => state.reducerURL.filterSize);

    //handle array color
    const clickFilterColor = (dataFilter) => {
        if(dataFilter !== ''){
            if (filterColor.indexOf(dataFilter) > -1) {
                filterColor.splice(filterColor.indexOf(dataFilter),1);
                dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: filterColor} }));
            } else {
                filterColor.push(dataFilter);
                
                dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: filterColor} }));
            }
        }
        else{
            dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: []} }));
            dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: []} }));
        }
    }

    //handle array size
    const clickFilterSize = (dataFilter) => {
        if (filterSize.indexOf(dataFilter) > -1) {
            filterSize.splice(filterSize.indexOf(dataFilter),1);
            dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: filterSize} }));
        } else {
            filterSize.push(dataFilter);
            dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: filterSize} }));
        }
    }

    //collect size
    var mySize = new Set()
    var Size = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].sizes.length; j++) {
            mySize.add(data[i].sizes[j].size)
        }
    }
    for(let item of mySize){
        Size.push(item)
    }
    const listSize = Size.map((item) =>
        <Grid item xs={3} sm={1}>
            {filterSize.indexOf(item)===-1 ? <div className={classes.size} onClick={()=>{clickFilterSize(item); props.handleFilter(item)}}>{item}</div> 
            : <div className={classes.size} style={{border:'1px black solid'}} onClick={()=>{clickFilterSize(item); props.handleFilter(item)}}>{item}</div>}
        </Grid>
    );


    //collect color
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var myColor = new Set()
    var Color = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].imgDetails.length; j++) {
            const colorSplit = data[i].imgDetails[j].color.split('/');
            for (let n = 0; n < colorSplit.length; n++) {
                myColor.add(colorSplit[n]);
            }
        }
    }
    for(let item of myColor){
        Color.push(item)
    }
    const listColor = Color.map((item)=>
        <Grid item xs={4} sm={2} className={classes.ColorContainer}
            onClick={()=>{clickFilterColor(item); props.handleFilter(item) } }
        >
            {item === 'white' ?
                <center>
                    {filterColor.indexOf(item)===-1 ? <div className={classes.Color} style={{backgroundColor:item, border:'1px #CCCCCC solid'}}></div> 
                    : <div className={classes.Color} style={{backgroundColor:item, color: 'black', border:'1px #CCCCCC solid'}}>&#10003;</div>}
                    <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
                </center>
            :
                <center>
                    {filterColor.indexOf(item)===-1 ? <div className={classes.Color} style={{backgroundColor:item}}></div> 
                    : <div className={classes.Color} style={{backgroundColor:item}}>&#10003;</div>}
                    <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
                </center>
            }
        </Grid>
    );


    // handle nút clear 
    const handleClearButton = () => {
        dispatch(action.createAction({type: ActionType.SORT_DATA, payload: data}))
        dispatch(action.createAction({type: ActionType.FILTER_COLOR_DATA, payload: data}))
        dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: []} }));
        dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: []} }));
        dispatch(action.createAction({type: ActionType.SORT_BY_TITLE, payload: ''}))
    }

    return (
        <span>
            <div className={classes.FilterButton}>
                <button className={classes.HideFilter} onClick={()=>setHideFilterMobile(!HideFilterMobile)}>
                    <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/filter-1739026-1477153.png" width="25" height="25" alt=""/>
                </button>
            </div>
            <Drawer
                container={container}
                variant="temporary"
                anchor="top"
                open={HideFilterMobile}
                onClose={()=>setHideFilterMobile(!HideFilterMobile)}
                classes={{
                    paper: classes.FilterMobileDrawer,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className={classes.Title}>
                    Filter 
                    <CancelIcon className={classes.CancelIcon} onClick={()=>setHideFilterMobile(!HideFilterMobile)}/>
                </div>
                <div className={classes.SortBy}>Sort By</div>
                <div>
                    <div className={classes.FilterCheckboxContainer}>
                        <RadioGroup defaultValue="featured">
                            <FormControlLabel control={<BlackRadio />} label="Featured" value="featured" className={classes.FilterCheckboxLabel} onChange={()=>{props.handleFeatured()}}/>
                            <FormControlLabel control={<BlackRadio />} label="Newest" value="newest" className={classes.FilterCheckboxLabel} onChange={()=>props.handleNewest()}/>
                            <FormControlLabel control={<BlackRadio />} label="Price: High-Low" value="highlow" className={classes.FilterCheckboxLabel} onChange={ ()=>{props.handleSortHighLow()}}/>
                            <FormControlLabel control={<BlackRadio />} label="Price: Low-High" value="lowhigh" className={classes.FilterCheckboxLabel} onChange={ ()=>{props.handleSortLowHigh()}}/>
                        </RadioGroup>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Gender
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Men" className={classes.FilterCheckboxLabel}/></div>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Women" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Kid's
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Boys'" className={classes.FilterCheckboxLabel}/></div>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Girls'" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Colour {filterColor.length > 0 && <span>({filterColor.length})</span>}
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={2} className={classes.ColorContainer}
                            onClick={()=>{clickFilterColor(''); props.handleFilter('') } }
                        >
                            <center>
                                {filterColor !=='' ? <div className={classes.Color} style={{backgroundColor:'black'}}></div> 
                                : <div className={classes.Color} style={{backgroundColor:'black'}}>&#10003;</div>}
                                <div className={classes.ColorName}>Multi-Colour</div>
                            </center>
                        </Grid>
                        {listColor}
                    </Grid>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Size {filterSize.length > 0 && <span>({filterSize.length})</span>}
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <Grid container spacing={1}>
                            {listSize}
                        </Grid>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Sports
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Life Style" className={classes.FilterCheckboxLabel}/></div>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Basketball" className={classes.FilterCheckboxLabel}/></div>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Dance" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Athletes
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Kylian Mbappé" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Best For
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Wet Weather Conditions" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName}>
                        Collaborator
                    </div>
                    <div className={classes.FilterCheckboxContainer}>
                        <div className={classes.FilterCheckbox}><FormControlLabel control={<BlackCheckbox />} label="Pendleton" className={classes.FilterCheckboxLabel}/></div>
                    </div>
                </div>
                <Grid container spacing={3} className={classes.ClearApplyContainer}>
                    <Grid item xs={6}>
                        <button className={classes.FilterMobileDrawerClear} onClick={()=>handleClearButton()}>Clear</button>
                    </Grid>
                    <Grid item xs={6}>
                        <button className={classes.FilterMobileDrawerApply} onClick={()=>setHideFilterMobile(!HideFilterMobile)}>Apply</button>
                    </Grid>
                </Grid>
            </Drawer>
        </span>
    )
}
export default connect()(ListProductButtonMobile)