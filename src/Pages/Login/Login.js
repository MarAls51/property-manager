import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, signUp, user, userPrivilege, setPrivilege } = useUserAuth();
  const [flag, setFlag ] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      logIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      signUp(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      const createUser = async () => {
      if(user) { 
      const query = await doc(db, "Users", `${user.uid}`);
      await setDoc(query, {
        admin: userPrivilege
      }); }
    }
      
      const handleNavigate = async () => {
        if (user) {
          return navigate("/dashboard");
        }
      };
      createUser();
      handleNavigate();
    }, // eslint-disable-next-line
    [user]
  );

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col d-flex text-center justify-content-center">
            <div className="login-box p-4 pt-5 pb-5 mt-3 mb-3 text-start">
              {flag && (
                <>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <label for="formBasicEmail">Email</label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <label for="formBasicPassword">Password</label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit">
                        Login
                      </button>
                    </div>
                  </Form>
                  <div className="d-flex">
                    <span>
                      Need an account?{" "}
                      <Link className="login-link" onClick={()=>{setFlag(!flag)}}>
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </>
              )}
               {!flag && (
                <>
                  <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <label for="formBasicEmail">Email</label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <label for="formBasicPassword">Password</label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit" onClick={() => {setPrivilege(false)}}>
                        Sign Up As User
                      </button>
                    </div>

                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit" onClick={() => {setPrivilege(true)}}>
                        Sign Up As Admin
                      </button>
                    </div>
                  </Form>

                  <div className="d-flex">
                    <span>
                      Have an account?{" "}
                      <Link className="login-link" onClick={()=>{setFlag(!flag)}}>
                        Login
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
