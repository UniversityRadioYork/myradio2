import React from "react";
import "./App.scss";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MyRadio2Pages } from "./pages";
import { Menu, FormGroup, InputGroup, Card } from "@blueprintjs/core";

import MyRadioLogo from "./assets/myradio-logo.svg";

const NavItem: React.FC<{ text: string; path: string }> = ({ text, path }) => {
  const history = useHistory();
  return <Menu.Item onClick={() => history.push(path)} text={text} />;
};

const Sidebar: React.FC = () => (
  <div className={"myr-sidebar bp3-elevation-2"}>
    <Card elevation={1}>
      <img className="myradio-logo" src={MyRadioLogo} />

      <Menu>
        <FormGroup>
          <InputGroup leftIcon="search" placeholder="Search..." />
        </FormGroup>

        <Menu.Divider className="bigger-margin" title="Show Scheduler" />
        <NavItem path="/Scheduler/myShows" text="My Shows" />
        <NavItem path="/Scheduler/editShow" text="Apply for new Show" />
        <NavItem path="/Scheduler/shows" text="This Term's Shows" />
        <NavItem path="/Scheduler/shows?all=true" text="All Shows" />
        <NavItem path="/Scheduler" text="Pending Allocations" />
        <Menu.Divider className="bigger-margin" title="Podcast Manager" />
        <NavItem path="/Podcast/editPodcast" text="Upload a New Podcast" />
        <NavItem path="/Podcast" text="My Podcasts" />
        <NavItem path="/Podcast/allPodcast" text="All Podcasts" />
        <Menu.Divider className="bigger-margin" title="Music Library Manager" />
        <NavItem path="/Library/search" text="Search Tracks" />
        <NavItem path="/Library/addTrack" text="Upload a New Track" />
        <NavItem path="/iTones/listPlaylists" text="Edit Playlists" />
        <NavItem path="/iTones/requestTrack" text="Request Track for Jukebox" />
        <Menu.Divider className="bigger-margin" title="Training" />
        <NavItem path="/Scheduler/createDemo" text="Create Training Session" />
        <NavItem path="/Scheduler/listDemos" text="All Training Sessions" />
        <Menu.Divider className="bigger-margin" title="Member Database" />
        <NavItem path="/Profile" text="My Profile" />
        <NavItem path="/Profile/list" text="All Members" />
        <NavItem path="/Profile/quickAdd" text="Register New Member" />
        <Menu.Divider className="bigger-margin" title="Email" />
        <NavItem path="/Mail" text="Manage Mailing Lists" />
        <Menu.Item
          onClick={() => window.open("https://ury.org.uk/roundcube", "_blank")}
          text="RoundCube"
        />
        <Menu.Divider className="bigger-margin" title="Miscellaneous" />
        <NavItem path="/Webcam" text="Webcams" />
        <NavItem path="/quotes" text="Quotes Board" />
      </Menu>
    </Card>
  </div>
);

const basepath =
  window.location.origin === "https://ury.org.uk"
    ? "/myradio2-alpha"
    : undefined;

const App: React.FC = () => {
  return (
    <BrowserRouter basename={basepath}>
      <div className="myr-container">
        <Sidebar />
        <div className="myr-wrapper">
          <MyRadio2Pages />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
