"use client";

import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function TestSpeech() {
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Speech Recognition Test</h1>
      <p className="mt-2">Transcript: {transcript}</p>
      <button
        onClick={toggleListening}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {listening ? "Stop" : "Start"} Listening
      </button>
    </div>
  );
}
