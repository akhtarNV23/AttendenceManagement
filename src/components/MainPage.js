import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import Navbar from "./Navbar";
import LogOutModal from "./LogOutModal";

class MainPage extends Component {
  state = {
    isModal: false,
  };

  handleLogOutModalOpen = () => {
    this.setState({ isModal: true });
  };
  handleLogOutModalClose = () => {
    this.setState({ isModal: false });
  };

  render() {
    const { isModal } = this.state;
    return (
      <div>
        <Header as="h3" block>
          <div>Attendance Management </div>
          <div
            style={{ float: "right", marginTop: "-20px", cursor: "pointer" }}
            onClick={this.handleLogOutModalOpen}
          >
            <Icon disabled name="user circle" />
            Logout
          </div>
          <LogOutModal onOpen={isModal} onClose={this.handleLogOutModalClose} />
        </Header>
        <div
          style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}
        >
          <Navbar />
        </div>
      </div>
    );
  }
}
export default MainPage;
