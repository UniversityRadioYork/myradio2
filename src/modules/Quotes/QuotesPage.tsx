import React, {useCallback, useEffect} from "react";
import { Card, Spinner, Button, Intent } from "@blueprintjs/core";
import {useFetch} from "../../lib/helpers/useFetch";
import {Quote} from "./Quote";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { GetAllQuotes } from "./__generated__/GetAllQuotes";

const GET_QUOTES = gql`
query GetAllQuotes {
    allQuotes {
        id
        date
        text
        source {
            id
            fname
            sname
        }
    }
}
`;

export const QuotesPage: React.FC = () => {
    const { loading, error, data: quotes } = useQuery<GetAllQuotes>(GET_QUOTES);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return (
            <div>
                <b>Oh noes!</b>
                <code>{error.toString()}</code>
            </div>
        );
    }
    if (quotes === null) {
        return null;
    }
    return (
        <div>
            <h1>Quotes Board</h1>
            <div>
                <Button disabled intent={Intent.PRIMARY}>Add Quote</Button>
            </div>
            <div style={{ marginTop: 4 }}>
                {quotes!.allQuotes?.map(q => (
                    <Card key={q.id}>
                        <div>
                            {q.source !== null && <b>{q.source.fname} {q.source.sname}</b>} <small>{q.date}</small>
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: q.text }} />
                    </Card>
                ))}
            </div>
        </div>
    );
};
