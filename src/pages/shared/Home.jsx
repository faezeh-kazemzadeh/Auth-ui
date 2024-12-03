import { Container, Card, Button ,Spinner} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
const Home = () => {
  const {currentUser} = useSelector(state=>state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card w-75">
          <Card.Body>
            <Card.Title as="h2">Mern Authentication</Card.Title>
            <Card.Text className="text-center mb-4">
              This is a biolerplate for MERN Authentication that stores a JwT in
              an HTTP-Only Cookie. it also uses Redux Toolkit and React Bootstrap
              library
            </Card.Text>
          </Card.Body>
          <div className="d-flex">
            <LinkContainer to="/signin">
              <Button variant="primary" className="me-3" disabled={currentUser}>
               Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button variant="secondary" className="me-3" disabled={currentUser}>
                Sign Up
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
