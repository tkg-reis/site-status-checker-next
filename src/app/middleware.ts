import { NextResponse } from "next/server";

export function middleware(request : Request) {
    const requestHeader = new Headers(request.headers);
    requestHeader.set('target-url', request.url);

    return NextResponse.next({
        request : {
            headers : requestHeader
        }
    });
}