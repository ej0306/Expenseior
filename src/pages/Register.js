import React, {useContext, useState} from "react";
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
import { IconAt } from "@tabler/icons-react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import cryptojs from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import ThemeToggle from "../ThemeToggle";
import { ThemeContext } from "../ThemeContext";

function Register() {
  const dispatch = useDispatch();
  const { theme, toggleTheme, themeStyles } = useContext(ThemeContext);
  // const [key, setKey] = useState(0);

  const handleToggleTheme = () => {
    toggleTheme();
    // setKey((prevKey) => prevKey + 1);
  };
  const registerForm = useForm({
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
      if (!emailRegex.test(registerForm.values.email)) {
        showNotification({
          title: "Invalid email address",
          color: "red",
        });
        dispatch(HideLoading());
        return;
      }

      // Password requirements
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(registerForm.values.password)) {
        showNotification({
          title:
            "Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number",
          color: "red",
        });
        dispatch(HideLoading());
        return;
      }

      //check if user email already exists bn
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", registerForm.values.email)
      );
      const existingUser = await getDocs(qry);

      if (existingUser.size > 0) {
        showNotification({
          title: "User already exists",
          color: "red",
        });
        return;
      } else {
        //encrypt password
        const encryptedPassword = cryptojs.AES.encrypt(
          registerForm.values.password,
          "expenseior"
        ).toString();
        const response = await addDoc(collection(fireDb, "users"), {
          ...registerForm.values,
          password: encryptedPassword,
        });
        if (response.id) {
          showNotification({
            title: "User created successfully",
            color: "green",
          });
        } else {
          showNotification({
            title: "User not created",
            color: "red",
          });
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    // <div className="flex h-screen justify-center items-center" style={themeStyles[theme]['mantineYlyj0r']}>
    <div className="flex h-screen justify-center items-center" style={themeStyles[theme].itemsCenter}>
      <ThemeToggle onClick={handleToggleTheme}/>
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      <Card
        className="mantine-ylyj0r"
        sx={{
          width: 400,
          // backgroundColor: themeStyles[theme]?.mantineYlyj0r?.backgroundColor,
          backgroundColor: themeStyles[theme]?.mantineylyj0r?.backgroundColor
        }}
        shadow="lg"
        withBorder
      >
        <Title order={2} mb={5}>
          EXPENSEIOR - REGISTER
        </Title>
        <Divider variant="solid" color="gray" />
        <form action="" onSubmit={onSubmit}>
          <Stack mt={5}>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              name="name"
              {...registerForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              icon={<IconAt size="0.8rem" />}
              {...registerForm.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              type="password"
              name="password"
              {...registerForm.getInputProps("password")}
            />
            <Button type="submit" color="teal">
              Register
            </Button>
            <Anchor href="/login">Already have an account? Login</Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Register;
