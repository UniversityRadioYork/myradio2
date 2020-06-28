import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  Menu,
  FormGroup,
  InputGroup,
  Classes,
  Icon,
  Spinner,
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
    location: "/scheduler/shows",
    children: [
      {
        label: "My Shows",
        location: "/scheduler/shows",
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
    location: "/admin",
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
  const showGlobalSpinner = useSelector<AppState>(
    (state) => state.Nav.globalSpinnerVisible
  );

  const location = useHistory().location;
  const activePath = location.pathname;

  return (
    <div className={classNames("myr-sidebar", Classes.ELEVATION_2)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img className="myradio-logo" src={MyRadioLogo} alt="" />
        <Spinner
          size={Spinner.SIZE_SMALL}
          className={classNames(
            "global-spinner",
            !showGlobalSpinner && "hidden"
          )}
        />
      </div>

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
                  activePath === "/" || activePath.startsWith(node.location)
                }
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
