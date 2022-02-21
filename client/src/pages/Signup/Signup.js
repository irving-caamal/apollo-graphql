import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!, $bio: String) {
    signUp(credentials: {
      email: $email, password: $password
    }, name: $name, bio: $bio) {
      userErrors {
        message
      }
      token
    }
  }
`;
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const [signUp, { data, loading }] = useMutation(SIGN_UP);
  const [error, setError] = useState(null);
  const handleClick = () => {
    signUp({
      variables: { email, password, bio, name },
    });
    console.log({ data })
  };
  useEffect(() => {
    if (data) {
      if(data.signUp.userErrors.length) {
        setError(data.signUp.userErrors[0].message)
      }
      if(data.signUp.token) {
        setError(null)
        localStorage.setItem("token", data.signUp.token)
        history.push("/posts");
      }
    }
    
  }, [data])
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
