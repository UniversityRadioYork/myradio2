import React from "react";
import { useHistory } from "react-router-dom";

import MyRadioLogo from "../../assets/myradio-logo.svg";
import { Menu, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import * as devOptionsState from "../DevOptions/state";
import Flips from "../FLIPS";

const NavItem: React.FC<{ text: string; path: string }> = ({ text, path }) => {
  const history = useHistory();
  return <Menu.Item onClick={() => history.push(path)} text={text} />;
};

const Sidebar: React.FC = () => {
  const user = useSelector((state: AppState) => state.Login.currentUser);
  const globalConfig = useSelector((state: AppState) => state.GlobalConfig);
  const dispatch = useDispatch();

  return (
    <div className={"myr-sidebar bp3-elevation-2"}>
      <Card elevation={1}>
        <img className="myradio-logo" src={MyRadioLogo} alt="" />

        <Menu>
          <FormGroup>
            <InputGroup leftIcon="search" placeholder="Search..." />
          </FormGroup>

          {!!user && (
            <Menu.Item text={`Signed in as ${user.fname} ${user.sname}`} />
          )}
          <Menu.Item
            onClick={() => dispatch(devOptionsState.open())}
            text={`(on environment: ${globalConfig.myradio.environment})`}
          />

          <Menu.Divider className="bigger-margin" title="Show Scheduler" />
          <NavItem path="/Scheduler/myShows" text="My Shows" />
          <Flips feature="newScheduler" fallback={<NavItem path="/Scheduler/editShow" text="Apply for new Show" />}>
            <NavItem path="/scheduler/newShow" text="Apply for new Show" />
          </Flips>
          <NavItem path="/Scheduler/shows" text="This Term's Shows" />
          <NavItem path="/Scheduler/shows?all=true" text="All Shows" />
          <NavItem path="/Scheduler" text="Pending Allocations" />
          <Menu.Divider className="bigger-margin" title="Podcast Manager" />
          <NavItem path="/Podcast/editPodcast" text="Upload a New Podcast" />
          <NavItem path="/Podcast" text="My Podcasts" />
          <NavItem path="/Podcast/allPodcast" text="All Podcasts" />
          <Menu.Divider
            className="bigger-margin"
            title="Music Library Manager"
          />
          <NavItem path="/Library/search" text="Search Tracks" />
          <NavItem path="/Library/addTrack" text="Upload a New Track" />
          <NavItem path="/iTones/listPlaylists" text="Edit Playlists" />
          <NavItem
            path="/iTones/requestTrack"
            text="Request Track for Jukebox"
          />
          <Menu.Divider className="bigger-margin" title="Training" />
          <NavItem
            path="/Scheduler/createDemo"
            text="Create Training Session"
          />
          <NavItem path="/Scheduler/listDemos" text="All Training Sessions" />
          <Menu.Divider className="bigger-margin" title="Member Database" />
          <NavItem path="/Profile" text="My Profile" />
          <NavItem path="/Profile/list" text="All Members" />
          <NavItem path="/Profile/quickAdd" text="Register New Member" />
          <Menu.Divider className="bigger-margin" title="Email" />
          <NavItem path="/Mail" text="Manage Mailing Lists" />
          <Menu.Item
            onClick={() =>
              window.open("https://ury.org.uk/roundcube", "_blank")
            }
            text="RoundCube"
          />
          <Menu.Divider className="bigger-margin" title="Miscellaneous" />
          <NavItem path="/Webcam" text="Webcams" />
          <NavItem path="/quotes" text="Quotes Board" />
        </Menu>
      </Card>
    </div>
  );
};

export default Sidebar;
