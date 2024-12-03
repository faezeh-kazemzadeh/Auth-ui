import { useState, useEffect } from "react";
import { FormContainer } from "../../Layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Form as BootstrapForm,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Row,
  Col,
  Alert,
  Spinner,
  Container
} from "react-bootstrap";
import { Formik, Field,ErrorMessage } from "formik";

import { signIn } from "../../Redux/slices/auth";

import { signInValidationSchema } from "../../utils/validators/authValidators";

import signinImage from '../../assets/images/signin.png'
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setError(null);
      setSuccess(null);
    };
  }, []);

  const submitHandler = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const result = await dispatch(signIn(values));
      if(result.payload.success ===false){
        setError(result.payload.message);
      }
    } catch (error) {
      error.response.data.message
        ? setError(error.response.data.message)
        : setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
<Container>
  <Row className="justify-content-center max-vh-75">
    <Col md={6}  className="d-flex justify-content-center align-items-center flex-column ">

          <img
            src={signinImage}
            alt="Sign in"
            className="img-fluid mt-4"
          />
    </Col>
    <Col lg={4} md={6} className="d-flex justify-content-center align-items-center ">
    <Container >
    <h2  className="fw-bold">Welcome Back!</h2>

      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="my-3">
          {success}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInValidationSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ handleSubmit, errors, touched, isValid, dirty }) => (
          <BootstrapForm
            onSubmit={handleSubmit}
            disabled={loading ? true : false}
          >
            <FormGroup className="my-2" controlId="email">
              <Field name="email">
                {({ field }) => (
                  <FormControl
                    type="email"
                    placeholder="Email"
                    {...field}
                    isInvalid={touched.email && !!errors.email}
                    disabled={loading}
                    className="form-control-underline"
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="email" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="password">
              {/* <FormLabel>Password</FormLabel> */}
              <Field name="password">
                {({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Password"
                    {...field}
                    isInvalid={touched.password && !!errors.password}
                    disabled={loading}
                    className="form-control-underline"
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="password" />
              </FormText>
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              className="mt-3 form-control"
              disabled={loading || !dirty || !isValid}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
            </Button>

            <Row className="py-3 justify-content-between">
              <Col xs="auto">
              <Link to="/signup" className="text-primary d-block mb-2">Don't have an Account? </Link>
              </Col>
           
              <Col xs="auto">
              <Link to="/forgot-password" className="text-dark d-block">Forgot Password </Link>
              </Col>
            </Row>
          </BootstrapForm>
        )}
      </Formik>
    </Container>
    </Col>
  </Row>
</Container>
  );
};

export default SignIn;
