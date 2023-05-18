import { useMemo } from 'react';
import { PopupPlace } from '../interface/trigger';

type Direction = 'top' | 'left' | 'bottom' | 'right';
type DirectProp = 'height' | 'width' | 'top' | 'left';

export const circulatePopupPosition = (
  triggerEle?: HTMLElement,
  popupEle?: HTMLDivElement,
  mousePos?: number[],
  placement?: PopupPlace
) => {
  // TS: union to array
  const placesAlign = ['top', 'right', 'bottom', 'left'] as Direction[];

  const isCollision = (mousePos: number[], triggerPos: DOMRect) => {
    const [clientX, clientY] = mousePos;
    const { left, top, width, height } = triggerPos;
    if (
      Math.abs(clientX - left) <= width &&
      Math.abs(clientY - top) <= height
    ) {
      return true;
    }
    return false;
  };

  return useMemo(() => {
    if (triggerEle && popupEle && mousePos) {
      const popupPos = popupEle.getBoundingClientRect();
      const triggerPos = triggerEle.getBoundingClientRect();
      let offsetX: number = -10000;
      let offsetY: number = -10000;
      // popup element closed
      if (popupPos.width <= 0) return [offsetX, offsetY];

      if (isCollision(mousePos, triggerPos)) {
        placesAlign.forEach((direct) => {
          placement = placement || 'top';
          if (placement.startsWith(direct)) {
            const leftPart = placement
              .slice(0, direct.length)
              .toLowerCase() as Direction;
            const rightPart = placement
              .slice(direct.length)
              .toLowerCase() as Direction;
            [offsetX, offsetY] = getOffset(
              triggerPos,
              popupPos,
              leftPart,
              rightPart
            );
          }
        });
        return [~~offsetX, ~~offsetY];
      }
      return [offsetX, offsetY];
    }
  }, [triggerEle, popupEle, mousePos]);
};

const getOffset = (
  triggerPos: DOMRect,
  popupPos: DOMRect,
  leftPart: Direction,
  rightPart: Direction
) => {
  let x;
  let y;
  switch (leftPart) {
    case 'top':
      y = triggerPos.top - popupPos.height;
      x = rightOffset(triggerPos, popupPos, rightPart);
      break;
    case 'bottom':
      y = triggerPos.top + triggerPos.height;
      x = rightOffset(triggerPos, popupPos, rightPart);
      break;
    case 'left':
      x = triggerPos.left - popupPos.width;
      y = rightOffset(triggerPos, popupPos, rightPart);
      break;
    case 'right':
      x = triggerPos.left + triggerPos.width;
      y = rightOffset(triggerPos, popupPos, rightPart);
      break;
  }

  return [x, y];
};

const rightOffset = (
  triggerPos: DOMRect,
  popupPos: DOMRect,
  rightPart: Direction,
  multiple = 1
) => {
  let propWH: DirectProp = 'height';
  let propTL: DirectProp = 'top';
  let offsetY;
  if (rightPart == 'top' || rightPart == 'bottom') {
    propWH = 'height';
    propTL = 'top';
  }
  if (rightPart == 'left' || rightPart == 'right') {
    propWH = 'width';
    propTL = 'left';
  }
  if (rightPart == 'top' || rightPart == 'left') {
    multiple = 0;
  }
  if (rightPart == 'bottom' || rightPart == 'right') {
    multiple = 2;
  }
  let delta = ~~(triggerPos[propWH] - popupPos[propWH]) / 2;
  offsetY = ~~triggerPos[propTL] + delta * multiple;
  return offsetY;
};

const leftOffset = (
  triggerPos: DOMRect,
  popupPos: DOMRect,
  rightPart: Direction
) => {
  let tempEle = triggerPos;
  let offsetX;
  let propWH: DirectProp = 'height';
  let propTL: DirectProp = 'top';
  let horizonMultiple = 1;
  if (rightPart == 'top' || rightPart == 'bottom') {
    propWH = 'height';
    propTL = 'top';
  }
  if (rightPart == 'left' || rightPart == 'right') {
    propWH = 'width';
    propTL = 'left';
  }
  if (rightPart == 'top' || rightPart == 'left') {
    tempEle = popupPos;
    horizonMultiple = -1;
  }
  if (rightPart == 'bottom' || rightPart == 'right') {
    tempEle = triggerPos;
    horizonMultiple = 1;
  }
  offsetX = ~~(triggerPos[propTL] + tempEle[propWH] * horizonMultiple);
  return offsetX;
};

// leftPart & rightPart are same logic handle
const mergedOffset = (
  triggerPos: DOMRect,
  popupPos: DOMRect,
  leftPart: Direction,
  rightPart: Direction
) => {
  let offsetX: number;
  let offsetY: number;
  let tempEle = triggerPos;
  let propWH: DirectProp = 'height';
  let propTL: DirectProp = 'top';
  let horizonMultiple = 1;
  let deltaMultiple = 1;
  let isWrapPosition = false;
  if (leftPart == 'top' || leftPart == 'bottom') {
    propWH = 'height';
    propTL = 'top';
    isWrapPosition = false;
  }
  if (leftPart == 'left' || leftPart == 'right') {
    propWH = 'width';
    propTL = 'left';
    isWrapPosition = true;
  }

  if (leftPart == 'top' || leftPart == 'left') {
    tempEle = popupPos;
    horizonMultiple = -1;
    deltaMultiple = 0;
  }
  if (leftPart == 'bottom' || leftPart == 'right') {
    tempEle = triggerPos;
    horizonMultiple = 1;
    deltaMultiple = 2;
  }
  let delta = (triggerPos[propWH] - popupPos[propWH]) / 2;
  offsetX = ~~(triggerPos[propTL] + tempEle[propWH] * horizonMultiple);
  offsetY = ~~(triggerPos[propTL] + delta * deltaMultiple);

  if (isWrapPosition) {
    [offsetX, offsetY] = [offsetY, offsetX];
  }

  return [offsetX, offsetY];
};
