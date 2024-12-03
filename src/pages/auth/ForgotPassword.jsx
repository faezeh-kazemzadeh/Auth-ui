import {useState , useEffect} from 'react'
import { Formik, Field,  ErrorMessage } from "formik";
import {Link } from "react-router-dom";
import * as Yup from "yup";
import {
  Form as BootstrapForm,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Alert,
  Spinner, Row, Col,Container
} from "react-bootstrap";
import { FormContainer } from "../../Layout";
import { forgotPassword } from '../../services/auth';
import forgotPasswordImage from "../../assets/images/forgot-password.png";

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const validationSchema = Yup.object({

        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      });
      useEffect(() => {
        return () => {
          setError(null);
          setSuccess(null);
        };
      }, []);

      const submitHandler=async(values)=>{
        setLoading(true);
    setError(null);
    try {
        const result = await forgotPassword(values)
      setSuccess("Password reset link sent to your email. Please check your Mailbox");
      setError(null);
    } catch (error) {
        console.log(error)
        error
        ? setError(error.message)
        : setError("An unexpected error occurred. Please try again.");
        setSuccess(null);
    } finally {
        setLoading(false);
      }
      }
  return (
    <Container>
    <Row className="justify-content-center max-vh-75">
      <Col md={6}  className="d-flex justify-content-center align-items-center flex-column ">
  
            <img
              src={forgotPasswordImage}
              alt="Sign in"
              className="img-fluid mt-4"
            />
      </Col>
      <Col lg={4} md={6} className="d-flex justify-content-center align-items-center ">
      <Container >
    <h2>Forgot Password</h2>
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
         }}
        validationSchema={validationSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ handleSubmit, errors, touched, isValid, dirty }) => (
          <BootstrapForm
            onSubmit={handleSubmit}
            disabled={loading ? true : false}
          >
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



            <Button
              type="submit"
              variant="primary"
              className="mt-3 form-control"
              disabled={loading || !dirty || !isValid}

            >
              {loading ? <Spinner animation="border" size="sm" />  : "Send Reset Link"}
            </Button>

            <Row className="py-3">
          <Col>
             <Link to={"/signin"}>Back to Sign in</Link>
          </Col>
        </Row>
          </BootstrapForm>
        )}
      </Formik>
    </Container>
    </Col>
    </Row>
    </Container>
  )
}
