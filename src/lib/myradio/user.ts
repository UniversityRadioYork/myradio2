import { makeArgRequestor, makeNoArgRequestor } from "./request";

export interface Member {
    memberid: number;
    fname: string;
    sname: string;
    public_email: string;
    url: string;
    photo: string;
    bio: string;
}

export interface MemberSearchResult {
    memberid: number;
    fname: string;
    sname: string;
    eduroam: string;
    local_alias: string;
}


export const user = {
    findByName: makeArgRequestor<string, MemberSearchResult[]>("GET", "/user/findbyname/{1}"),
    currentUser: makeNoArgRequestor<Member>("GET", "/user/currentuser")
}
