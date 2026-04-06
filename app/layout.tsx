import "./globals.css";
import Header from "../components/Header";
import styled from "styled-components";

const StyledDiv = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #aecaf6 0%, #7fb7d1 100%);
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>URL Shortener</title>
      <body>
        <StyledDiv>
          <Header/>
          {children}
        </StyledDiv>
      </body>
    </html>
  );
}
