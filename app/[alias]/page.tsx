"use client"
import checkValidityAlias from "@/lib/checkValidityAlias";
import {useParams} from "next/navigation";
import {redirect} from "next/navigation";

export default async function urlRedirect(){
    const params = useParams<{ alias: string }>();
    const res =await checkValidityAlias(params.alias);

    if(res === null)
        return redirect(`/error`);
    
    return redirect(res);
}