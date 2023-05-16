import { useMemo } from 'react';

export const circulatePopupPosition = (
  triggerEle?: HTMLElement,
  popupEle?: HTMLDivElement,
  mousePos?: number[]
) => {
  return useMemo(() => {
    if (triggerEle && popupEle && mousePos) {
      const {
        top: tTop,
        left: tLeft,
        width: tWidth,
        height: tHeight
      } = triggerEle.getBoundingClientRect();
      if (
        Math.abs(mousePos[0] - tLeft) <= tWidth &&
        Math.abs(mousePos[1] - tTop) <= tHeight
      ) {
        const {
          width: pWidth,
          height: pHeight,
          left: pLeft,
          top: pTop
        } = popupEle.getBoundingClientRect();
        const pCenterX = pWidth / 2;
        const tCenterX = tLeft + tWidth / 2;

        const offsetX = Math.abs(tCenterX - pCenterX);
        const offsetY =
          Math.abs(tTop - pTop) <= pHeight + tHeight
            ? Math.abs(tTop - pHeight)
            : Math.abs(tTop - pHeight);
        // setOffsetInfo([~~offsetX, ~~offsetY])
        return [~~offsetX, ~~offsetY];
      }
    }
    return [-10000, -10000];
  }, [triggerEle, popupEle, mousePos]);
};
