import {makeCeedoxRequest} from "./request";


export async function getPageHTML(pageName: string) {
    const result = await makeCeedoxRequest("wiki.getPageHTML", `<param>
    <value><string>${pageName}</string></value>
</param>`);
    return result.querySelector("params param value string")!.textContent;
}
