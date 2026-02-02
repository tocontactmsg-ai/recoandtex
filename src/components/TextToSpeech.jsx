import { useState, useEffect } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speakingWord, setSpeakingWord] = useState("");

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
  }, []);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const word = text.substring(event.charIndex).split(" ")[0];
        setSpeakingWord(word);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeakingWord("");
  };

  return (
    <div>
      <textarea
        className="w-full bg-gray-900 p-4 rounded-lg text-xl mb-4"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-col gap-3">
        <select onChange={(e) => setVoice(voices[e.target.value])} className="p-3 bg-gray-800 rounded-lg">
          {voices.map((v, i) => (
            <option key={i} value={i}>{v.name}</option>
          ))}
        </select>

        <label>Speed</label>
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />

        <label>Pitch</label>
        <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(e.target.value)} />

        <button onClick={speak} className="bg-green-600 p-3 rounded-lg">Speak</button>
        <button onClick={stop} className="bg-red-600 p-3 rounded-lg">Stop</button>
      </div>

      <div className="mt-4 text-xl">
        Speaking word: <span className="text-green-400">{speakingWord}</span>
      </div>
    </div>
  );
}
