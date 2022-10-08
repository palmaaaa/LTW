import React, {useMemo, useState} from 'react';
import {Content, Playbar, Navbar} from './containers'
import './App.css'
import {views} from "./enums/views";
import ProfileAndSettings from "./components/js/ProfileAndSettings";
import {Login, RegisterForm} from "./components";
import {pages} from "./enums/pages";
import NewDevice from "./components/js/forms/NewDevice";
import defaultProfilePicture from "./assets/img/default-profile-picture.jpg"
import {sendRequest} from "./scripts/serverInteraction";
import {getUrlFromByteArray} from "./scripts/fileProcessing";
import {PageContext, UserDataContext, ViewContext} from "./context/context";


const App = () => {

    const [view, setView] = useState({view: views.HOME});
    const valueView = useMemo(() => ({ view, setView }), [view]);

    const [page, setPage] = useState({page: pages.LOGIN})
    const valuePage = useMemo(() => ({ page, setPage }), [page]);

    const [userData, setUserData] = useState({username: undefined, profilePicUrl: undefined});
    const userDataValue = useMemo(() => ({ userData, setUserData }), [userData]);


    const [currentSong, setCurrentSong] = useState(undefined)
    const [isCurrentSongLoading, setIsCurrentSongLoading] = useState(false)


    function toggleNavbar() {
        document.querySelector("body").classList.toggle("active");
    }

    async function fetchProfilePic() {
        if (userData.profilePicUrl === undefined && userData.username !== undefined) {
            let requestObject = {
                request: "GET_PROFILE_PIC",
                username: userData.username
            }

            let response = await sendRequest('POST', 'getrequest', requestObject);
            let json = await response.json();

            let profilePicUrl = json.Foto ? getUrlFromByteArray(json.Foto) : defaultProfilePicture
            setUserData((state)=> ({
               ...state,
               profilePicUrl
            }))
        }
    }


    function renderPage() {
        switch (page.page) {
            case pages.LOGIN:
                return <Login setView={setView}/>;
            case pages.REGISTER:
                return <RegisterForm />;
            case pages.NEW_DEVICE:
                return <NewDevice/>
            case pages.MUSIC_CONTENT:
                fetchProfilePic().then();
                return (
                    <>
                        <ProfileAndSettings setPage={setPage}/>
                        <Content isCurrentSongLoading={isCurrentSongLoading}
                                 setIsCurrentSongLoading={setIsCurrentSongLoading} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
                        <Navbar toggleNavbar={toggleNavbar} currentSong={currentSong}
                                isCurrentSongLoading={isCurrentSongLoading}/>
                        <Playbar currentSong={currentSong}/>
                    </>
                );
        }
    }

    return (
        <div className='main-container'>
            {/*<ServerTest/>*/}
            <UserDataContext.Provider value={userDataValue}>
                <PageContext.Provider value={valuePage}>
                    <ViewContext.Provider value={valueView}>
                        {renderPage()}
                    </ViewContext.Provider>
                </PageContext.Provider>
            </UserDataContext.Provider>
        </div>
    )
}
export default App