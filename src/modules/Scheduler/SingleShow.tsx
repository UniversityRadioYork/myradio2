import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  SingleShowScreenData,
  SingleShowScreenDataVariables,
} from "./__generated__/SingleShowScreenData";
import { Intent, Spinner, Icon } from "@blueprintjs/core";
import {
  SingleShowDetailData,
  SingleShowDetailData_show_allSeasons,
  SingleShowDetailData_show_allSeasons_allTimeslots,
  SingleShowDetailDataVariables,
} from "./__generated__/SingleShowDetailData";
import { IconNames } from "@blueprintjs/icons";
import { compareDesc, format, isAfter, isBefore, parseISO } from "date-fns";
import "./SingleShow.scss";

export const SINGLE_SHOW_FRAGMENT = gql`
  fragment SingleShow on Show {
    id
    itemId
    title
    description
    allSeasons {
      id
      itemId
      seasonNumber
      firstTime
    }
  }
`;

export const SINGLE_SHOW_SCREEN_DATA = gql`
  query SingleShowScreenData($itemId: Int!) {
    show(itemid: $itemId) {
      ...SingleShow
    }
  }
  ${SINGLE_SHOW_FRAGMENT}
`;

const SINGLE_SHOW_DETAIL_DATA = gql`
  query SingleShowDetailData($itemId: Int!) {
    show(itemid: $itemId) {
      id
      allSeasons {
        id
        itemId
        seasonNumber
        firstTime
        allTimeslots {
          itemId
          startTime
          endTime
          timeslotNumber
        }
      }
    }
  }
`;

function SeasonEpisodes({
  episodes,
}: {
  episodes: SingleShowDetailData_show_allSeasons_allTimeslots[];
}) {
  const now = new Date();
  return (
    <motion.div className="season-episodes-container">
      <div className="future">
        <h4>Upcoming Episodes</h4>
        {episodes
          .filter((ep) => isAfter(parseISO(ep.startTime), now))
          .map((ep) => (
            <motion.div key={ep.itemId} className="myr-card">
              <div className="card-title">
                Episode {ep.timeslotNumber} &ndash;{" "}
                <span className="card-subtitle">
                  {format(parseISO(ep.startTime), "dd/MM/yyyy HH:mm")}
                </span>
              </div>
              <div className="card-buttons">
                <button className="card-button">Show Planner</button>
                <button className="card-button">SIS</button>
                <button className="card-button">WebStudio</button>
                <button className="card-button danger">Cancel</button>
              </div>
            </motion.div>
          ))}
      </div>
      <div className="past">
        <h4>Past Episodes</h4>
        {episodes
          .filter((ep) => isBefore(parseISO(ep.startTime), now))
          .map((ep) => (
            <motion.div key={ep.itemId} className="myr-card">
              <div className="card-title">
                Episode {ep.timeslotNumber} &ndash;{" "}
                <span className="card-subtitle">
                  {format(parseISO(ep.startTime), "dd/MM/yyyy HH:mm")}
                </span>
              </div>
              <div className="card-buttons">
                <button className="card-button">Audio Log</button>
                <button className="card-button">Mixcloud</button>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}

function ShowSeason({
  season,
}: {
  season: SingleShowDetailData_show_allSeasons;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatePresence>
      <motion.div className="myr-card">
        <div className="card-title">Season {season.seasonNumber}</div>
        <div className="card-buttons">
          <button className="card-button">Edit Season</button>
        </div>
        <div className="expando" onClick={() => setExpanded(!expanded)}>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            style={{
              display: "inline-block",
              transformOrigin: "0.5em center",
            }}
          >
            <Icon
              icon={IconNames.CHEVRON_DOWN}
              iconSize={Icon.SIZE_LARGE}
              className="expando-icon"
            />
          </motion.span>
          View Episodes
        </div>
        {expanded && season.allTimeslots !== null && (
          <motion.div
            className="body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SeasonEpisodes
              episodes={
                season.allTimeslots.filter(
                  (x) => x !== null
                ) as SingleShowDetailData_show_allSeasons_allTimeslots[]
              }
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function SingleShowScreen() {
  const loc = useParams<{ id: string }>();
  const { data: baseData, error: baseError, loading: baseLoading } = useQuery<
    SingleShowScreenData,
    SingleShowScreenDataVariables
  >(SINGLE_SHOW_SCREEN_DATA, {
    variables: {
      itemId: parseInt(loc.id, 10),
    },
  });

  const {
    data: detailData,
    error: detailError,
    loading: detailLoading,
  } = useQuery<SingleShowDetailData, SingleShowDetailDataVariables>(
    SINGLE_SHOW_DETAIL_DATA,
    {
      variables: {
        itemId: parseInt(loc.id, 10),
      },
    }
  );

  if (baseLoading) {
    return (
      <div>
        <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_LARGE} />
        <b>Loading...</b>
      </div>
    );
  }

  if (baseError || detailError) {
    return (
      <div>
        <b>Whoops! Something exploded!</b>
        <p>
          <code>{(baseError || detailError)?.toString()}</code>
        </p>
      </div>
    );
  }

  if (baseData) {
    const show = baseData.show;
    if (show) {
      return (
        <motion.div layoutId={`show-${show.itemId}-container`}>
          <motion.h1 animate layoutId={`title`}>
            {show.title}
          </motion.h1>
          {show.description && (
            <p dangerouslySetInnerHTML={{ __html: show.description }} />
          )}
          {detailLoading && <Spinner size={Spinner.SIZE_LARGE} />}
          {detailData && (
            <>
              {detailData?.show?.allSeasons
                ?.filter((x) => !!x)
                .sort((a, b) => {
                  return compareDesc(
                    parseISO(a?.firstTime),
                    parseISO(b?.firstTime)
                  );
                })
                .map((season) => (
                  <ShowSeason key={season!.id} season={season!} />
                ))}
            </>
          )}
        </motion.div>
      );
    }
  }

  throw new Error("WAT!");
}
