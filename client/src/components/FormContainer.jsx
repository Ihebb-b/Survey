import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-20">
        <Col
          xs={12}
          md={6}
          className="p-5 bg-white/60 backdrop-blur-sm shadow-xl rounded-lg"
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
