import React from "react";
import {
  Jumbotron,
  Button,
  Spinner,
  Figure,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import beer from "./assets/beerfill.gif";
import { Link } from "react-router-dom";

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.getRandomBeer = this.getRandomBeer.bind(this);
    this.id =
      props.match.params.id.search(":") !== -1
        ? props.match.params.id.split(":")[1]
        : props.match.params.id;
    window.sessionStorage.setItem("beerId", this.id);
    this.url = `http://api.brewerydb.com/v2/beers/?key=a5c1b917e7ba62dcd79f434ed73bc72d&ids=${this.id}&withBreweries=Y`;
    this.cors_api_url = "https://cors-anywhere.herokuapp.com/";
    this.imagefail =
      "https://touch.daft.ie/static/images/fallbacks/no-image-size740x480.jpg";
  }

  getRandomBeer() {
    this.setState({
      isLoaded: false
    });
    var x = new XMLHttpRequest();
    x.open("GET", this.cors_api_url + this.url);
    x.onload = x.onerror = () => {
      this.setState({
        isLoaded: true,
        items: JSON.parse(x.responseText).data[0]
      });
    };
    if (/^POST/i.test("GET")) {
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    x.send("");
  }

  componentDidMount() {
    this.getRandomBeer();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <Jumbotron>
        <div class="labelBeer"> More about 🍺 </div>
        {error ? (
          <div>Error: {error.message}</div>
        ) : !isLoaded ? (
          <Spinner animation="border" role="status" variant="warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <Row>
              <Col>
                <Link to={"/home"}>Back</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    width: "auto",
                    backgroundColor: "#ffc107",
                    display: "inline-block",
                    margin: "10px",
                    padding: "20px"
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={items.labels ? items.labels.medium : this.imagefail}
                  />
                  <Card.Body>
                    <Card.Title>{items.name}</Card.Title>
                    <Card.Text>
                      <div>
                        <div class="titleText">Description:</div>{" "}
                        {items.style.description}
                      </div>
                      <div>
                        <div class="titleText">Status:</div> {items.status}
                      </div>
                      <div>
                        <div class="titleText">Category:</div>{" "}
                        {items.style.category.name}
                      </div>
                      <div>
                        <div class="titleText">Is Organic:</div>{" "}
                        {items.isOrganic == "N" ? "No" : "Yes"}
                      </div>
                      {items.breweries.map((ele) => {
                        return (
                          <div>
                            <div>
                              <div class="titleText">Brewery Name:</div>{" "}
                              {ele.name}
                            </div>
                            <div>
                              <div class="titleText">Established:</div>{" "}
                              {ele.established}
                            </div>
                            <div>
                              <div class="titleText">Website:</div>{" "}
                              <a href={`${ele.website}`}>{ele.website}</a>
                            </div>
                            <div>
                              <div class="titleText">Brewery Status:</div>{" "}
                              {ele.status}
                            </div>
                          </div>
                        );
                      })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Jumbotron>
    );
  }
}

export default DetailScreen;
