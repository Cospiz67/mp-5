"use client"
import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import createNewURL from "@/lib/createNewURL";
import checkValidityAlias from "@/lib/checkValidityAlias";
import checkValidityURL from "@/lib/checkValidityURL";
import Link from "next/link";

const StyledCard = styled.div`
  background-color: #749ddf;
  width: 50%;
  padding: 5%;
  border-radius: 15px;
  border: 2px solid #3170d5;
  margin: 0 auto;
`
const StyledLabel = styled.label`
    font-weight: bold;
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
    margin: 0% auto;
`
const StyledButton = styled.button`
    background-color: #3170d5;
    padding: 1% 7%;
    border-radius: 75px;
    border: 3px solid white;
    color: white;
    display: flex;
    margin: 0 auto;
    
    &:disabled{
        background-color: #8aa5d195;
        cursor: not-allowed;
    }
`
const ButtonCopy = styled.button`
    background: url("./copy.png");
    background-size: contain;
    height: 5vw;
    width: 5vw;
    border: none;
    margin: 0 auto;
`
const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 4% 0 0;
`
const StyledArea = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledP = styled.p`
    font-weight: bold;
`

export default function CardDisplay() {
    const [mounted, setMounted] = useState(false);
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");

    const [isURLValid, setisURLValid] = useState(false);
    const [isAliasValid, setisAliasValid] = useState(false);

    const [error, setError] = useState("");
    const [result, setResult] = useState("");

    function createShortCut() {
        createNewURL(url, alias).catch((err) => console.log(err));
        setResult("http://localhost:3000/" + alias);
    }

    function checkURL(e: ChangeEvent<HTMLInputElement>) {
        const validity = checkValidityURL(e.target.value);
        setError("");
        setUrl(e.target.value);
        if (!validity) {
            setError("Invalid URL: this URL does not exist.");
            setisURLValid(false);
            return;
        }
        if (e.target.value === "") {
            setisURLValid(false);
            return;
        }
        setisURLValid(true);
    }

    async function checkAlias(e: ChangeEvent<HTMLInputElement>) {
        const validity = await checkValidityAlias(e.target.value);
        setError("");
        setAlias(e.target.value);
        if (validity !== null) {
            setError("Invalid alias: this alias already exists.");
            setisAliasValid(false);
            return;
        }
        if (e.target.value === "") {
            setisAliasValid(false);
            return;
        }
        setisAliasValid(true);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    } //this is to avoid tree hydration with the button

    async function copyLink(e: React.MouseEvent<HTMLButtonElement>){
        const button = e.currentTarget; 
        await navigator.clipboard.writeText(window.location.href+alias);
        button.style.background= "url(./copy_done.png)";
        button.style.backgroundSize = "contain";
    }

    return (
        <StyledCard>
            <StyledLabel htmlFor="URL to shorten">URL to shorten:</StyledLabel>
            <StyledInputURL required autoComplete="off" placeholder="ex: https://example.com" onChange={(e) => checkURL(e)}></StyledInputURL>
            <StyledP>Customized URL:</StyledP>
            <label htmlFor="https://vercel.app/">https://vercel.app/</label>
            <StyledInputAlias required autoComplete="off" placeholder="alias" onChange={(e) =>checkAlias(e)}></StyledInputAlias>
            <StyledError>{error}</StyledError>
            <StyledButton onClick={createShortCut} disabled={!(isAliasValid && isURLValid)}>Click to Shorten URL</StyledButton>
            {result &&
            (<StyledDiv>
                <StyledArea>
                    <StyledP>Shortened URL:</StyledP>
                    <StyledResult href={`/${alias}`}>{result}</StyledResult>
                </StyledArea>
                <ButtonCopy onClick={(e)=> copyLink(e)}></ButtonCopy> 
            </StyledDiv>)}
        </StyledCard>
    )
} 