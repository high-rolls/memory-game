import { useSettingsFull } from "@/context/settings.context";
import { FullscreenIcon, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const VOLUME_LEVELS = [
  { volume: 0, icon: <VolumeX size={20} /> },
  { volume: 0.5, icon: <Volume1 size={20} /> },
  { volume: 1, icon: <Volume2 size={20} /> },
];

export function GlobalToolBar() {
  const { soundVolume, setSoundVolume } = useSettingsFull();
  const [volumeLevelIndex, setVolumeLevelIndex] = useState(Math.round(soundVolume * 2));

  const handleFullscreenButtonClick = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  const handleSoundButtonClick = () => {
    const newVolumeLevelIndex = (volumeLevelIndex + 1) % VOLUME_LEVELS.length;
    setVolumeLevelIndex(newVolumeLevelIndex);
    setSoundVolume(VOLUME_LEVELS[newVolumeLevelIndex].volume);
  };
  return (
    <div className="flex gap-1 m-3 bg-base-200/50 rounded-md">
      <button
        className="btn btn-ghost btn-square text-base-content"
        onClick={handleSoundButtonClick}
      >
        {VOLUME_LEVELS[volumeLevelIndex].icon}
      </button>
      <button
        className="btn btn-ghost btn-square text-base-content"
        onClick={handleFullscreenButtonClick}
      >
        <FullscreenIcon size={20} />
      </button>
    </div>
  );
}
