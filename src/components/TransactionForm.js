import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Stack, TextInput, Select, Button, Group } from "@mantine/core";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { fireDb } from "../firebaseConfig";
import moment from "moment";

function TransactionForm({
  formMode,
  setFormMode,
  setShowForm,
  transactionData,
  getData,
}) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const transactionForm = useForm({
    initialValues: {
      name: "",
      type: "",
      amount: "",
      date: "",
      category: "",
      reference: "",
      description: "",
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(ShowLoading());
      if (formMode === "add") {
        await addDoc(
          collection(fireDb, `users/${user.id}/transactions`),
          transactionForm.values
        );
      } else {
        await setDoc(
          doc(fireDb, `users/${user.id}/transactions`, transactionData.id),
          transactionForm.values
        );
      }
      showNotification({
        title: formMode === "add" ? "Transaction Added" : "Transaction Updated",
        color: "green",
      });
      dispatch(HideLoading());
      getData();
      setShowForm(false);
    } catch (error) {
      showNotification({
        title:
          formMode === "add" ? "Error adding Transaction" : "Updating Error",
        color: "red",
      });
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (formMode === "edit") {
      transactionForm.setValues(transactionData);
      transactionForm.setFieldValue(
        "date",
        moment(transactionData.date, "YYYY-MM-DD").format("YYYY-MM-DD")
      );
    }
  }, [transactionData, formMode]); // Include only the variables that could change

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <Stack>
          <TextInput
            name="name"
            label="Name"
            placeholder="Enter Transaction Name"
            {...transactionForm.getInputProps("name")}
          />

          <Group grow>
            <Select
              name="type"
              label="Type"
              placeholder="Select Transaction Type"
              data={[
                { label: "Income", value: "income" },
                { label: "Expenses", value: "expenses" },
              ]}
              {...transactionForm.getInputProps("type")}
            />

            <Select
              name="category"
              label="Category"
              placeholder="Select Transaction Category"
              data={[
                { label: "Food", value: "food" },
                { label: "Transport", value: "transport" },
                { label: "Shopping", value: "shopping" },
                { label: "Entertainment", value: "entertainment" },
                { label: "Medical", value: "medical" },
                { label: "School", value: "school" },
                { label: "Salary", value: "salary" },
                { label: "Others", value: "others" },
              ]}
              {...transactionForm.getInputProps("category")}
            />
          </Group>

          <Group grow>
            <TextInput
              //width="60%"
              name="amount"
              label="Amount"
              placeholder="Enter Transaction Amount"
              {...transactionForm.getInputProps("amount")}
            />

            <TextInput
              //width="60%"
              name="date"
              label="Date"
              type="date"
              placeholder="Enter Transaction Date"
              {...transactionForm.getInputProps("date")}
            />
          </Group>

          <TextInput
            name="reference"
            label="Reference"
            placeholder="Enter Transaction Reference"
            {...transactionForm.getInputProps("reference")}
          />

          <Button color="teal" type="submit">
            {formMode === "add" ? "Add Transaction" : "Update Transaction"}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default TransactionForm;
