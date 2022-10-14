import {createContext} from "react";

export const ViewContext = createContext({
    view: {},
    setView: () => {},
});

export const PageContext = createContext({
    page: {},
    setView: () => {},
});

export const UserDataContext = createContext({
    userData: {},
    setUserData: () => {}
})