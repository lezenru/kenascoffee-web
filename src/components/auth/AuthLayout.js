import styled from "styled-components";
import {useReactiveVar} from "@apollo/client";
import {darkModeVar, disableDarkMode, enableDarkMode} from "../../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-regular-svg-icons";

const SAuthLayout = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`

`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function AuthLayout({children}){
    const darkMode = useReactiveVar(darkModeVar);
 return (
     <SAuthLayout>
      <Wrapper>
       {children}
      </Wrapper>
         <Footer>
             <DarkModeBtn onClick={darkMode? disableDarkMode : enableDarkMode}>
                 <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
             </DarkModeBtn>
         </Footer>
     </SAuthLayout>
 );
}

export default AuthLayout;