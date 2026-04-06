"use server";
import checkValidityAlias from "@/lib/checkValidityAlias";
import Link from "next/link";
import styled from "styled-components";
import {redirect} from "next/navigation";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10% auto;
`

export default async function urlRedirect({params}:{params:Promise<{alias:string}>}){
    const res = await checkValidityAlias((await params).alias);
    if(res === null)
    {
        return(
            <StyledDiv>
                <p>There was an error with this URL</p>
                <Link href="/">Go to Home page</Link>
            </StyledDiv>
        )
    }
    redirect(res);
}