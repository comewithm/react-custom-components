import React, { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PopupProps } from '../../../interface/trigger';

import './Popup.less';

const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const {
    title,
    open,
    children,
    onPopupEnter,
    onPopupLeave,
    setTriggerRef,
    setPopupRef,
    offsetInfo,
    color,
    getPopupContainer = () => document.body
  } = props;

  const titleContent = typeof title === 'function' ? title() : title;

  const elementRef = useRef<any>();
  const popupRef = useRef<any>();

  useEffect(() => {
    if (elementRef.current) {
      setTriggerRef(elementRef.current);
    }
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      setPopupRef(popupRef.current);
    }
  }, [open]);

  const [offsetX, offsetY] = offsetInfo;

  return (
    <>
      <div ref={elementRef}>
        {children}
        {open
          ? createPortal(
              <div
                ref={popupRef}
                onMouseEnter={onPopupEnter}
                onMouseLeave={onPopupLeave}
                style={{
                  position: 'absolute',
                  left: offsetX,
                  top: offsetY,
                  backgroundColor: color,
                  color: '#ddd',
                  padding: '6px 8px',
                  borderRadius: '4px'
                }}
              >
                {titleContent}
              </div>,
              getPopupContainer()
            )
          : null}
      </div>
    </>
  );
});

export default Popup;
