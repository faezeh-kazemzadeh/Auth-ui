import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Form as BootstrapForm,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FormContainer } from "../../Layout";
import { updateProfile } from "../../Redux/slices/auth";
import { updateProfileSchema } from "../../utils/validators/authValidators";
const MyProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      const result = await dispatch(updateProfile(values));
      if (result.payload.success === false) {
        setError(result.payload.message || "update failed. Please try again.");
      }
      setSuccess("Update user Profile successful!");
      setIsEditMode(false);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
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

      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => setIsEditMode(!isEditMode)}
      >
        {isEditMode ? "Cancel Editing" : "Edit Profile"}
      </Button>
      <Formik
        initialValues={{
          firstname: currentUser?.firstname || "",
          lastname: currentUser?.lastname || "",
        }}
        validationSchema={updateProfileSchema}
        onSubmit={(values) => {
          setLoading(true);
          submitHandler(values);
        }}
      >
        {({ handleSubmit, errors, touched, dirty, isValid }) => (
          <BootstrapForm
            onSubmit={handleSubmit}
            onChange={() => {
              setError(null);
              setSuccess(null);
            }}
            disabled={loading ? true : false}
          >
            <FormGroup className="my-2" controlId="firstname">
              <FormLabel>Name</FormLabel>
              <Field name="firstname">
                {({ field }) => (
                  <FormControl
                    type="text"
                    placeholder="Name"
                    {...field}
                    isInvalid={touched.firstname && !!errors.firstname}
                    disabled={loading || !isEditMode}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="firstname" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="lastname">
              <FormLabel>Last Name</FormLabel>
              <Field name="lastname">
                {({ field }) => (
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    {...field}
                    isInvalid={touched.lastname && !!errors.lastname}
                    disabled={loading || !isEditMode}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="lastname" />
              </FormText>
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              className="my-3 W-100"
              disabled={loading || !dirty || !isValid}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </BootstrapForm>
        )}
      </Formik>
    </FormContainer>
  );
};

export default MyProfile;
