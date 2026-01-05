import { useReducer, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Square } from "lucide-react";

enum GameState {
  IDLE = "idle",
  PLAYING = "playing",
  PAUSED = "paused",
  STOPPED = "stopped",
}

enum GameAction {
  START = "START",
  PAUSE = "PAUSE",
  RESUME = "RESUME",
  STOP = "STOP",
}

interface State {
  status: GameState;
}

interface Action {
  type: GameAction;
}

function reducer(state: State, { type }: Action): State {
  switch (state.status) {
    case GameState.IDLE:
      if (type === GameAction.START) return { status: GameState.PLAYING };
      return state;
    case GameState.PLAYING:
      if (type === GameAction.PAUSE) return { status: GameState.PAUSED };
      if (type === GameAction.STOP) return { status: GameState.STOPPED };
      return state;
    case GameState.PAUSED:
      if (type === GameAction.RESUME) return { status: GameState.PLAYING };
      if (type === GameAction.STOP) return { status: GameState.STOPPED };
      return state;
    case GameState.STOPPED:
      if (type === GameAction.START) return { status: GameState.PLAYING };
      return { status: GameState.IDLE };
    default:
      return state;
  }
}

interface ButtonConfig {
  action: GameAction;
  Icon: React.ComponentType<{ className?: string }>;
  variant?: string;
}

const buttonConfig: Record<GameState, ButtonConfig | undefined> = {
  [GameState.IDLE]: {
    action: GameAction.START,
    Icon: Play,
    variant: "default",
  },
  [GameState.PLAYING]: {
    action: GameAction.PAUSE,
    Icon: Pause,
  },
  [GameState.PAUSED]: {
    action: GameAction.RESUME,
    Icon: RotateCcw,
  },
  [GameState.STOPPED]: {
    action: GameAction.START,
    Icon: Play,
  },
};

const stopButtonConfig: Record<GameState, ButtonConfig | undefined> = {
  [GameState.IDLE]: undefined,
  [GameState.PLAYING]: {
    action: GameAction.STOP,
    Icon: Square,
    variant: "destructive",
  },
  [GameState.PAUSED]: {
    action: GameAction.STOP,
    Icon: Square,
    variant: "destructive",
  },
  [GameState.STOPPED]: undefined,
};

export const GameControl = () => {
  const [state, dispatch] = useReducer(reducer, { status: GameState.IDLE });

  const handleAction = useCallback(
    (type: GameAction) => () => dispatch({ type }),
    [],
  );

  const mainConfig = buttonConfig[state.status];
  const stopConfig = stopButtonConfig[state.status];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1> Game Control </h1>

        <div className="mb-4 text-center">
          <span className="text-sm font-medium text-gray-600">
            Current State:
          </span>
          <span className="ml-2 text-lg font-bold text-blue-600 capitalize">
            {state.status}
          </span>
        </div>

        <div className="flex gap-3 justify-center">
          {[mainConfig, stopConfig]
            .filter((c) => !!c)
            .map(({ action, Icon, variant }) => (
              <Button
                key={`${action}-${variant}`}
                onClick={handleAction(action)}
                size="icon-lg"
                className="rounded-full"
                variant={variant ?? "outline"}
              >
                <Icon />
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
