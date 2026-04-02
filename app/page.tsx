"use client"
import styled from "styled-components";
import CardDisplay from "@/components/CardDisplay";

const StyledDiv = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
`

export default function Home() {
  return (
      <StyledDiv>
        <CardDisplay/>
      </StyledDiv>
  );
}
