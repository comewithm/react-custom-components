import React from 'react';
import classnames from 'classnames';
import './popup.less';

interface IPopupProps {
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  visible: boolean;
  title?: string;
}

const prefixClass = `popup`;

const Popup: React.FC<IPopupProps> = (props) => {
  const { className, title, visible, onMouseEnter, onMouseLeave } = props;

  const popupClass = classnames(prefixClass, className, {
    [`popup-open`]: visible
  });

  if (!visible) {
    return null;
  }

  return (
    <>
      <div
        className={popupClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className={`${prefixClass}-text`}>{title}</span>
      </div>
    </>
  );
};

Popup.defaultProps = {
  title: 'prompt text'
};

export default Popup;
