import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { InflowsContext } from "../components/Context/context";

class UserProfile extends React.Component {
  static contextType = InflowsContext;
  handleInputChange() {}
  formatName(name) {
    return name
      ? this.context.user.name.split(" ")[0]
      : this.context.user.name.split(" ")[1];
  }
  render() {
    const { user, loading } = this.context;
    const admin = user.admin ? user.admin : false;
    return (
      <>
        {!loading && (
          <div className="content">
            <Row>
              <Col md="8">
                <Card>
                  <CardHeader>
                    <h5 className="title">Edit Profile</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="2">
                          <FormGroup>
                            <label>Account Type</label>
                            <Input
                              disabled={true}
                              value={admin ? "admin" : "view-only"}
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Company</label>
                            <Input
                              defaultValue="Eswatini Electricity Company"
                              placeholder="Company"
                              type="text"
                              disabled={true}
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="3">
                          <FormGroup>
                            <label>Username</label>
                            <Input
                              placeholder="Username"
                              type="text"
                              onChange={this.handleInputChange}
                              disabled={true}
                              value={user.name}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input
                              placeholder="mike@email.com"
                              type="email"
                              disabled={true}
                              value={user.email}
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              placeholder="First Name"
                              disabled={true}
                              type="text"
                              onChange={this.handleInputChange}
                              value={this.formatName(true)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              placeholder="Last Name"
                              disabled={true}
                              type="text"
                              onChange={this.handleInputChange}
                              value={this.formatName(false)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue="Mbabane, Eswatini"
                              placeholder="Home Address"
                              disabled={true}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label>City</label>
                            <Input
                              defaultValue="Mbabane"
                              placeholder="City"
                              disabled={true}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <label>Country</label>
                            <Input
                              defaultValue="Eswatini"
                              placeholder="Country"
                              disabled={true}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>Postal Code</label>

                            <Input
                              placeholder="ZIP Code"
                              type="number"
                              disabled={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      disabled={true}
                    >
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar"
                          // src={require("assets/img/emilyz.jpg")}
                        />
                        <h5 className="title">{user.name}</h5>
                      </a>
                      <p className="description">Electrical Engineer</p>
                    </div>
                    <div className="card-description">
                      Do not be scared of the truth because we need to restart
                      the human foundation in truth And I love you like Kanye
                      loves Kanye I love Rick Owens’ bed design but the back
                      is...
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button className="btn-icon btn-round" color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}

export default UserProfile;
