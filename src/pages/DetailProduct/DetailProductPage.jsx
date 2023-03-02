import React from "react";
import { Container, CssBaseline } from "@mui/material";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useParams } from "react-router-dom";

const DetailProductPage = () => {
  const {id} = useParams()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <ProductDetail id = {id}/>
      </Container>
    </React.Fragment>
  );
};

export default DetailProductPage;
