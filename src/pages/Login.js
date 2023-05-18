import React from "react";
import { useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Card,
  Divider,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";

import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import cryptojs from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import logo from "../images/logo.png";
import background from "../images/background.jpg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(ShowLoading());

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginForm.values.email)) {
        showNotification({
          title: "Invalid email address",
          color: "red",
        });
        dispatch(HideLoading());
        return;
      }

      // Check if user email already exists
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", loginForm.values.email)
      );
      const existingUser = await getDocs(qry);

      if (existingUser.size > 0) {
        // Decrypt password
        const decryptedPassword = cryptojs.AES.decrypt(
          existingUser.docs[0].data().password,
          "expenseior"
        ).toString(cryptojs.enc.Utf8);

        if (decryptedPassword === loginForm.values.password) {
          // Login Successful!
          showNotification({
            title: "Login Successful!",
            color: "green",
          });
          const dataToPutInLocalStorage = {
            name: existingUser.docs[0].data().name,
            email: existingUser.docs[0].data().email,
            id: existingUser.docs[0].id,
          };
          localStorage.setItem("user", JSON.stringify(dataToPutInLocalStorage));
          navigate("/");
        } else {
          // Invalid Credentials!
          showNotification({
            title: "Invalid Credentials!",
            color: "red",
          });
        }
      } else {
        // User does not exist!
        showNotification({
          title: "User does not exist!",
          color: "red",
        });
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      // Something went wrong!
      showNotification({
        title: "Something went wrong!",
        color: "red",
      });
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Card
        sx={{
          width: 400,
        }}
        shadow="lg"
        withBorder
      >
        <Title order={2} mb={5}>
          <img src={logo} alt="Logo" width="60" height="50" />
          EXPENSEIOR
        </Title>
        <Divider variant="solid" color="gray" />
        <form action="" onSubmit={onSubmit}>
          <Stack mt={5}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              {...loginForm.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              name="password"
              type="password"
              {...loginForm.getInputProps("password")}
            />
            <Button type="submit" color="teal">
              Login
            </Button>

            <Anchor href="/register">Don't have an account? Register</Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Login;
