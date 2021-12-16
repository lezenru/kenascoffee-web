import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    fontColor: "black",
    bgColor: "white",
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)"


};
export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "black",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all:unset;
  }
  * {
    box-sizing:border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    font-size:14px;
    color: ${(props) => props.theme.fontColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
