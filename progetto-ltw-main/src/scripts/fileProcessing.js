

export function getUrlFromByteArray(byteArray) {
    let uintArray = new Uint8Array(byteArray);
    const blob = new Blob([uintArray], {type: "application/octet-stream"});
    return window.URL.createObjectURL(blob);
}