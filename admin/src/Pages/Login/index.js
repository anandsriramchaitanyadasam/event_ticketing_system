/** @format */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AdminLayout from "../../Layout/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { postApihandler } from "../../API_Handler";
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";
// import swal from "sweetalert";
import swal from "sweetalert";
import { postApihandler } from "../../Apihandler";

const Login = () => {
  const Navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const SubmitLogins = async (value) => {
    console.log("value is ------>", value);
    let result = await postApihandler("/adminLogin", value);
    console.log("login result is", result);

    if (result.status == 200) {
      Navigate("/dashboard");
      swal({
        icon: "success",
        text: "You have successfully logged in ",
      });
    } else {
      swal({
        icon: "error",
        title: "Please Try Again",
        text: result.error.response.data.message,
      });
      console.log("false result is - ", result.error.response.data.message);
    }
  };
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
              background: "#60156d",
            }}
          >
            <div className="form-field-wrapper">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit(SubmitLogins)}
              >
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        required
                        {...register("admin_Email")}
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
                      {...register("password")}
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
                    // sx={{ backgroundColor: "white", color: "black " }}
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    Login
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
