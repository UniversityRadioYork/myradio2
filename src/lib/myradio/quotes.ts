import { makeNoArgObjectRequestor, makeNoArgRequestor } from "./request";

export interface QuoteBody {
    source: string;
    date: string;
    text: string;
}

export interface Quote extends QuoteBody {
    id: number;
}

/**
 * The station quotes database.
 */
export const quotes = {
    /**
     * Retrieve all current quotes.
     */
    getAll: makeNoArgRequestor<Quote[]>("GET", "/quote/all"),
    /**
     * Retrieve a random quote.
     */
    getRandom: makeNoArgRequestor<Quote>("GET", "/quote/random"),

    /**
     * Retrieve a quote, given its ID.
     */
    get: makeNoArgObjectRequestor<QuoteBody>("POST", "/quote/{id"),

    /**
     * Create a new quote.
     */
    create: makeNoArgRequestor<QuoteBody>("POST", "/quote")
};
