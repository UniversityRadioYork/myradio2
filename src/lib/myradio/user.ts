import * as Yup from "yup";
import { makeArgRequestor, makeNoArgRequestor } from "./request";

export interface Member {
    memberid: number;
    fname: string;
    sname: string;
    public_email: string;
    url: string;
    photo: string;
    bio: string | null;
}

export interface MemberSearchResult {
    memberid: number;
    fname: string;
    sname: string;
    eduroam: string;
    local_alias: string;
}

export const UserSchema = Yup.object({
    memberid: Yup.number().required(),
    fname: Yup.string().required(),
    sname: Yup.string().required(),
    eduroam: Yup.string(),
    local_alias: Yup.string(),
    public_email: Yup.string(),
    url: Yup.string(),
    photo: Yup.string(),
    bio: Yup.string().nullable()
})

export const user = {
    findByName: makeArgRequestor<string, MemberSearchResult[]>("GET", "/user/findbyname/{1}"),
    currentUser: makeNoArgRequestor<Member>("GET", "/user/currentuser")
}
