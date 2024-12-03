import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
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
} from "react-bootstrap";
import { FormContainer } from "../../Layout";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword, validateToken } from "../../services/auth";
import { resetPasswordSchema } from "../../utils/validators/authValidators";
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await validateToken(token);
        setValidToken(true);
      } catch (error) {
        setErrorMessage(error.message || "Invalid or expired token");
        setValidToken(false);
      }
    };
    verifyToken();
    return () => {
      setError(null);
      setSuccess(null);
    };
  }, [token]);

  const submitHandler = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resetPassword(token, values);
      setSuccess("Password reset successfull.");
      setError(null);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      console.log(error);
      error
        ? setError(error.message)
        : setError("An unexpected error occurred. Please try again.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  if (validToken === null) {
    return <p>Loading...</p>;
  }

  if (validToken === false) {
    return (
      <div>
        <h1>Invalid Token</h1>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/forgot-password")}>
          Request a New Link
        </button>
      </div>
    );
  }
  return (
    <FormContainer>
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
          password: "",
          confirmPassword:"",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ handleSubmit, errors, touched, isValid, dirty }) => (
          <BootstrapForm
            onSubmit={handleSubmit}
            disabled={loading ? true : false}
          >
            <FormGroup className="my-2" controlId="password">
              <FormLabel>Password</FormLabel>
              <Field name="password">
                {({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Password"
                    {...field}
                    isInvalid={touched.password && !!errors.password}
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="password" />
              </FormText>
            </FormGroup>
            <FormGroup className="my-2" controlId="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
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
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="confirmPassword" />
              </FormText>
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              disabled={loading || !dirty || !isValid}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Reset Password"
              )}
            </Button>

          
          </BootstrapForm>
        )}
      </Formik>
    </FormContainer>
  );
}
