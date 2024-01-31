import React, { Component } from "react";
import { Tab, TabPane } from "semantic-ui-react";
import TwelfthClassStudent from "./TwelfthClassStudent";
import EleventhClassStudent from "./EleventhClassStudent";
import TenthClassStudent from "./TenthClassStudent";
import NinthClassStudent from "./NinthClassStudent";

class Navbar extends Component {
  render() {
    const panes = [
      {
        menuItem: "9th Class Student",
        render: () => (
          <TabPane attached={false}>
            <NinthClassStudent />
          </TabPane>
        ),
      },
      {
        menuItem: "10th Class Student",
        render: () => (
          <TabPane attached={false}>
            <TenthClassStudent />
          </TabPane>
        ),
      },
      {
        menuItem: "11th Class Student",
        render: () => (
          <TabPane attached={false}>
            <EleventhClassStudent />
          </TabPane>
        ),
      },
      {
        menuItem: "12th Class Student",
        render: () => (
          <TabPane attached={false}>
            <TwelfthClassStudent />
          </TabPane>
        ),
      },
    ];

    return (
      <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}

export default Navbar;
