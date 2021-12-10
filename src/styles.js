import {createGlobalStyle} from "styled-components";

export const lightTheme = {
    fontcolor: "darkgray",
    bgColor: "lightgray",

};
export const darkTheme = {
    fontcolor: "lightgray",
    bgColor: "darkgray",
};

export const GlobalStyles = createGlobalStyle`
  body{
    color: ${props => props.theme.fontcolor};
    background-color: ${props => props.theme.bgColor};
  }
`;