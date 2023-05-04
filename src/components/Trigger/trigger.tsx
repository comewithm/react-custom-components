import React from 'react';
import classnames from 'classnames';
import { useShowOrHide, useVisible } from '../../hooks/useVisible';
import Popup from './Popup/popup';
import { TTriggerMode } from '../../interface/tooltip';

import './trigger.less';

interface ITriggerProps {
  className?: string;
  title?: string;
  visible?: boolean;
  mode?: TTriggerMode;
  children: React.ReactElement;
}

const prefixClass = `trigger`;
let onMouseEnter: () => void;
let onMouseLeave: () => void;

const Trigger: React.FC<ITriggerProps> = (props) => {
  const {
    className,
    title,
    mode = 'hover',
    visible: defaultVisible,
    children
  } = props;

  // popup default as false
  const { visible, setVisible } = useVisible(defaultVisible || false);

  const [showList, hideList] = useShowOrHide(mode);

  const isShow = showList.has('hover');
  const isHide = hideList.has('hover');

  const popupOpen = visible ?? defaultVisible;

  const setPopupOpen = (flag: boolean) => {
    setVisible(flag);
  };

  const triggerPopupOpen = (isOpen: boolean) => {
    if (popupOpen != isOpen) {
      setPopupOpen(isOpen);
    }
  };

  // hover在内容上出现popup组件，鼠标指向popup则一直存在，鼠标离开popup则组件销毁。
  // 都是子组件触发事件
  if (isShow) {
    // 触发popup组件，即popupOpen值的更改，并且不能循环触发
    triggerPopupOpen(true);
    onMouseEnter = () => {
      triggerPopupOpen(true);
    };
  }

  if (isHide) {
    triggerPopupOpen(false);
    onMouseLeave = () => {
      triggerPopupOpen(false);
    };
  }

  // ***********classnames***************
  const popupClass = classnames(prefixClass, className, {
    [`${prefixClass}-open`]: visible
  });

  return (
    <>
      <div className={popupClass}>{children}</div>
      <Popup
        className="popup"
        visible={popupOpen}
        title={title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};

Trigger.defaultProps = {
  title: 'prompt text'
};

export default Trigger;
