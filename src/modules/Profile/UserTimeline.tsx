import React from "react";
import gql from "graphql-tag";
import { UserTimeline, UserTimeline_timeline } from "./__generated__/UserTimeline";

export const USER_TIMELINE_FRAGMENT = gql`
  fragment UserTimeline on User {
    timeline {
      __typename
      message
      timestamp
      photo
    }
  }
`;

export default function({ timeline }: { timeline: UserTimeline_timeline[] | null }) {
    if (timeline === null) {
        return null;
    }
    return (
        <ul>
            {timeline.map(x => ({...x, _date: new Date(x.timestamp)})).sort((a, b) => b._date.valueOf() - a._date.valueOf()).map((entry, idx) => (
                <li key={entry.timestamp + idx}>
                    {entry._date.toLocaleDateString()} &mdash; {entry.message}
                </li>
            ))}
        </ul>
    )
}
