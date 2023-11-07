import { Group, Grid, Text } from "@mantine/core";
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { showNotification } from "@mantine/notifications";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import "../stylesheets/transactiontable.css";

function TransactionTable({
  transactions,
  setSelectedTransaction,
  setFormMode,
  setShowForm,
  getData,
}) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const deleteTransaction = async (id) => {
    try {
      dispatch(ShowLoading());
      await deleteDoc(doc(fireDb, `users/${user.id}/transactions`, id));
      dispatch(HideLoading());
      showNotification({
        title: "Transaction deleted",
        color: "green",
      });
      getData();
    } catch (error) {
      dispatch(HideLoading());
      showNotification({
        title: "Error deleting transaction",
        color: "red",
      });
    }
  };

  const getRows = transactions.map((transaction) => (
    <Grid key={transaction.name} grow gutter="sm">
      <Grid.Col span={4} justify="space-between">
        <div className="transaction">
          <Text className="transaction-item-name">
            {transaction.name}
            <Group
              style={{
                display: "inline-block",
              }}
            >
              <div className="icons">
                <i
                  className="ri-edit-2-line"
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setFormMode("edit");
                    setShowForm(true);
                  }}
                ></i>
                <i
                  className="ri-delete-bin-line"
                  onClick={() => {
                    deleteTransaction(transaction.id);
                  }}
                ></i>
              </div>
            </Group>
          </Text>

          <Text className="transaction-item">$: {transaction.amount}</Text>

          <Text className="transaction-item">
            Date: {moment(transaction.date).format("DD-MM-YYYY")}
          </Text>

          <Text className="transaction-item">
            Category: {transaction.category?.toUpperCase()}
          </Text>

          <Text className="transaction-item">Ref: {transaction.reference}</Text>
        </div>
      </Grid.Col>
    </Grid>
  ));

  return (
    <div>
      <Grid gutter="xl">{getRows}</Grid>
    </div>
  );
}

export default TransactionTable;
