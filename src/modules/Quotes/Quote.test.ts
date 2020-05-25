import * as request from "../../lib/myradio/request";
import {Quote} from "./Quote";

jest.mock("../../lib/myradio/request");

const testQuote1 = {
    id: 1,
    source: {
        memberid: 1,
        fname: "Testy",
        sname: "Testerman",
        bio: null
    },
    date: "2020/05/25",
    text: "No."
};

describe("Quote", () => {
    describe("fromDataSource", () => {
       it("works", async () => {
          const result = await Quote.fromDataSource(testQuote1);
          expect(result.text).toEqual(testQuote1.text);
          expect(result.date).toEqual(testQuote1.date);
          expect(result.id).toEqual(testQuote1.id);
          expect(result.source).toEqual(testQuote1.source);
       });
    });

    describe("getAll", () => {
        it("works", async () => {
            (request.makeMyradioRequest as jest.MockedFunction<any>).mockResolvedValue([testQuote1]);
            const result = await Quote.getAll();
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(testQuote1);
        });
    });
});