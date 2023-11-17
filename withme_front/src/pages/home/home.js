import './home.css';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import { BsInfoCircleFill } from 'react-icons/bs'; 
import Navi from '../navbar/nav';

const Home = () => {
  return (
    <>
      <Navi />
      <Container>
      <h1 className='logo mb-3'>With Me</h1>
      <InputGroup className="inputBox">
        <Form.Control
          placeholder="소환사명을 입력해 주세요"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="searchBtn">
          Button
        </Button>
      </InputGroup>
      <small className="body-secondary"><BsInfoCircleFill/> 한글 이름의 경우 띄어쓰기를 꼭 해주세요!</small>
      </Container>
    </>
  );
}

export default Home;
