const CEEDOX_XMLRPC_BASE = "https://ury.org.uk/ceedox/lib/exe/xmlrpc.php";

export class CeedoxAPIError extends Error {}

const parser = new DOMParser();

export async function makeCeedoxRequest(
    methodName: string,
    paramsXml?: string
): Promise<Element> {
    const res = await fetch(CEEDOX_XMLRPC_BASE, {
        method: "post",
        headers: {
            "Content-Type": "application/xml"
        },
        // language=XML
        body: `<?xml version="1.0" encoding="UTF-8"?>
        <methodCall>
            <methodName>${methodName}</methodName>
            <params>
            ${paramsXml}
            </params>
        </methodCall>`
    });

    const doc = parser.parseFromString(await res.text(), "application/xml");
    if (doc.firstElementChild!.nodeName !== "methodResponse") {
        throw new Error("Invalid XML received from Ceedox");
    }

    return doc.firstElementChild!;
}
