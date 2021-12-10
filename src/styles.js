import {createGlobalStyle} from "styled-components";

export const lightTheme = {
    fontColor: "black",
    bgColor: "lightgray",

};
export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "black",
};

export const GlobalStyles = createGlobalStyle`
  body{
    color: ${props => props.theme.fontColor};
    background-color: ${props => props.theme.bgColor};
  }
`;
