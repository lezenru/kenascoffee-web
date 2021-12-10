import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import {isDarkModeVar, isLoggedInVar} from "./apollo";
import {useReactiveVar} from "@apollo/client";
import Login from "./screens/Login";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";



function App() {

    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isDarkMode = useReactiveVar(isDarkModeVar);

  return (

      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
          </GlobalStyles>
      </ThemeProvider>

  );
}

export default App;
