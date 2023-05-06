import { Col, Container, Row, Form, Button, Card, Spinner } from "react-bootstrap";
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



const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [postcode, setPostcode] = useState("")
  const [country, setCountry] = useState("")
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  function handleEmailChange(event:ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value);
  }
  function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  function handleFullNameChange(event:ChangeEvent<HTMLInputElement>){
    setFullname(event.target.value)
  }
  function handleDobChange(event:ChangeEvent<HTMLInputElement>){
    setDob(event.target.value)
  }
  function handleAddressChange(event:ChangeEvent<HTMLInputElement>){
    setAddress(event.target.value)
  }
  function handlePostCodeChange(event:ChangeEvent<HTMLInputElement>){
    setPostcode(event.target.value)
  }
  function handlePhoneNumberChange(event:ChangeEvent<HTMLInputElement>){
    setPhonenumber(event.target.value)
  }
  function handleCountryChange(event: ChangeEvent<HTMLSelectElement>){
    setCountry(event.target.value)
  }
  async function handleRegister(event:SyntheticEvent){
    event.preventDefault();
    setLoading(true)
    const response = await fetchData({
      path: "student/register/",
      body: {email, password, fullname, dob, address, phonenumber, postcode, country}
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
        <Col className="d-none d-md-flex" md={3}>
          
        </Col>
        <LoginBox md={6} sm={12}>
          <Card className="p-3">
            <h3 className="text-center mb-4">Student Portal Registration</h3>
            <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={fullname} onChange={handleFullNameChange} placeholder="Enter fullname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" value={dob} onChange={handleDobChange} placeholder="Enter date of birth" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address} onChange={handleAddressChange} placeholder="Enter address" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={phonenumber} onChange={handlePhoneNumberChange} placeholder="Enter phone number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPostCode">
                <Form.Label>PostCode</Form.Label>
                <Form.Control type="text" value={postcode} onChange={handlePostCodeChange} placeholder="Enter postcode" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select value={country} onChange={handleCountryChange}>
                <option>{"Select"}</option>
                  <option value={"UK"}>{"UK"}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRememberMe">
                <Form.Check type="checkbox" label="I acknowledge above data is correct" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="SubmitBtn">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading? <Spinner animation="border" size="sm" />: "Register"}
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
export default Register;
