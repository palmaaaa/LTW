<?php

class FileHandler {
    function saveFileToPath($bytes, $path) {
        $bytesArr = (array)$bytes;
        $bytesStr = pack('C*', ...$bytesArr);
        file_put_contents($path, $bytesStr);
    }

    function getFileFromPath($path) {
        $file = file_get_contents($path);
        $byteArr = str_split($file);
        return array_map('ord', $byteArr);
    }
}