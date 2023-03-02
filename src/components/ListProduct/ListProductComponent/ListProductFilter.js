import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import {connect} from "react-redux";
import {useSelector, useDispatch} from "react-redux";
import * as ActionType from "../module/Constants/contants"
import * as action from "../module/Actions/action"
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    Filter:{
        backgroundColor: 'white',
        float: 'left',
        width: 190,
        fontSize: 16,
    },
    FilterTop:{
        paddingBottom: 40
    },
    FilterItem:{
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            color: '#757575',
        }, 
        fontSize: 16,
    },
    FilterGroup:{
        paddingBottom: 20,
        borderTop: '1px solid #e5e5e5',
    },
    FilterName:{
        padding: '12px 0',
        cursor: 'pointer',
        color: 'black',
    },
    FilterIcon:{
        float: 'right',
    },
    FilterCheckboxContainer:{
        paddingLeft: 5,
    },
    FilterCheckboxLabel:{
        "&:hover": {
            color: '#757575',
        }, 
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
        "&:hover": {
            color: '#757575',
        },
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

function ListProductFilter(props) {
    const classes = useStyles();
    
    const [Gender, setGender] = useState(true);
    const [Colour, setColour] = useState(true);
    const [Brand, setBrand] = useState(true);
    const [Sports, setSports] = useState(true);
    const [Athletes, setAthletes] = useState(true);
    const [BestFor, setBestFor] = useState(true);
    const [Collaborator, setCollaborator] = useState(true);

    const dispatch = useDispatch();

    //call data từ store
    const filterColor = useSelector(state => state.reducerURL.filterColor);
    const filterSize = useSelector(state => state.reducerURL.filterSize);
    const data = useSelector(state => state.reducerURL.data);
    const isLoading = useSelector(state => state.reducerURL.isLoading);
    
    //handle array color
    const clickFilterColor = (filter) => {
        if(filter !== ''){
            if (filterColor.indexOf(filter) > -1) {
                filterColor.splice(filterColor.indexOf(filter),1);
                dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: filterColor} }));
            } else {
                filterColor.push(filter);
                
                dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: filterColor} }));
            }
        }
        else{
            dispatch(action.createAction({type: ActionType.FILTER_COLOR,payload: {filterColor: []} }));
            dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: []} }));
        }
    }

    //handle array size
    const clickFilterSize = (filter) => {
        if (filterSize.indexOf(filter) > -1) {
            filterSize.splice(filterSize.indexOf(filter),1);
            dispatch(action.createAction({type: ActionType.FILTER_SIZE,payload: {filterSize: filterSize} }));
        } else {
            filterSize.push(filter);
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
        <Grid item xs={4}>
            {filterSize.indexOf(item)===-1 ? <div className={classes.size} onClick={()=>{clickFilterSize(item); props.handleFilter(item)}}>{item}</div> 
            : <div className={classes.size} style={{border:'1px black solid'}} onClick={()=>{clickFilterSize(item); props.handleFilter(item)}}>{item}</div>}
        </Grid>
    );
    var listSizeLazyLoad = [];
    for (let i = 0; i < 15; i++) {
        listSizeLazyLoad.push(
            <Grid item xs={4}>
                <Skeleton><div className={classes.size}>40</div></Skeleton>
            </Grid>
        )
    }
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
        <Grid item xs={4} className={classes.ColorContainer}
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
    var listColorLazyLoad = [];
    for (let i = 0; i < 12; i++) {
        listColorLazyLoad.push(
            <Grid item xs={4} className={classes.ColorContainer}>
                <Skeleton><div className={classes.Color} style={{backgroundColor:'white', color: 'black', border:'1px #CCCCCC solid'}}>&#10003;</div></Skeleton>
                <Skeleton><div className={classes.ColorName}>black</div></Skeleton>
            </Grid>
        )
    }



    return (
        <Grid item md={2}>
            <div className={classes.Filter}>
                <div className={classes.FilterTop}><a href="#a" className={classes.FilterItem}>Shoes</a></div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setGender(!Gender)}>
                        Gender
                        {Gender && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Gender && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Gender &&
                        <div className={classes.FilterCheckboxContainer}>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Men" className={classes.FilterCheckboxLabel}/></div>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Women" className={classes.FilterCheckboxLabel}/></div>
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setColour(!Colour)}>
                        Colour {filterColor.length > 0 && <span>({filterColor.length})</span>}
                        {Colour && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Colour && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Colour &&
                        <div>
                        {isLoading ?
                            <Grid container spacing={2}>
                                {listColorLazyLoad}
                            </Grid>
                        :
                            <Grid container spacing={2}>
                                <Grid item xs={4} className={classes.ColorContainer}
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
                        }
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setBrand(!Brand)}>
                        Size {filterSize.length > 0 && <span>({filterSize.length})</span>}
                        {Brand && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Brand && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Brand &&
                        <div>
                        {isLoading ? 
                            <Grid container spacing={1}>
                                {listSizeLazyLoad}
                            </Grid>
                            :
                            <Grid container spacing={1}>
                                {listSize}
                            </Grid>
                        }
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setSports(!Sports)}>
                        Sports
                        {Sports && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Sports && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Sports &&
                        <div className={classes.FilterCheckboxContainer}>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Lifestyle" className={classes.FilterCheckboxLabel}/></div>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Basketball" className={classes.FilterCheckboxLabel}/></div>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Dance" className={classes.FilterCheckboxLabel}/></div>
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setAthletes(!Athletes)}>
                        Athletes
                        {Athletes && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Athletes && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Athletes &&
                        <div className={classes.FilterCheckboxContainer}>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Kylian Mbappé" className={classes.FilterCheckboxLabel}/></div>
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setBestFor(!BestFor)}>
                        Best For
                        {BestFor && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!BestFor && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {BestFor &&
                        <div className={classes.FilterCheckboxContainer}>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Wet Weather Conditions" className={classes.FilterCheckboxLabel}/></div>
                        </div>
                    }
                </div>
                <div className={classes.FilterGroup}>
                    <div className={classes.FilterName} onClick={()=>setCollaborator(!Collaborator)}>
                        Collaborator
                        {Collaborator && <ExpandLessIcon className={classes.FilterIcon} />}
                        {!Collaborator && <ExpandMoreIcon className={classes.FilterIcon}/>}
                    </div>
                    {Collaborator &&
                        <div className={classes.FilterCheckboxContainer}>
                            <div><FormControlLabel control={<BlackCheckbox />} label="Pendleton" className={classes.FilterCheckboxLabel}/></div>
                        </div>
                    }
                </div>
            </div>
        </Grid>
    )
}
export default connect()(ListProductFilter)