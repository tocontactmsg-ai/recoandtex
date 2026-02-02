import { useState, useRef } from "react";

export default function SpeechToText() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Chrome only feature");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + " ";
        }
        setText(transcript);
      }, 100);
    };

    recognition.onerror = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {!listening ? (
          <button onClick={startListening} className="flex-1 bg-green-600 p-3 rounded-lg">Start Listening</button>
        ) : (
          <button onClick={stopListening} className="flex-1 bg-red-600 p-3 rounded-lg">Stop</button>
        )}
        <button onClick={() => setText("")} className="flex-1 bg-gray-700 p-3 rounded-lg">Clear</button>
        <button onClick={copyText} className="flex-1 bg-blue-600 p-3 rounded-lg">Copy</button>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg text-xl min-h-[200px] overflow-y-auto">
        {text || "Transcript will appear here..."}
      </div>
    </div>
  );
}
