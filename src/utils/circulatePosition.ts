import { useMemo } from 'react';
import { PopupPlace } from '../interface/trigger';

export const circulatePopupPosition = (
  triggerEle?: HTMLElement,
  popupEle?: HTMLDivElement,
  mousePos?: number[],
  placement?: PopupPlace
) => {
  const getBoundingClientRectInfo = (element: HTMLElement) => {
    const { width, height, left, top } = element.getBoundingClientRect();
    return [width, height, left, top];
  };

  const isCollision = (mousePos: number[], triggerPos: number[]) => {
    const [clientX, clientY] = mousePos;
    const [tWidth, tHeight, tLeft, tTop] = triggerPos;
    if (
      Math.abs(clientX - tLeft) <= tWidth &&
      Math.abs(clientY - tTop) <= tHeight
    ) {
      return true;
    }
    return false;
  };

  return useMemo(() => {
    if (triggerEle && popupEle && mousePos) {
      const popupPos = getBoundingClientRectInfo(popupEle);
      const [pWidth, pHeight, pLeft, pTop] = popupPos;
      const triggerPos = getBoundingClientRectInfo(triggerEle);
      const [tWidth, tHeight, tLeft, tTop] = triggerPos;
      let offsetX: number = -10000;
      let offsetY: number = -10000;
      // popup element closed
      if (pWidth <= 0) return [offsetX, offsetY];

      if (isCollision(mousePos, triggerPos)) {
        const isLarge = pHeight > tHeight ? true : false;
        const deltaY = isLarge
          ? -Math.abs(tHeight - pHeight) / 2
          : Math.abs(tHeight - pHeight) / 2;

        // top bottom left right
        // topLeft topRight
        switch (placement) {
          case 'top':
            offsetX = tLeft + (tWidth - pWidth) / 2;
            offsetY = Math.abs(tTop - pHeight);
            break;
          case 'bottom':
            offsetX = tLeft + (tWidth - pWidth) / 2;
            offsetY = Math.abs(tTop + tHeight);
            break;
          case 'left':
            offsetX = Math.abs(tLeft - pWidth);
            offsetY = tTop + deltaY;
            break;
          case 'right':
            offsetX = Math.abs(tLeft + tWidth);
            offsetY = tTop + deltaY;
            break;
          default:
            offsetX = tLeft + (tWidth - pWidth) / 2;
            offsetY = Math.abs(tTop - pHeight);
            break;
        }
        return [~~offsetX, ~~offsetY];
      }

      return [offsetX, offsetY];
    }
  }, [triggerEle, popupEle, mousePos]);
};
