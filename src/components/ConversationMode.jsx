import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";

export default function ConversationMode() {
  return (
    <div className="flex flex-col gap-6">
      <SpeechToText />
      <TextToSpeech />
    </div>
  );
}
