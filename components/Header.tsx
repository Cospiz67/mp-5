import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: #3170d5;
`
const StyledH1 = styled.h1`
  font-size: calc(2px + 2.5vw);
  font-weight:bold;
  padding: 0 1%;
`
const StyledH3 = styled.h3`
  font-size: calc(2px + 1vw);
  padding: 0 1% 1%;
`
export default function Header(){
    return(
        <StyledHeader>
          <StyledH1>URL Shortener</StyledH1>
          <StyledH3>Type the URL you want and shorten it!</StyledH3>
        </StyledHeader>
    )
}