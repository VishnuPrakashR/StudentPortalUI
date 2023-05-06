import { Col, Container, Row, Form, Button, Card, Spinner } from "react-bootstrap";
import loginimg from "../assets/images/login.svg";
import styled from "styled-components";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { fetchData, setToken } from "../api";
import { useNavigate } from "react-router-dom";

const LoginBox = styled(Col)`
  padding: 3em;
  min-width: 15rem;
`;
const Heading = styled(Col)`
padding: 3em
margin-bottom: 5em`;



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  function handleEmailChange(event:ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value);
  }
  function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  async function handleLogin(event:SyntheticEvent){
    event.preventDefault();
    setLoading(true)
    const response = await fetchData({
      path: "user/student/login",
      body: {email, password}
    })
    const data = response.data
    if(data.Response==='Success'){
      setToken('accessToken',data.AccessToken);
      setToken('refreshToken',data.RefreshToken);
      navigate("/dashboard");
    }
    else{
      console.log(data.Msg);
    }
    setLoading(false)
  }
  return (
    <Container fluid>
      <Row>
        <Heading md={12}>
          <h2>LEEDS BECKETT UNIVERSITY</h2>
        </Heading>
      </Row>
      <Row>
        <Col className="d-none d-md-flex" md={8}>
          <img src={loginimg} alt="login" />
        </Col>
        <LoginBox md={4} sm={12}>
          <Card className="p-3">
            <h3 className="text-center mb-4">Student Portal</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRememberMe">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="SubmitBtn">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading? <Spinner animation="border" size="sm" />: "Login"}
                </Button> 
              </Form.Group>
              <Form.Group className="mb-3" controlId="RegisterBtn">
                <Button variant="success" type="button" href="/register">
                  {"Register"}
                </Button>
              </Form.Group>
              <Form.Text className="text-muted text-small">
                &copy; 2022-23 | Vishnu Prakash
              </Form.Text>
            </Form>
          </Card>
        </LoginBox>
      </Row>
    </Container>
  );
};
export default Login;
