import {ApolloClient, createHttpLink, HttpLink, InMemoryCache, makeVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";
const HTTP_LINK = createHttpLink({
    uri: process.env.NODE_ENV === "production"
        ? 'https://kenascoffeeshop.herokuapp.com/graphql'
        : 'http://localhost:4000/graphql',
});

export const isLoggedInVar =
    makeVar(Boolean(localStorage.getItem(TOKEN)));

export const darkModeVar =
    makeVar(Boolean(localStorage.getItem(DARK_MODE) === "enabled"));

// 다크모드 *************************************
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true)
}

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false)
}


//로그인-아웃 관리 *******************************
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
}

export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    window.location.reload();
}


// 헤더에 토큰 주입 (?) -- 성공
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(TOKEN);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            token: token ? token : "",
        }
    }
});


//백엔드 환경 ***********************************
export const client = new ApolloClient({
    link: authLink.concat(HTTP_LINK),
    cache: new InMemoryCache(),
})