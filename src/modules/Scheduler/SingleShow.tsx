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
import Card from "../../components/Card";

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
            <Card
              key={ep.itemId}
              title={`Episode ${ep.timeslotNumber}`}
              subtitle={format(parseISO(ep.startTime), "dd/MM/yyyy HH:mm")}
              buttons={[
                { label: "Plan Show" },
                { label: "Studio Information Service" },
                { label: "Cancel Episode", danger: true },
              ]}
            />
          ))}
      </div>
      <div className="past">
        <h4>Past Episodes</h4>
        {episodes
          .filter((ep) => isBefore(parseISO(ep.startTime), now))
          .map((ep) => (
            <Card
              key={ep.itemId}
              title={`Episode ${ep.timeslotNumber}`}
              subtitle={format(parseISO(ep.startTime), "dd/MM/yyyy HH:mm")}
              buttons={[{ label: "Audio Log" }, { label: "Mixcloud" }]}
            />
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
      <Card
        title={`Season ${season.seasonNumber}`}
        buttons={[{ label: "Edit Season", action: () => {} }]}
        expandoLabel="View Episodes"
      >
        {season.allTimeslots !== null && (
          <SeasonEpisodes
            episodes={
              season.allTimeslots.filter(
                (x) => x !== null
              ) as SingleShowDetailData_show_allSeasons_allTimeslots[]
            }
          />
        )}
      </Card>
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
        <Card
          size="giant"
          title={show.title}
          breadcrumbs={[{ label: "My Shows", location: "/scheduler/shows" }]}
        >
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
        </Card>
      );
    }
  }

  throw new Error("WAT!");
}
