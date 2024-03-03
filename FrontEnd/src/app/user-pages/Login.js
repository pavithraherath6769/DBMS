import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = () => {

  const history = useHistory();
  const onFormSubmit = e => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
      console.log(formDataObj)
      history.push({ pathname: "/console", state: { user: formDataObj.userName } });
    } catch (error) {
      console.error("Login", error);
    }

  }
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div>
              <div className="d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                  <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                      <div className="brand-logo">
                        <img src={require("../../assets/images/logo.svg")} alt="logo" />
                      </div>
                      <h4>Welcome to DBMS login Page</h4>
                      <h6 className="font-weight-light">Sign in to continue.</h6>
                      <Form className="pt-3" onSubmit={onFormSubmit}>
                        <Form.Group className="d-flex search-field">
                          <Form.Control required type="email" name="userName" placeholder="Username" size="lg" className="h-auto" />
                        </Form.Group>
                        <Form.Group className="d-flex search-field">
                          <Form.Control required type="password" name="password" placeholder="Password" size="lg" className="h-auto" />
                        </Form.Group>
                        <div className="mt-3">
                          <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</Button>
                          {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to={{pathname: "/console",state: { user }}} >SIGN IN</Link> */}
                        </div>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <label className="form-check-label text-muted">
                              <input style={{ cursor: "not-allowed" }} type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                              Keep me signed in
                            </label>
                          </div>
                          <a style={{ cursor: "not-allowed" }} href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                          Don't have an account? <Link style={{ cursor: "not-allowed" }} to="/user-pages/register" className="text-primary">Create</Link>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
