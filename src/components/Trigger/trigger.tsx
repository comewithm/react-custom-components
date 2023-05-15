import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { TriggerProps } from '../../interface/trigger';
// import classnames from 'classnames';
import Popup from './Popup/Popup';

import './Trigger.less';
import { useRefCallback } from '../../hooks/useRefCallback';
import { useTriggerHover } from '../../hooks/useTriggerHover';

// const prefixClass = `trigger`;

// 是否hover，可以根据目标元素和元素位置来判断
// 1.如何确定目标元素
// 鼠标当前的位置信息判断
// 2.获取目标元素位置信息：
//    getBoundingClientRect() ==>视口左上角计算 left、top、right、bottom、x、y、width(width+padding+border) 和 height
// 3.判断是否hover,从而处理对应的状态
// 4.状态为hover时，hover的元素(popup元素)应该定位在目标元素(trigger)旁边，具体位置需要设置
// 4.1 popup元素应该是绝对定位??? 应该是基于trigger元素在视口的相对位置，设置popup元素位置
// 所以不应该只是简单的mouseEnter来判断trigger元素

let onPopupEnter: MouseEventHandler;
let onPopupLeave: MouseEventHandler;

const Trigger: React.FunctionComponent<TriggerProps> = (props) => {
  const {
    title,
    open,
    defaultOpen,
    trigger = 'hover',
    getPopupContainer = () => document.body,
    onOpenChange,
    mouseInComponent,
    children
  } = props;

  const [popupVisible, setPopupVisible] = useState(defaultOpen || false);
  // merged popup visible
  const mergedVisible = open ? open : popupVisible;

  // trigger ref to find the target element
  const triggerRef = useRef<HTMLElement>(null);
  const [triggerTarget, setTriggerTarget] = useState<HTMLElement>();
  // get the trigger target element
  const setTriggerRef = useRefCallback((node: HTMLElement) => {
    console.log('target element: ', node);
    setTriggerTarget(node);
  });

  const [popupEle, setPopupEle] = useState<HTMLDivElement>();

  // ***********mouse position***************
  const [mousePos, setMousePos] = useState<number[]>([]);

  // popup ref
  const setPopupRef = useRefCallback((node: HTMLDivElement) => {
    console.log('popup element: ', node);
    if (node != popupEle) {
      setPopupEle(node);
    }
  });

  const mergedVisibleChange = (visible: boolean) => {
    if (open == undefined) {
      setPopupVisible(visible);
      onOpenChange?.(visible);
    }
  };

  useEffect(() => {
    setPopupVisible(open || false);
  }, [open]);

  // ***********children props***************
  // console.log("children:", children);
  // {children: 'trigger button', onClick: ƒ}
  const childOriginalProps = (children as React.ReactElement).props;
  const childNewProps = {} as any;

  // ***********judge trigger type***************
  const [showHoverList, hideHoverList] = useTriggerHover(trigger);
  const hoverShow = showHoverList.has('hover');
  const hoverHide = hideHoverList.has('hover');
  if (hoverShow) {
    // handle popup mouseenter event
    console.log('hover show');
    // children add mouseenter event
    childNewProps.onMouseEnter = function (
      event: React.MouseEvent,
      ...args: any[]
    ) {
      mergedVisibleChange(true);
      // if exist
      childOriginalProps['onMouseEnter']?.(event, ...args);
    };

    // judgement for mousemove
    if (mouseInComponent) {
      childNewProps.onMouseMove = function (
        event: React.MouseEvent,
        ...args: any[]
      ) {
        childOriginalProps['onMouseEnter']?.(event, ...args);
        setMousePos([event.clientX, event.clientY]);
      };
    }
    onPopupEnter = () => {
      mergedVisibleChange(true);
    };
  }

  if (hoverHide) {
    // handle popup mouseleave event
    console.log('hover hide');
    childNewProps.onMouseLeave = function (
      event: React.MouseEvent,
      ...args: any[]
    ) {
      mergedVisibleChange(false);
      // if exist
      childOriginalProps['onMouseLeave']?.(event, ...args);
    };
    onPopupLeave = () => {
      mergedVisibleChange(false);
    };
  }

  // merged props
  const mergedChildrenProps = {
    ...childOriginalProps,
    ...childNewProps
  };
  // new children
  const childNode = React.cloneElement(
    children as React.ReactElement,
    mergedChildrenProps
  );

  return (
    <Popup
      open={mergedVisible}
      title={title}
      children={childNode}
      onPopupEnter={onPopupEnter}
      onPopupLeave={onPopupLeave}
      setTriggerRef={setTriggerRef}
      setPopupRef={setPopupRef}
      getPopupContainer={getPopupContainer}
    />
  );
};

export default Trigger;
