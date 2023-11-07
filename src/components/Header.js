import React from "react";
import { Card, Group, Text, Avatar } from "@mantine/core";
import logo from "../images/logo.png";
import "../stylesheets/Header.css"; // This imports the styles from 'Header.css'

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="headercontainer">
      <Card shadow="md" p={20} withBorder className="card">
        <div className="flex justify-between">
          <Text size="xl" color="black" variant="text" weight="bold">
            <img src={logo} alt="Logo" width="60" height="50" />
            EXPENSEIOR
          </Text>
          <Group className="group">
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
