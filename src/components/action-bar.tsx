import { PlayIcon } from "lucide-react";

export interface IActionBarMenuButtonsProps {
  onNewGameButtonClick: () => void;
}

const ActionBar = ({ onNewGameButtonClick }: IActionBarMenuButtonsProps) => {
  return (
    <div className="flex flex-row gap-2">
      <button className="btn btn-lg btn-success" onClick={onNewGameButtonClick}>
        <PlayIcon size={16} /> Play
      </button>
    </div>
  );
};

export default ActionBar;
