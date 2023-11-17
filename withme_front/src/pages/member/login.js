import { Container, Col } from "react-bootstrap";
import Navi from "../navbar/nav";
import { Input } from "reactstrap";

const Login = () => {
  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <h1>With Me 로그인</h1>
        <Col lg={8} mb-3>
          <label for="username">email</label>
          <br></br>
          <Input id="username" />
        </Col>
        <Col lg={8} mb-3>
          <label for="password">Password</label>
          <br></br>
          <Input id="password" />
        </Col>
      </Container>
    </>
  );
};

export default Login;
