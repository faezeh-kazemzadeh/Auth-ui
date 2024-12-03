import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../../Layout";
import { useState, useEffect } from "react";
import { signUpValidationSchema } from "../../utils/validators/authValidators";
import { signUp } from "../../services/auth";
import signupImage from "../../assets/images/signup.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const result = await signUp(values);
      setSuccess("Sign up successful! Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
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
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-column "
        >
          <img src={signupImage} alt="Sign in" className="img-fluid mt-4" />
        </Col>
        <Col
          lg={4}
          md={6}
          className="d-flex justify-content-center align-items-center "
        >
          <Container>
            <h1>Sign Up Page</h1>
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
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signUpValidationSchema}
              onSubmit={(values) => submitHandler(values)}
            >
              {({ handleSubmit, errors, touched, isValid, dirty }) => (
                <BootstrapForm
                  onSubmit={handleSubmit}
                  disabled={loading ? true : false}
                >
                  <FormGroup className="my-2" controlId="firstname">
                    {/* <FormLabel>Name</FormLabel> */}
                    <Field name="firstname">
                      {({ field }) => (
                        <FormControl
                          type="text"
                          placeholder="Name"
                          {...field}
                          isInvalid={touched.firstname && !!errors.firstname}
                          disabled={loading}
                          className="form-control-underline"
                        />
                      )}
                    </Field>
                    <FormText className="text-danger">
                      <ErrorMessage name="firstname" />
                    </FormText>
                  </FormGroup>

                  <FormGroup className="my-2" controlId="lastname">
                    {/* <FormLabel>Last Name</FormLabel> */}
                    <Field name="lastname">
                      {({ field }) => (
                        <FormControl
                          type="text"
                          placeholder="Last Name"
                          {...field}
                          isInvalid={touched.lastname && !!errors.lastname}
                          disabled={loading}
                          className="form-control-underline"
                        />
                      )}
                    </Field>
                    <FormText className="text-danger">
                      <ErrorMessage name="lastname" />
                    </FormText>
                  </FormGroup>

                  <FormGroup className="my-2" controlId="email">
                    {/* <FormLabel>Email</FormLabel> */}
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

                  <FormGroup className="my-2" controlId="confirmPassword">
                    {/* <FormLabel>Confirm Password</FormLabel> */}
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <FormControl
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                          disabled={loading}
                          className="form-control-underline"
                        />
                      )}
                    </Field>
                    <FormText className="text-danger">
                      <ErrorMessage name="confirmPassword" />
                    </FormText>
                  </FormGroup>
                  <Row className="py-3 justify-content-between align-items-center">
                    <Col xs="auto">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading || !dirty || !isValid}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Link to="/signin" className=" text-primary d-block">
                        Already have an Account?
                      </Link>
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

export default SignUp;
