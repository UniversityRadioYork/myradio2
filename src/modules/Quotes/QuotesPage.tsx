import React, {useCallback, useEffect} from "react";
import { Card, Spinner, Button, Intent } from "@blueprintjs/core";
import {useFetch} from "../../lib/helpers/useFetch";
import {Quote} from "./Quote";

export const QuotesPage: React.FC = () => {
    const [quotes, loading, error, getQuotes] = useFetch(useCallback(() => Quote.getAll(), []));

    useEffect(() => {getQuotes()}, []);

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
                {quotes.map(q => (
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
