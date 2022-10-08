import React from 'react';
import {useState} from "react";
import {sendRequest} from "./scripts/serverInteraction";
import {views} from "./enums/views";

function ServerTest(props) {
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [imageUrl, setImageUrl] = useState(undefined);


    function handleFilesSelected(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        let reader = new FileReader();
        reader.addEventListener('load', (event) => readFile(event, file));
        reader.readAsArrayBuffer(file)
    }

    function readFile(event, passedFile) {
        let file = event.target.result;
        const binaryData = new Uint8Array(file);
        newAlbum(binaryData);
    }


    function getAlbumNames() {
        sendRequest('POST', 'getrequest', {
            request: "GET_ALBUM_NAMES",
            username: "juanjozo"
        })
            .then(response => response.json()).then(json => console.log(json))
    }

    function newAlbum(file) {
        let registerObject = {
            request: "NEW_ALBUM",
            nome: "test_album",
            dataPubblicazione: new Date().toISOString().slice(0, 10),
            copertina: file,
            descrizione: "desc",
            username: "juanjozo"
        }

        sendRequest('POST', 'newrequest', registerObject, true).then()
    }

    function newUser() {
        let requestObject = {
            request: "NEW_USER",
            username: "usertest",
            password: "passtest",
            name: "TestName",
            surname: "TestSur",
            birthDate: "2022-05-01",
            sex: "M",
            email: "juanjo@out.es",
            state: "Stato Default",
            region: "Regione Default",
            province: "Provincia Default",
            city: "Cittá Default",
            street: "Via Default",
            houseNumber: "Civico default",
            cap: "0000"
        }

        sendRequest('POST', 'newrequest', requestObject).then()
    }

    function getPopularAlbums() {
        let requestObject = {
            request: "GET_POPULAR_ALBUMS"
        }
        sendRequest('POST', 'getrequest', requestObject)
            .then(response => response.json()).then(json => {
                console.log(json.albums)
        });
    }

    function getSongs() {

    }



    return (
        <div>
            <button onClick={getPopularAlbums}>Send simple!</button>
            <input type="file" onInput={handleFilesSelected}/>
            {imageUrl !== undefined && <img src={imageUrl}/> }
        </div>
    );
}

export default ServerTest;