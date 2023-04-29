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
import { IconAt } from "@tabler/icons-react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import cryptojs from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Register() {
  const dispatch = useDispatch();
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
      //check if user email already exists bn
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", registerForm.values.email)
      );
      const existingUser = await getDocs(qry);

      if (existingUser.size > 0) {
        //alert("Email already exists");
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
          //alert("User created successfully");
          showNotification({
            title: "User created successfully",
            color: "green",
          });
        } else {
          //alert("User not created");
          showNotification({
            title: "User not created",
            color: "red",
          });
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      //alert("Something went wrong");
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card
        sx={{
          width: 400,
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
