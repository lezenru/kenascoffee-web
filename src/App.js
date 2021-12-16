import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import {client, darkModeVar, isLoggedInVar} from "./apollo";
import {ApolloProvider, useReactiveVar} from "@apollo/client";
import Login from "./screens/Login";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import {HelmetProvider} from "react-helmet-async";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import AddShop from "./screens/AddShop";
import CoffeeShop from "./screens/CoffeeShop";



function App() {

    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isDarkMode = useReactiveVar(darkModeVar);

  return (
      <ApolloProvider client={client}>
          <HelmetProvider>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles/>
        <BrowserRouter>

          <Routes>

            <Route path="/" element={isLoggedIn ? <Home /> : <Login />}/>
             {/*회원가입 페이지 (로그인 시에만 보임)*/}
              {!isLoggedIn
                  ? (<Route path={routes.signUp} element={ <SignUp />}/>)
                  : null}
              {/*커피샵 생성 페이지 (로그인 시에만 가능)*/}
              {isLoggedIn
                  ? (<Route path={routes.addShop} element={ <AddShop/>}/>)
                  : null}
              {/*커피샵 개별 확인 페이지*/}
              <Route path={`/shop/:id`} element={<CoffeeShop/>}/>


            <Route path="*" element={<NotFound/>}/>
          </Routes>

        </BrowserRouter>

      </ThemeProvider>
          </HelmetProvider>
      </ApolloProvider>
  );
}

export default App;
