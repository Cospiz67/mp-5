"use server";
import checkValidityAlias from "@/lib/checkValidityAlias";
import {redirect} from "next/navigation";

export default async function urlRedirect({params}:{params:Promise<{alias:string}>}){
    const res = await checkValidityAlias((await params).alias);
    console.log(res);
    if(res === null)
        redirect(`/error`);
    redirect(res);
}