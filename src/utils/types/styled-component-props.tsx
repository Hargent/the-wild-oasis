interface StyleProps {
  as?: string;
  type?: string;
  columns?: number;
  active?: boolean;
  position?: {
    x: number;
    y: number;
  };
}
interface ButtonStyleProps {
  variation?: string;
  size?: string;
  type?: string;
  onClick?: () => void;
}
export type { StyleProps, ButtonStyleProps };
