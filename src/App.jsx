import { useState } from "react";
import SpeechToText from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";
import ConversationMode from "./components/ConversationMode";

export default function App() {
  const [mode, setMode] = useState("speech");

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <nav className="flex gap-2 mb-4">
        <button onClick={() => setMode("speech")} className="flex-1 bg-gray-800 rounded-lg p-3">Speech → Text</button>
        <button onClick={() => setMode("tts")} className="flex-1 bg-gray-800 rounded-lg p-3">Text → Speech</button>
        <button onClick={() => setMode("conversation")} className="flex-1 bg-gray-800 rounded-lg p-3">Conversation</button>
      </nav>

      {mode === "speech" && <SpeechToText />}
      {mode === "tts" && <TextToSpeech />}
      {mode === "conversation" && <ConversationMode />}
    </div>
  );
}
