import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import classnames from 'classnames';

import './Button.less'

type ButtonProps = {
  className?: string;
  click: MouseEventHandler;
  text: ReactNode;
  buttonProps?: CSSProperties;
  buttonType?: ButtonSize;
};

export type ButtonSize = 'primary' | 'small' | 'large';

export const LocalButton: React.FC<ButtonProps> = (props) => {
  const prefixCls = 'btn';
  const { click, text, buttonProps = {}, buttonType = 'primary', className } = props;
  const btnCls = classnames(prefixCls, className, {
    [`btn-primary`]: buttonType === 'primary',
    [`btn-small`]: buttonType === 'small',
    [`btn-large`]: buttonType === 'large'
  });

  return (
    <button
      onClick={click}
      className={btnCls}
      style={{
        ...buttonProps
      }}
    >
      {text}
    </button>
  );
};

interface OKButtonProps {
  onOk: MouseEventHandler;
  okText: ReactNode;
  okButtonProps?: CSSProperties;
  okType?: ButtonSize;
}

interface CancelButtonProps {
  onCancel: MouseEventHandler;
  cancelText: ReactNode;
  cancelButtonProps?: CSSProperties;
  cancelType?: ButtonSize;
}

export const OKButton: React.FC<OKButtonProps> = (props) => {
  const { onOk, okButtonProps = {}, okText, okType } = props;

  const OKButtonStyle: CSSProperties = {
    
  };

  return (
    <LocalButton
      click={onOk}
      className={'okBtn'}
      buttonProps={{
        ...okButtonProps,
        ...OKButtonStyle
      }}
      text={okText}
      buttonType={okType}
    />
  );
};

export const CancelButton: React.FC<CancelButtonProps> = (props) => {
  const { onCancel, cancelButtonProps = {}, cancelText, cancelType = 'primary' } = props;

  const CancelButtonStyle: CSSProperties = {};

  return (
    <LocalButton
      click={onCancel}
      className={'cancelBtn'}
      buttonProps={{
        ...cancelButtonProps,
        ...CancelButtonStyle
      }}
      text={cancelText}
      buttonType={cancelType}
    />
  );
};
