import { Card, Group, Text, Avatar } from "@mantine/core";
import logo from "../images/logo.png";
import React from "react";
import styles from "../stylesheets/Header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="headercontainer">
      <Card shadow="md" p={20} withBorder className={styles.card}>
        <div className={styles.headerFlex}>
          <Text size="xl" color="black" variant="text" weight="bold">
            <img src={logo} alt="Logo" width="60" height="50" />
            EXPENSEIOR
          </Text>
          <Group className={styles.userGroup}>
            <Avatar radius="xl" color="blue" />
            {user?.name.toUpperCase()}
            <i
              className="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            ></i>
          </Group>
        </div>
      </Card>
    </div>
  );
}

export default Header;
