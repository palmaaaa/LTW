import React, {useEffect, useState} from 'react';
import '../css/Playbar.css';
import repeatIcon from '../../assets/img/RepeatIcon.png';
import shuffleIcon from '../../assets/img/ShuffleIcon.png';
import volumeIcon from '../../assets/img/VolumeIcon.png';
import volumeIconMuted from '../../assets/img/VolumeIconMuted2.png';
import nextIcon from '../../assets/img/NextIcon.png';
import pauseIcon from '../../assets/img/PlayIcon.png';
import playIcon from '../../assets/img/PlayIcon2.png';
import prevIcon from '../../assets/img/PreviousIcon.png';
import addToPlaylistIcon from '../../assets/img/AddToPlaylistIcon.png';
import MusicBar from '../../assets/img/MusicBar.png';
import MusicPlayer from "../../components/js/utility/MusicPlayer";
import Volume from "../../components/js/utility/Volume";

const Playbar = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [mute,setMute] = useState(0);

    useEffect(()=>{
    });

    function shrinkEffect(target){
        document.getElementById(target).style.transform = "scale(110%)";
        setTimeout(()=>{
            document.getElementById(target).style.transform = "scale(100%)";
        },100);
    }

    function playMusic(){
        setIsPlaying(!isPlaying);
        shrinkEffect("playBtn");
        //AGGIUNGI FEATURE PLAYING
    }

    function nextSong(){
        shrinkEffect("nextBtn");
    }

    function prevSong(){
        shrinkEffect("prevBtn");

    }

    function reduceSongTitle() {
        return props.currentSong.title.length > 10 ?
            props.currentSong.title.substring(0, 9) + "..." : props.currentSong.title;
    }

    // ShuffleIcon as constant
    const shuffle = <button className="music-settings-icon">
        <img className="" src={shuffleIcon} width={12} height={13}/></button>;

    //RepeatIcon as constant
    const repeat = <button className="music-settings-icon">
        <img className="" src={repeatIcon} width={15} height={14}/></button>;


    return (
        <div className="playbar-container container-fluid m-0" >

            <div className="playbar-sx col-5 ">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-4 p-0" >
                            <div className="music-info">

                                <button className="artist-info ">
                                    {props.currentSong !== undefined && <p className="playbar-song-title">{reduceSongTitle()}</p>}
                                </button>

                                <button className="artist-info">
                                    {props.currentSong !== undefined && <p className="playbar-album-name">{props.currentSong.albumName}</p>}
                                </button>

                            </div>
                        </div>

                        <div className="col-8 d-flex align-items-center p-0">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8 d-flex m-0 p-0">
                                        <button className="music-player-icon">
                                            <img id={"prevBtn"} src={prevIcon} width={12} height={11}
                                                onClick={prevSong} />
                                        </button>

                                        <button className="music-player-icon">

                                            { isPlaying
                                                ? (<img id="playBtn" src={pauseIcon}
                                                        width={33} height={32} onClick={playMusic}/>)
                                                : (<img id="playBtn" src={playIcon}
                                                        width={33} height={32} onClick={playMusic}/>)
                                            }

                                        </button>

                                        <button className="music-player-icon">
                                            <img id={"nextBtn"} src={nextIcon} width={12} height={11}
                                                 onClick={nextSong}/>
                                        </button>
                                    </div>


                                    <div className="col-4 d-flex justify-content-end toHide m-0 p-0" >
                                        {shuffle}
                                        {repeat}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="playbar-dx col-7 ">

                <div className=" col-7 col-md-8 col-xl-10 p-0 m-0 playContainer" id={"playContainer2"}>
                    <MusicPlayer currentSong={props.currentSong} playMusic={isPlaying} volume={volume} muted={!mute}/>
                </div>


                <div className=" col-5 col-md-4 col-xl-2" >
                    <div className="container-fluid d-flex align-items-center justify-content-center" >

                        <button className="music-settings-icon ps-2 pe-0">
                            { mute
                                ? (<img src={volumeIconMuted} width={12} height={12}
                                        onClick={()=>{ setMute(!mute);}}/>)

                                : ((<img src={volumeIcon} width={12} height={12}
                                         onClick={()=>{ setMute(!mute);}}/>) )
                            }

                        </button>
                        <Volume volume={volume} setVolume={setVolume}/>

                        {/*{shuffle}*/}
                        {/*{repeat}*/}

                        {/*<button className="music-settings-icon">*/}
                        {/*    <img className="" src={addToPlaylistIcon} width={16} height={11}/>*/}
                        {/*</button>*/}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Playbar