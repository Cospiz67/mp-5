"use client"

import Image from "next/image";
import styles from "./page.module.css";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import createNewURL from "@/lib/createNewURL";
import checkValidityAlias from "@/lib/checkValidityAlias";

const StyledDiv = styled.div`
  min-height: 100vh;
`
const StyledHeader = styled.div`
  background-color: red;
`
const StyledH1 = styled.h1`
  font-size: calc(2px + 2.5vw);
  font-weight:bold;
`
const StyledH3 = styled.h3`
  font-size: calc(2px + 1vw);
  color: black;
`
const StyledCard = styled.div`
  background-color: orange;
  width: 50%;
  padding: 10%;
  border-radius: 5px;
`
const StyledInput = styled.input`
  width: 100%;
`

const StyledLabel = styled.label`

`

const StyledButton = styled.button`
`

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const button = document.getElementById("button") as HTMLButtonElement;
  // const input = document.getElementById("inputAlias") as HTMLInputElement;

  function createShortCut(){
    createNewURL(url, alias).catch((err)=> console.log(err));
  }

  function checkURL(){

  }

  async function checkAlias(e:ChangeEvent<HTMLInputElement>){
    const input = document.getElementById("inputAlias") as HTMLInputElement;
    input.setCustomValidity("");
    const res = await checkValidityAlias(e.target.value);
    if(res ===true)
    {
      console.log("invalid alias: already taken!");
      input.setCustomValidity("invalid alias!!!");
      input.reportValidity();
      button.disabled = true;
    }
    else{
      button.disabled = false;
    }
    setAlias(e.target.value)
  }

  return (
    <>
      <StyledDiv>
        <StyledHeader>
          <StyledH1>URL Shortener</StyledH1>
          <StyledH3>Type the URL you want and shorten it!</StyledH3>
        </StyledHeader>
        <StyledCard>
          <StyledLabel htmlFor="URL to shorten">URL to shorten:</StyledLabel>
          <StyledInput required placeholder="ex:https://example.com" onChange={(e)=> setUrl(e.target.value)}></StyledInput>
          <StyledLabel htmlFor="https://vercel.app/">https://vercel.app/</StyledLabel>
          <StyledInput id ="inputAlias" required placeholder="alias" onChange={(e)=>checkAlias(e)}></StyledInput>
          <StyledButton id="button" type="submit" onClick={createShortCut}>Click to Shorten URL</StyledButton>
        </StyledCard>
      </StyledDiv>
    </>
  );
}
