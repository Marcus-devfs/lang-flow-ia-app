import * as Speech from 'expo-speech';
import { useState } from 'react';
import { useUserStore } from '../store/useUserStore';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { country } = useUserStore();

  const speak = (text: string, language: string = 'en-US') => {
    Speech.speak(text, {
      language,
      pitch: 1.0,
      rate: 0.9,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const stop = async () => {
    await Speech.stop();
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking };
}
