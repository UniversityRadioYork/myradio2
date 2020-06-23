import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  Menu,
  Card,
  FormGroup,
  InputGroup,
  Classes,
  Icon,
} from "@blueprintjs/core";
import { motion, AnimatePresence } from "framer-motion";

import MyRadioLogo from "../../assets/myradio-logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import * as devOptionsState from "../DevOptions/state";

import "./Sidebar.scss";
import { IconNames } from "@blueprintjs/icons";

const NavItem: React.FC<{
  text: string;
  path?: string;
  onClick?: () => any;
  level: number;
  newTab?: boolean;
  childItems?: NavTreeNode[];
  expanded?: boolean;
}> = ({ text, path, onClick, level, newTab, childItems, expanded }) => {
  const history = useHistory();
  function handleClick(e: React.MouseEvent<any>) {
    if (onClick) {
      onClick();
    }
    if (typeof path === "string") {
      e.preventDefault();
      if (newTab) {
        window.open(path, "_blank");
      } else {
        history.push(path);
      }
    }
  }
  return (
    <motion.li className={classNames("item", `level-${level}`)}>
      <button className="nav-btn" onClick={handleClick}>
        {level === 1 && (childItems?.length || 0) > 0 && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            style={{
              display: "inline-block",
              transformOrigin: "-0.5em center",
            }}
          >
            <Icon icon={IconNames.CHEVRON_DOWN} className="chevron" />
          </motion.span>
        )}
        {text}
      </button>
      <AnimatePresence>
        {childItems && expanded && (
          <motion.ul
            className="nav"
            initial={{ y: -0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
          >
            {childItems.map((child, idx) => (
              <NavItem
                key={idx}
                path={child.location}
                text={child.label}
                newTab={child.newTab}
                level={level + 1}
                onClick={onClick}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

interface NavTreeNode {
  label: string;
  location: string;
  newTab?: boolean;
  children?: NavTreeNode[];
}

const NavTree: NavTreeNode[] = [
  {
    label: "Home",
    location: "/",
  },
  {
    label: "Radio and Podcasting",
    location: "/Scheduler/myShows",
    children: [
      {
        label: "My Shows",
        location: "/Scheduler/myShows",
      },
      {
        label: "Audio Logger",
        location: "https://ury.org.uk/loggerng",
        newTab: true,
      },
      {
        label: "My Podcasts",
        location: "/Podcast",
      },
    ],
  },
  {
    label: "Calendar [NYI]",
    location: "/calendar",
    children: [
      {
        label: "Events",
        location: "/calendar/events",
      },
      {
        label: "Studio Booking",
        location: "/calendar/studioBooking",
      },
    ],
  },
  {
    label: "Training Hub [NYI]",
    location: "/training",
    children: [
      {
        label: "Training Sessions",
        location: "/training/sessions",
      },
      {
        label: "Guides, Handbooks, and Handover",
        location: "/training/docs",
      },
    ],
  },
  {
    label: "Administration",
    location: "/",
    children: [
      {
        label: "Members",
        location: "/Profile/list",
      },
      {
        label: "Show Scheduler",
        location: "/Scheduler",
      },
      {
        label: "Music Library",
        location: "/Library",
      },
      {
        label: "Mailing Lists",
        location: "/Mail",
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  const user = useSelector((state: AppState) => state.Login.currentUser);
  const globalConfig = useSelector((state: AppState) => state.GlobalConfig);
  const dispatch = useDispatch();

  const [selectedTopLevelIdx, setSelectedTopLevelIdx] = useState(-1);

  return (
    <div className={classNames("myr-sidebar", Classes.ELEVATION_2)}>
      <img className="myradio-logo" src={MyRadioLogo} alt="" />

      <div>
        <FormGroup>
          <InputGroup leftIcon="search" placeholder="Search..." />
        </FormGroup>

        <ul className="nav">
          {!!user && (
            <NavItem
              level={0}
              path="/me"
              text={`Signed in as ${user.fname} ${user.sname}`}
              onClick={() => setSelectedTopLevelIdx(-1)}
            />
          )}
          <NavItem
            onClick={() => dispatch(devOptionsState.open())}
            level={0}
            text={`(on environment: ${globalConfig.myradio.environment})`}
          />

          {NavTree.map((node, idx) => (
            <>
              <NavItem
                key={idx}
                level={1}
                path={node.location}
                text={node.label}
                newTab={node.newTab}
                childItems={node.children}
                expanded={
                  selectedTopLevelIdx === -1 || selectedTopLevelIdx === idx
                }
                onClick={() => setSelectedTopLevelIdx(idx === 0 ? -1 : idx)}
              />
              {idx !== NavTree.length - 1 && <Menu.Divider />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
