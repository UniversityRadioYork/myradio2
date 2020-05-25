import * as Yup from "yup";
import {Member, UserSchema} from "../../lib/myradio/user";
import {makeMyradioRequest, MyRadioApiConfig} from "../../lib/myradio/request";

export const QuoteSchema = Yup.object({
    source: UserSchema.required(),
    date: Yup.string().required(),
    text: Yup.string().required(),
    id: Yup.number()
})

export class Quote {
    private constructor(
        public readonly source: Member | null,
        public readonly date: string,
        public readonly text: string,
        public readonly id?: number,
        private alreadyExists: boolean = false
    ) {}

    public async update(data: Yup.InferType<typeof QuoteSchema>) {
        if (!this.alreadyExists) {
            throw new Error("Can't update a non-existent type!");
        }
        data = await QuoteSchema.validate(data);

        if (this.source === null || this.source.memberid !== data.source.memberid) {

        }
    }

    public static async fromDataSource(data: any) {
        const val = await QuoteSchema.validate(data);
        return new Quote(val.source, val.date, val.text, val.id, true);
    }

    public static newEmpty() {
        return new Quote(null, "", "");
    }

    public static async getAll(config?: MyRadioApiConfig) {
        const quotes = await makeMyradioRequest(config, "GET", "/quote/all", {});
        return Promise.all((quotes as any[]).map(Quote.fromDataSource));
    }
}
