import React, {useEffect} from 'react';
import '../../css/utility/Volume.css';
import '../../css/utility/MusicPlayer.css';

const Volume = (props) => {

    // const musicHandler = (e)=> {
    //     // document.getElementById("progress-bar").style.width = ((e.target.currentTime/e.target.duration)*100)+"%";
    // };

    function selectVolume(e){
        let widthX = document.getElementById("volumeBar").offsetWidth;
        let barX = e.nativeEvent.offsetX;
        let percentageOfBar = barX/widthX*100;
        document.getElementById("selectedVolume").style.width = percentageOfBar+"%";
        props.setVolume(percentageOfBar/100);
    };

    return (
        <div className={"music-volume-bar mt-1 p-0"} id={"volumeBar"} onClick={selectVolume}>
            <div className={"progress-bar-volume m-0 p-0"} id={"selectedVolume"}> </div>
        </div>
    )
}
export default Volume