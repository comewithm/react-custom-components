import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import classnames from 'classnames';

type ButtonProps = {
  click: MouseEventHandler;
  text: ReactNode;
  buttonProps: CSSProperties;
  buttonType?: ButtonSize;
};

export type ButtonSize = 'primary' | 'small' | 'large';

export const LocalButton: React.FC<ButtonProps> = (props) => {
  const prefixCls = 'btn';
  const { click, text, buttonProps, buttonType } = props;
  const btnCls = classnames(prefixCls, {
    [`btn-primary`]: buttonType === 'primary',
    [`btn-small`]: buttonType === 'small',
    [`btn-large`]: buttonType === 'large'
  });

  const localButtonStyle: CSSProperties = {
    padding: '6px 12px',
    margin: '4px 6px',
    borderRadius: '4px',
    borderWidth: '1px'
  };
  return (
    <button
      onClick={click}
      className={btnCls}
      style={{
        ...localButtonStyle,
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
  okButtonProps: CSSProperties;
  okType?: ButtonSize;
}

interface CancelButtonProps {
  onCancel: MouseEventHandler;
  cancelText: ReactNode;
  cancelButtonProps: CSSProperties;
  cancelType?: ButtonSize;
}

export const OKButton: React.FC<OKButtonProps> = (props) => {
  const { onOk, okButtonProps, okText, okType } = props;

  const OKButtonStyle: CSSProperties = {
    borderRadius: '2px'
  };

  return (
    <LocalButton
      click={onOk}
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
  const { onCancel, cancelButtonProps, cancelText, cancelType } = props;

  const CancelButtonStyle: CSSProperties = {};

  return (
    <LocalButton
      click={onCancel}
      buttonProps={{
        ...cancelButtonProps,
        ...CancelButtonStyle
      }}
      text={cancelText}
      buttonType={cancelType}
    />
  );
};
