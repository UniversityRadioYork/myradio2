import React, { useState } from "react";
import gql from "graphql-tag";
import classnames from "classnames";
import { SingleShow } from "./__generated__/SingleShow";
import { AnimatePresence, motion } from "framer-motion";
import { Intent, Spinner } from "@blueprintjs/core";
import { useQuery } from "@apollo/react-hooks";
import { MyShows, MyShowsVariables } from "./__generated__/MyShows";
import { useHistory } from "react-router-dom";
import { SINGLE_SHOW_SCREEN_DATA } from "./SingleShow";
import { useTransition } from "../../lib/helpers/useTransition";
import { useDispatch } from "react-redux";
import {
  hideGlobalSpinner,
  showGlobalSpinner,
} from "../../components/Navigation/state";

const SINGLE_SHOW_FRAGMENT = gql`
  fragment SingleShow on Show {
    id
    itemId
    title
    allSeasons {
      id
    }
  }
`;

function SingleShowView({ show }: { show: SingleShow }) {
  const hist = useHistory();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const outTransition = useTransition(SINGLE_SHOW_SCREEN_DATA);

  function exit(show: SingleShow) {
    outTransition(
      {
        itemId: show.itemId,
      },
      () => {
        hist.push(`/scheduler/shows/${show.itemId}`);
        dispatch(hideGlobalSpinner());
      },
      () => {
        setPending(true);
        dispatch(showGlobalSpinner());
      }
    );
  }

  return (
    <motion.div
      className="myr-card"
      initial={{ opacity: 0, translateZ: -1000 }}
      animate={{ opacity: 1, translateZ: 0 }}
      exit={{ opacity: 0, translateZ: 1000 }}
    >
      <motion.span className="card-title">{show.title}</motion.span>{" "}
      <span className="card-subtitle">
        ({show.allSeasons?.length}{" "}
        {show.allSeasons?.length === 1 ? "season" : "seasons"})
      </span>
      <div className="card-buttons">
        <button
          className={classnames("card-button", pending && "pending")}
          onClick={() => exit(show)}
        >
          Edit Show
        </button>
        <button className="card-button">Apply for New Season</button>
        <a className="card-button">View Microsite</a>
      </div>
    </motion.div>
  );
}

const MY_SHOWS_QUERY = gql`
  query MyShows($thisTerm: Boolean) {
    me {
      shows(current_term_only: $thisTerm) {
        id
        ...SingleShow
      }
    }
  }
  ${SINGLE_SHOW_FRAGMENT}
`;

export default function ListShows() {
  const [onlyThisTerm, setOnlyThisTerm] = useState(true);
  const { data, loading, error } = useQuery<MyShows, MyShowsVariables>(
    MY_SHOWS_QUERY,
    {
      variables: {
        thisTerm: onlyThisTerm,
      },
    }
  );

  return (
    <div>
      <motion.h1 layoutId="title">Your Shows</motion.h1>
      {onlyThisTerm ? (
        <span>
          Viewing only shows this term.{" "}
          <button
            className="btn-link"
            onClick={() => setOnlyThisTerm(!onlyThisTerm)}
          >
            Click here
          </button>{" "}
          to view all your shows.
        </span>
      ) : (
        <span>
          Viewing all your shows.{" "}
          <button
            className="btn-link"
            onClick={() => setOnlyThisTerm(!onlyThisTerm)}
          >
            Click here
          </button>{" "}
          to view only your shows this term..
        </span>
      )}
      {loading && (
        <div>
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_LARGE} />
          <b>Loading...</b>
        </div>
      )}
      {error && (
        <div>
          <b>Whoops! Something exploded!</b>
          <p>
            <code>{error.toString()}</code>
          </p>
        </div>
      )}
      <AnimatePresence>
        {data &&
          data.me?.shows
            ?.filter((x) => !!x)
            .map((show) => <SingleShowView key={show.id} show={show!} />)}
      </AnimatePresence>
    </div>
  );
}
