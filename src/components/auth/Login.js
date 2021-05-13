import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import './Auth.css';

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = () => {
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"))
      ;
  };
  const onKeyDown = () => {
    loginSubmit()
  }

  return (
    <section className="authPage">
      <div className="authContainer">
        <div>
          <Card className="authForm">
            <CardBody>
              <h3 className="authTitle">Login to FITC</h3>
              <Form onSubmit={(e) => {
                e.preventDefault()
                loginSubmit()
              }}>
                <fieldset>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => {
                        e.preventDefault()
                        setEmail(e.target.value)
                      }}
                      onKeyDown={(e) => e.keyCode === 13 ? onKeyDown() : null}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.keyCode === 13 ? onKeyDown() : null}
                    />
                  </FormGroup>
                  <FormGroup className="authBtnContainer">
                    <Button className="authBtn">Login</Button>
                  </FormGroup>
                  <div className="authSwitchContainer">
                    <em className="authSwitchLink">
                      Not registered? <Link to="register">Create an Account</Link>
                    </em>
                  </div>
                </fieldset>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
