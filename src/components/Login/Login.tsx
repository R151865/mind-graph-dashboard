import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./Login.module.css";

import Username from "./Username/Username";
import Password from "./Password/Password";
import Button from "./Button/Button";
import { useNavigate, Navigate } from "react-router-dom";

import { setToken, getToken } from "../../utils/cookies";

const { REACT_APP_BASE_API_URL } = process.env;

interface FormState {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
}

const initialForm: FormState = {
  username: "",
  password: "",
  usernameError: "",
  passwordError: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(initialForm);

  const isValidInput = (): boolean => {
    let errorData = {
      usernameError: "",
      passwordError: "",
    };

    if (form.username === "") {
      errorData.usernameError = "*Please enter username";
    }

    if (form.username.length < 3) {
      errorData.usernameError = "*Username should be at least 3 characters";
    }

    if (form.password === "") {
      errorData.passwordError = "*Please enter password";
    }

    if (form.password.length < 3) {
      errorData.passwordError = "*Password should be at least 3 characters";
    }

    setForm({
      ...form,
      usernameError: errorData.usernameError,
      passwordError: errorData.passwordError,
    });

    return errorData.usernameError === "" && errorData.passwordError === "";
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidInput()) {
      postUserLogin();
    }
  };

  const postUserLogin = async () => {
    setLoading(true);
    const URL = `${REACT_APP_BASE_API_URL}user/login`;
    const body = {
      username: form.username,
      password: form.password,
    };
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(URL, options);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        setToken(data.token);
        setError(false);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (getToken() !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`${styles.mainContainer}`}>
      <form onSubmit={onSubmitForm} className={`${styles.loginContainer}`}>
        <Username
          labelText="Username"
          type="text"
          placeholder="Enter Username"
          id="userName"
          value={form.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, username: e.target.value.trimStart() })
          }
          errorMessage={form.usernameError}
        />
        <Password
          labelText="Password"
          type="password"
          placeholder="Enter Password"
          id="Password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value.trimStart() })
          }
          errorMessage={form.passwordError}
        />

        <Button text="Login" loading={loading} />
        {error && (
          <p className={styles.error}>* Username and password do not match</p>
        )}
      </form>
    </div>
  );
};

export default Login;
