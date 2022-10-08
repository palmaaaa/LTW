import React, {useEffect, useState} from 'react';
import '../../css/utility/MusicPlayer.css';

const MusicPlayer = (props) => {
    const [timestamp,setTimestamp] = useState("0:00");

    useEffect(()=>{
        let player = document.getElementById("musicSrc");
        player.volume = props.volume*props.muted ;
        if (props.playMusic){
            player.play();
        }else{
            player.pause();
        }
    });

    const musicHandler = (e)=> {
      document.getElementById("progress-bar").style.width = ((e.target.currentTime/e.target.duration)*100)+"%";

      let minuti = Math.trunc( ((e.target.currentTime)/60));
      let secondi = Math.trunc( ((e.target.currentTime)%60));

      setTimestamp( minuti+":"+transformToStr(secondi) );

    };

    function selectTimePlay(e){

        let widthX = document.getElementById("music-bar").offsetWidth;
        let barX = e.nativeEvent.offsetX;
        let percentageOfBar = barX/widthX*100;
        // let setBarTo = document.getElementById("musicSrc").duration/100* percentageOfBar;
        let setBarTo = props.currentSong.duration/100* percentageOfBar;
        document.getElementById("musicSrc").currentTime = setBarTo;
    };

    function transformToStr(arg){
        if ((arg+"").length === 1 ){ return "0"+arg; }
        else{ return arg; }
    }

    function formatSongDuration(duration) {
        if (duration >= 3600) {
            return new Date(duration * 1000).toISOString().substr(11, 8);
        }
        else {
            return new Date(duration * 1000).toISOString().substr(14, 5);
        }
    }

    return (
        <div className={"container-fluid"}>


            <div className={"music-player-bar mt-4"} id={"music-bar"} onClick={selectTimePlay}>
                <div id={"progress-bar"} className="progress-bar" >
                </div>
            </div>

            {
                <div className={"timestamps mt-2"}>
                    <small> {timestamp} </small>
                    <small> { (props.currentSong ===  undefined ? '0:00'  : formatSongDuration(props.currentSong.duration)) }</small>
                </div>
            }

            <audio id={"musicSrc"} controls src={props.currentSong?.fileUrl}  onTimeUpdate={musicHandler}
                   style={{display:"none",height: "10px"}}/>
        </div>


    )
}
export default MusicPlayer