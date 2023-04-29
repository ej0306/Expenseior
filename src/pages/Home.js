import React, { useEffect } from "react";
import Header from "../components/Header";
import { Box, Button, Card, Divider, Group, Modal } from "@mantine/core";
import TransactionForm from "../components/TransactionForm";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { fireDb } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import moment from "moment/moment";
import Analytics from "../components/Analytics";

function Home() {
  const [view, setView] = React.useState("table");
  const [filters, setFilters] = React.useState({
    type: "",
    frequency: "7",
    dateRange: [],
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [transactions, setTransactions] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [formMode, setFormMode] = React.useState("add");
  const [selectedTransaction, setSelectedTransaction] = React.useState({});

  const getWhereConditions = () => {
    const tempConditions = [];

    //type condition filter
    if (filters.type !== "") {
      tempConditions.push(where("type", "==", filters.type));
    }

    //frequency condition filter
    if (filters.frequency !== "custom-range") {
      if (filters.frequency === "7") {
        tempConditions.push(
          where("date", ">=", moment().subtract(7, "days").format("YYYY-MM-DD"))
        );
      } else if (filters.frequency === "30") {
        tempConditions.push(
          where(
            "date",
            ">=",
            moment().subtract(30, "days").format("YYYY-MM-DD")
          )
        );
      } else if (filters.frequency === "365") {
        tempConditions.push(
          where(
            "date",
            ">=",
            moment().subtract(365, "days").format("YYYY-MM-DD")
          )
        );
      }
    } else {
      const fromDate = moment(filters.dateRange[0]).format("YYYY-MM-DD");
      const toDate = moment(filters.dateRange[1]).format("YYYY-MM-DD");
      tempConditions.push(
        where("date", ">=", fromDate),
        where("date", "<=", toDate)
      );
    }

    return tempConditions;
  };

  const getData = async () => {
    try {
      const whereConditions = getWhereConditions(filters);
      dispatch(ShowLoading());
      const qry = query(
        collection(fireDb, `users/${user.id}/transactions`),
        orderBy("date", "desc"),
        ...whereConditions
      );
      const response = await getDocs(qry);
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
      dispatch(HideLoading());
    } catch (error) {
      showNotification({
        title: "Error getting transactions",
        color: "red",
      });
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <Box mx={50}>
      <Header />
      <div className="container">
        <Card
          sx={{
            height: "82vh",
          }}
          shadow="md"
          withBorder
          mt={20}
        >
          <div className="flex justify-between items-end">
            <div>
              <Filters
                filters={filters}
                setFilters={setFilters}
                getData={getData}
              />
            </div>

            <Group>
              <Button.Group>
                <Button
                  color="teal"
                  variant={view === "table" ? "filled" : "outline"}
                  onClick={() => setView("table")}
                >
                  Grid
                </Button>
                <Button
                  color="teal"
                  variant={view === "analytics" ? "filled" : "outline"}
                  onClick={() => setView("analytics")}
                >
                  Analytics
                </Button>
              </Button.Group>
              <Button
                color="teal"
                onClick={() => {
                  setShowForm(true);
                  setFormMode("add");
                }}
              >
                Add Transaction
              </Button>
            </Group>
          </div>
          <Divider mt={20} />
          {view === "table" && 
            <TransactionTable
              transactions={transactions}
              setSelectedTransaction={setSelectedTransaction}
              setFormMode={setFormMode}
              setShowForm={setShowForm}
              getData={getData}
            />
          }
          {view === "analytics" && <Analytics transactions={transactions}/>}
        </Card>
      </div>

      <Modal
        size="lg"
        title={formMode === "add" ? "Add Transaction" : "Edit Transaction"}
        opened={showForm}
        onClose={() => setShowForm(false)}
        centered
      >
        <TransactionForm
          formMode={formMode}
          setFormMode={setFormMode}
          setShowForm={setShowForm}
          showForm={showForm}
          transactionData={selectedTransaction}
          getData={getData}
        />
      </Modal>
    </Box>
  );
}

export default Home;
