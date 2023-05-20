import { Card, Group, Text, Avatar } from "@mantine/core";
import logo from "../images/logo.png";
import React from "react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Card shadow="md" p={20} withBorder style={{ opacity: 0.95 }}>
        <div className="flex justify-between">
          <Text size="xl" color="black" variant="text" weight="bold">
            <img src={logo} alt="Logo" width="60" height="50" />
            EXPENSEIOR
          </Text>
          <Group
            className="flex items-center"
            style={{ fontWeight: "bold", fontSize: 22 }}
          >
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
