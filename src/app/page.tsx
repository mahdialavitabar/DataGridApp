// @ts-ignore
//prettier-ignore
'use client';


import {QueryClient, QueryClientProvider} from "react-query";
import * as React from "react";

import {Main} from "@/components/main";
export default function Home() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>

    <main className=" p-4 ">
<title>تست شرکت آسرون</title>
<Main/>
    </main>

</QueryClientProvider>

    )
}
