import Button from "../../components/button/button";
import { Form } from "react-router-dom";
import FormRowVertical from "../../components/form-row-vertical/form-row-vertical";
import Input from "../../components/input/input";
import SpinnerMini from "../../components/spinner-mini/spinner-mini";
import useLogin from "./hooks/use-login";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogingIn, LoginUser } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    LoginUser(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        }
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" error="">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLogingIn}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error="">
        <Input
          type="password"
          id="password"
          disabled={isLogingIn}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogingIn}>
          {isLogingIn ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
