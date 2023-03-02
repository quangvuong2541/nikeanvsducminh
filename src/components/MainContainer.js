import React from 'react'
import Body from './Body/Body'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function MainContainer(props) {
  // const a = this.props.carouselImg
  // state  full
  /** trong stateless thì không được phép có 
   * con trỏ this
   */
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Body 
            carouselImg={props.carouselImg}
            titleTrending={props.titleTrending}
            dataTrending={props.dataTrending}
            titleMoreNike={props.titleMoreNike}
            dataMoreNike={props.dataMoreNike}
            merchMenu={props.merchMenu}
        />
      </Container>
    </React.Fragment>
  )
}
