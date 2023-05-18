import React from "react";
import "../stylesheets/analytics.css";
import { Divider, Group } from "@mantine/core";
import { RingProgress, Text, Progress } from "@mantine/core";

function Analytics({ transactions }) {
  //Total number of transactions
  const totalTransactions = transactions.length;
  const IncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const ExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expenses"
  ).length;
  const totalIncomePercentage = (IncomeTransactions / totalTransactions) * 100;
  const totalExpensePercentage =
    (ExpenseTransactions / totalTransactions) * 100;

  //Total amount of transactions
  const totalTransactionsAmount = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount);
  }, 0);

  const totalIncomeAmount = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);

  const totalExpenseAmount = transactions
    .filter((transaction) => transaction.type === "expenses")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);

  const totalAmountIncomePercentage =
    (totalIncomeAmount / totalTransactionsAmount) * 100;
  const totalAmountExpensePercentage =
    (totalExpenseAmount / totalTransactionsAmount) * 100;

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Medical", value: "medical" },
    { label: "School", value: "school" },
    { label: "Salary", value: "salary" },
    { label: "Others", value: "others" },
  ];

  return (
    <div>
      <Group mt={20}>
        <div className="totalTransaction">
          <h2 className="box-title">Total Transactions: {totalTransactions}</h2>
          <Divider my={20} />
          <p>Income Transactions: {IncomeTransactions.toFixed(2)}</p>
          <p>Expense Transactions: {ExpenseTransactions.toFixed(2)}</p>

          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalIncomePercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalIncomePercentage },
                { value: totalIncomePercentage, color: "blue" },
              ]}
            />

            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalExpensePercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalExpensePercentage },
                { value: totalExpensePercentage, color: "orange" },
              ]}
            />
          </Group>
        </div>

        <div className="totalTurnover">
          <h2 className="box-title">
            Total Turnover: ${totalTransactionsAmount.toFixed(2)}
          </h2>
          <Divider my={20} />
          <p>Income: ${totalIncomeAmount.toFixed(2)}</p>
          <p>Expense: ${totalExpenseAmount.toFixed(2)}</p>

          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalAmountIncomePercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalAmountIncomePercentage },
                { value: totalAmountIncomePercentage, color: "green" },
              ]}
            />

            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalAmountExpensePercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalAmountExpensePercentage },
                { value: totalAmountExpensePercentage, color: "red" },
              ]}
            />
          </Group>
        </div>
      </Group>

      <Group mt={20} grow>
        <div className="incomeCategories">
          <h1 className="box-title">Income Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const incomeTransactionCategoriesAmount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category.value
              )
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);

            const incomeTransactionCategoriesPercentage =
              (incomeTransactionCategoriesAmount / totalIncomeAmount) * 100;

            return (
              <div>
                <p>{category.label}</p>
                <Progress
                  value={incomeTransactionCategoriesPercentage}
                  label={incomeTransactionCategoriesPercentage.toFixed(2) + "%"}
                  size={22}
                />
              </div>
            );
          })}
        </div>

        <div className="expensesCategories">
          <h1 className="box-title">Expenses Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const expensesTransactionCategoriesAmount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "expenses" &&
                  transaction.category === category.value
              )
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);

            const expensesTransactionCategoriesPercentage =
              (expensesTransactionCategoriesAmount / totalExpenseAmount) * 100;

            return (
              <div>
                <p>{category.label}</p>
                <Progress
                color="orange"
                  value={expensesTransactionCategoriesPercentage}
                  label={expensesTransactionCategoriesPercentage.toFixed(2) + "%"}
                  size={22}
                />
              </div>
            );
          })}
        </div>
      </Group>
    </div>
  );
}

export default Analytics;
