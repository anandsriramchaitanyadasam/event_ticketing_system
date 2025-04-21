/** @format */

import React, { useState } from "react";
// Importing necessary components from React and React-Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";  // For navigating between routes
import { useForm } from "react-hook-form";  // For handling form validation
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";  // For creating a responsive grid layout
import swal from "sweetalert";  // For showing alerts
import { postApihandler } from "../../Apihandler";  // Importing API handler for login

const Login = () => {
  // State and hooks initialization
  const Navigate = useNavigate();  // To navigate after successful login
  const [validated] = useState(false);  // To manage form validation
  const { register, handleSubmit } = useForm();  // Hook for form handling

  // Submit function to handle form submission
  const SubmitLogins = async (value) => {
    console.log("value is ------>", value);  // Log submitted form values

    // Making a POST request to login using the provided form data
    let result = await postApihandler("/adminLogin", value);
    console.log("login result is", result);  // Log the response from the API

    // If the login is successful, navigate to the dashboard and show success alert
    if (result.status === 200) {
      Navigate("/dashboard");
      swal({
        icon: "success",
        text: "You have successfully logged in ",
      });
    } else {
      // If login fails, show an error alert with the message
      swal({
        icon: "error",
        title: "Please Try Again",
        text: result.error.response.data.message,
      });
      console.log("false result is - ", result.error.response.data.message);
    }
  };

  // JSX for the Login component
  return (
    <section className="signupFormWrapper my-5">
      <h2 className="section-title mb-5 text-center">Login Now</h2>
      <Container>
        <Grid
          container
          spacing={2}
          className="justify-content-center m-0 w-100"
        >
          <Grid
            item
            md={5}
            xs={12}
            sx={{
              boxShadow: 3,
              padding: "60px 40px 30px !important",
              borderRadius: "20px",
              background: "#60156d",  // Background color of the form container
            }}
          >
            <div className="form-field-wrapper">
              <Form
                noValidate
                validated={validated}  // To show form validation state
                onSubmit={handleSubmit(SubmitLogins)}  // Handle form submission
              >
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        required
                        {...register("admin_Email")}  // Register input for email
                      />
                      <Form.Control.Feedback type="invalid">
                        Please fill a email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="validationCustom03">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      {...register("password")}  // Register input for password
                    />
                    <Form.Control.Feedback type="invalid">
                      Please fill a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="text-center mb-4">
                  <Button
                    type="submit"
                    className="border-0 font-bold py-2 px-3"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    Login  {/* Submit button for the form */}
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Login;
