import { ReactNode, MouseEventHandler } from 'react';

export interface TriggerProps {
  title?: ReactNode | (() => ReactNode);
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: TriggerMode;
  onOpenChange?: (open: boolean) => void;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  destroyTooltipOnHide?: boolean;
  mouseInComponent?: boolean;
  children: ReactNode;
  color: string;
  placement?: PopupPlace;
}

export type TriggerMode = 'hover' | 'click';

export type PopupPlace =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';
export interface PopupProps {
  open?: boolean;
  title?: ReactNode | (() => ReactNode);
  children?: ReactNode;
  onPopupEnter: MouseEventHandler<HTMLDivElement>;
  onPopupLeave: MouseEventHandler<HTMLDivElement>;
  setTriggerRef: (node: HTMLElement) => void;
  setPopupRef: (node: HTMLDivElement) => void;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  offsetInfo: number[];
  color: string;
}
