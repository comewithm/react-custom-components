import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import './Mask.less';

interface MaskProps {
  mask: boolean;
  maskClosable: boolean;
  maskStyle: CSSProperties;
  setModalClose: (e: React.MouseEvent) => void;
}
const prefixCls = 'mask';
export const Mask: React.FC<MaskProps> = (props) => {
  const { mask, maskClosable, maskStyle, setModalClose } = props;

  const maskCls = classnames(prefixCls, {
    [`mask-show-bg`]: mask
  });

  const maskClose = (e: React.MouseEvent) => {
    if (mask && maskClosable) {
      setModalClose(e);
    }
  };

  return (
    <div className={maskCls} style={{ ...maskStyle }} onClick={maskClose}></div>
  );
};
