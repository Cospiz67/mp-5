"use client"
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import createNewURL from "@/lib/createNewURL";
import checkValidityAlias from "@/lib/checkValidityAlias";
import checkValidityURL from "@/lib/checkValidityURL";
import Link from "next/link";

const StyledCard = styled.div`
  background-color: #749ddf;
  width: 50%;
  padding: 5%;
  border-radius: 15px;
  margin: 0 auto;
`
const StyledInputURL = styled.input`
  width: 100%;
  margin: 0 0 4%;
`
const StyledInputAlias = styled.input`
    width: 35%;
    margin: 0 1% 4%;
`
const StyledError = styled.p`
  color: #e52828;
  margin-bottom: 4%;
  font-weight: bold;
  text-align:center;
`
const StyledResult = styled(Link)`
`

export default function CardDisplay() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [isDisabled, setisDisabled] = useState(true);
    const [error, setError] = useState("");
    const [result, setResult] = useState("");

    function createShortCut() {
        createNewURL(url, alias).catch((err) => console.log(err));
        setResult("https://localhost:3000/"+alias);
    }

    // function checkURL(e: ChangeEvent<HTMLInputElement>) {
    //     setError("");
    //     if (e.target.value === "") {
    //         setisDisabled(true);
    //         return;
    //     }
    //     const urlIsValid = checkValidityURL(e.target.value);
    //     if (!urlIsValid) {
    //         setisDisabled(true);
    //         setError("Invalid URL: this URL does not exist.");
    //     }
    //     setUrl(e.target.value);
    // }
    function checkURL(e: ChangeEvent<HTMLInputElement>) {
        const urlIsValid = checkValidityURL(e.target.value);
        setError("");
        changeButton();
        if (!urlIsValid) {
            setError("Invalid URL: this URL does not exist.");
            setisDisabled(true);
            return;
        }
        setUrl(e.target.value);
    }

    // async function checkAlias(e: ChangeEvent<HTMLInputElement>) {
    //     const res = await checkValidityAlias(e.target.value);
    //     setError("");
    //     if (e.target.value === "") {
    //         setisDisabled(true);
    //         return;
    //     }

    //     if (res !== null) {
    //         setError("Invalid alias: this alias already exists.");
    //         setisDisabled(true);
    //         return;
    //     }

    //     setisDisabled(url === "");
    //     setAlias(e.target.value)
    // }

    async function checkAlias(e: ChangeEvent<HTMLInputElement>) {
        const res = await checkValidityAlias(e.target.value);
        setError("");
        changeButton();
        if (res !== null) {
            setError("Invalid alias: this alias already exists.");
            setisDisabled(true);
            return;
        }
        setAlias(e.target.value);
    }

    function changeButton(){
        if(url!=="" && alias !== "")
            setisDisabled(false);
    }

    return (
        <StyledCard>
            <label htmlFor="URL to shorten">URL to shorten:</label>
            <StyledInputURL required placeholder="ex: https://example.com" onChange={(e) => checkURL(e)}></StyledInputURL>
            <label htmlFor="https://vercel.app/">https://vercel.app/</label>
            <StyledInputAlias required placeholder="alias" onChange={(e) => checkAlias(e)}></StyledInputAlias>
            <StyledError>{error}</StyledError>
            <button onClick={createShortCut} >Click to Shorten URL</button>
            <StyledResult href={result}>{result}</StyledResult>
        </StyledCard>
    )
} 