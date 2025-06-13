const fs = require('fs');
const path = require('path');
const apiUrl = "https://api.deepgram.com/v1/listen?model=nova-3&detect_language=true";

async function transcribeAudio(audioFilePath, apiKey) {
    try {

        if (!fs.existsSync(audioFilePath)) {
            throw new Error('El archivo de audio no existe');
        }

        const audioFile = fs.readFileSync(audioFilePath);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${apiKey}`,
                "Content-Type": "audio/mp3",
            },
            body: audioFile
        })

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Error en la API: ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        const transcription = data.results.channels[0].alternatives[0].transcript;
        const outputFilePath = path.join(path.dirname(audioFilePath), `${path.basename(audioFilePath, path.extname(audioFilePath))}_transcription.txt`);
        fs.writeFileSync(outputFilePath, transcription);
        return transcription

    } catch (error) {
        console.error(`Error en la transcripción: ${error.message}`);
        throw error;
    }
}

const audioPath = './audio.mp3';
const deepgramApiKey = 'a27a612658ed5c34c1dd0499d81a19337acda96a' //Free Apikey from Deepgram
transcribeAudio(audioPath, deepgramApiKey)
.then(transcription => {
    console.log('Transcripción completada con éxito');
    console.log(transcription);
})
.catch(error => {
    console.error('Falló la transcripción ', error);
})
