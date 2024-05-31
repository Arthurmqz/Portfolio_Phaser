export interface AnimationConfig {
  start: number;
  end: number;
  frameRate: number;
  repeat: number;
}

export interface Animations {
  animations: {
      [key: string]: AnimationConfig;
  };
}