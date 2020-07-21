import React, { useState } from "react";
import gql from "graphql-tag";
import { SingleShow } from "./__generated__/SingleShow";
import { AnimatePresence } from "framer-motion";
import { Intent, Spinner, Button, Dialog } from "@blueprintjs/core";
import { useQuery } from "@apollo/react-hooks";
import { MyShows, MyShowsVariables } from "./__generated__/MyShows";
import { useHistory, Route } from "react-router-dom";
import { SINGLE_SHOW_SCREEN_DATA } from "./SingleShow";
import { useTransition } from "../../lib/helpers/useTransition";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import {
  hideGlobalSpinner,
  showGlobalSpinner,
} from "../../components/Navigation/state";
import CreateShowForm from "./CreateShowForm";

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
    <Card
      className="myr-card"
      initial={{ opacity: 0, translateZ: -1000 }}
      animate={{ opacity: 1, translateZ: 0 }}
      exit={{ opacity: 0, translateZ: 1000 }}
      title={show.title}
      subtitle={`(${show.allSeasons?.length} ${
        show.allSeasons?.length === 1 ? "season" : "seasons"
      })`}
      buttons={[
        {
          label: "Edit Show",
          action: () => exit(show),
          pending,
        },
        {
          label: "Apply for New Season",
          action: () => {},
        },
        {
          label: "View Microsite",
          href: `https://ury.org.uk/schedule/shows/${show.itemId}`,
        },
      ]}
    />
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
  const history = useHistory();
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
    <>
      <Card title="Your Shows" size="giant">
        <div>
          <Button
            intent={Intent.PRIMARY}
            onClick={() => history.push("/scheduler/shows/createNew")}
          >
            Create New
          </Button>
        </div>
        {onlyThisTerm ? (
          <span>
            Viewing only shows this term.{" "}
            <button className="btn-link" onClick={() => setOnlyThisTerm(false)}>
              Click here
            </button>{" "}
            to view all your shows.
          </span>
        ) : (
          <span>
            Viewing all your shows.{" "}
            <button className="btn-link" onClick={() => setOnlyThisTerm(true)}>
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
      </Card>
      <Route
        exact
        path="/scheduler/shows/createNew"
        children={({ match }) => (
          <Dialog
            isOpen={match !== null}
            onClose={() => history.push("/scheduler/shows")}
            style={{ background: "white", padding: "2em", minWidth: 750 /* TODO not great on phones */ }}
          >
            <CreateShowForm />
          </Dialog>
        )}
      />
    </>
  );
}
