import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import IProduct from "../interface/IProduct";
import Pagin from "../components/Pagin";
import { BsCartPlus } from "react-icons/bs";
import { fetchProduct } from "../api";

const CardForm = styled(Card)`
  border-radius: 5px;
  box-shadow: 0 10px 13px -7px rgba(49, 47, 47, 0.04),
    -2px 12px 10px 3px rgba(49, 47, 47, 0.04);

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in;
  }
`;

const RowForm = styled(Row)`
  display: grid;
  margin: 0 auto;
  grid-row-gap: 80px;

  @media (orientation: landscape) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 5rem;
  }
  @media (orientation: portrait) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
`;

const CartPlus = styled(BsCartPlus)`
  display: block;
  width: 24px;
  height: 24px;
  align-self: center;

  &:hover {
    color: red;
  }
`;

interface IHomeParams {
  pageNumber: string;
}

function Home() {
  const { isLoading, data } = useQuery<IProduct[]>("AllProduct", fetchProduct);
  const { pageNumber } = useParams<IHomeParams>();

  const handleCartPlus = () => {};

  return (
    <>
      <RowForm>
        {isLoading ? (
          <Spinner
            animation="grow"
            variant="success"
            style={{
              display: "block",
              margin: "0 auto",
              width: "auto",
              height: "auto",
            }}
          />
        ) : (
          data
            ?.slice(
              (+pageNumber - 1) * 6,
              +pageNumber * 6 > data.length ? data.length : +pageNumber * 6
            )
            .map((product) => (
              <Col key={product.id} style={{ height: "380px" }}>
                <Link
                  to={{
                    pathname: `/product/${product.id}`,
                    state: { product },
                  }}
                >
                  <CardForm>
                    <Card.Img
                      variant="top"
                      src={require(`../img/${product.image}`)}
                      loading="lazy"
                      style={{
                        height: "250px",
                        maxWidth: "100%",
                        borderRadius: "5px 5px 0 0",
                      }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          fontFamily: "NanumGarMaesGeur",
                          fontSize: "2em",
                        }}
                      >
                        {product.name}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <CartPlus onClick={handleCartPlus} />
                        <div
                          style={{
                            textAlign: "end",
                            margin: "10px 0",
                            fontFamily: "NanumGimYuICe",
                            fontSize: "1.5em",
                          }}
                        >
                          {product.price} 원
                        </div>
                      </div>
                      <Card.Text
                        style={{
                          height: "40px",
                          textAlign: "start",
                          overflow: "hidden",
                          fontFamily: "NanumGaRamYeonGgoc",
                          fontSize: "1.3em",
                        }}
                      >
                        {product.description.length > 50
                          ? product.description.slice(0, 50) + "..."
                          : product.description}
                      </Card.Text>
                    </Card.Body>
                  </CardForm>
                </Link>
              </Col>
            ))
        )}
      </RowForm>
      {isLoading ? (
        <Spinner
          animation="grow"
          variant="success"
          style={{
            display: "block",
            margin: "0 auto",
            width: "auto",
            height: "auto",
          }}
        />
      ) : (
        <Pagin
          pageCount={Math.ceil((data?.length ?? 1) / 6)}
          active={+pageNumber}
        />
      )}
    </>
  );
}

export default Home;
