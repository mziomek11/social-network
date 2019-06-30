import React from "react";
import { Menu } from "semantic-ui-react";

const MessageMenu = () => {
  return (
    <Menu vertical className="message-menu">
      <Menu.Item header>Messages</Menu.Item>
      <Menu.Item>Siema</Menu.Item>
      <Menu.Item>Elo</Menu.Item>
      <Menu.Item>Yo</Menu.Item>
    </Menu>
  );
};

export default MessageMenu;
