from fastapi import FastAPI, WebSocket
from transformers import pipeline
import torch
import numpy as np
import traceback

app = FastAPI()

# Determine the device (GPU if available, else CPU)
device = 0 if torch.cuda.is_available() else -1

# Initialize the PhoWhisper ASR pipeline
asr_pipeline = pipeline(
    task="automatic-speech-recognition",
    model="vinai/PhoWhisper-base",
    device=device
)

@app.websocket("/ws/audio")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            # Receive binary PCM data from the client
            audio_data = await websocket.receive_bytes()
            if not audio_data:
                print("Received empty audio data")
                continue
            print("Received audio data of length:", len(audio_data))

            # Convert bytes to NumPy float32 array
            waveform_np = np.frombuffer(audio_data, dtype=np.float32)

            # Perform ASR directly on the PCM data
            result = asr_pipeline({'array': waveform_np, 'sampling_rate': 16000})
            transcription = result["text"]
            print("Transcription:", transcription)
            await websocket.send_text(transcription)
        except Exception as e:
            print(f"Error: {e}")
            print(traceback.format_exc())
            break

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)