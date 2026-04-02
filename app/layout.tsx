import "./globals.css";
import Header from "../components/Header";
import styled from "styled-components";

const StyledDiv = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledDiv>
          <Header/>
          {children}
        </StyledDiv>
      </body>
    </html>
  );
}
