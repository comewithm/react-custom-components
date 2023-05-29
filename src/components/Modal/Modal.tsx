import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import classnames from 'classnames';
import { Mask } from './Mask/Mask';
import { CancelButton, OKButton } from './Button/Button';
import './Modal.less';
import { ButtonSize } from './Button/Button';

interface ModalProps {
  children: ReactNode;
  afterClose: Function;
  open: boolean;
  mask: boolean;
  maskClosable: boolean;
  maskStyle: CSSProperties;
  afterOpenChange: (open: boolean) => void;
  style: CSSProperties;
  width: string | number;
  title: ReactNode;
  zIndex: number;
  closable: boolean;
  wrapClassName?: string;
  okText: ReactNode;
  okType: ButtonSize;
  onOk: MouseEventHandler;
  onCancel: MouseEventHandler;
  okButtonProps: CSSProperties;
  cancelButtonProps: CSSProperties;
  cancelText: ReactNode;
  bodyStyle: CSSProperties;
  centered: boolean;
  closeIcon?: ReactNode;

  confirmLoading?: boolean;
  destroyOnClose?: boolean;
  focusTriggerAfterClose?: boolean;
  footer?: ReactNode;
  forceRender?: boolean;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  keyboard?: boolean;
  modalRender?: (node: ReactNode) => ReactNode;
}

interface ModalMethodsConfig {
  afterClose: Function;
  className: string;
  content: ReactNode;
  icon: ReactNode;
  mask: boolean;
  maskClosable: boolean;
  maskStyle: CSSProperties;
  style: CSSProperties;
  width: string | number;
  title: ReactNode;
  zIndex: number;
  closable: boolean;
  wrapClassName?: string;
  okText: ReactNode;
  okType: ButtonSize;
  onOk: MouseEventHandler;
  onCancel: MouseEventHandler;
  okButtonProps: CSSProperties;
  cancelButtonProps: CSSProperties;
  cancelText: ReactNode;
  bodyStyle: CSSProperties;
  centered: boolean;
  closeIcon?: ReactNode;
  footer?: ReactNode;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  keyboard?: boolean;
}

interface ModalAttributes {
  success: (config: Partial<ModalMethodsConfig>) => ReactNode;
  info: (config: Partial<ModalMethodsConfig>) => ReactNode;
  confirm: (config: Partial<ModalMethodsConfig>) => ReactNode;
  warning: (config: Partial<ModalMethodsConfig>) => ReactNode;
  error: (config: Partial<ModalMethodsConfig>) => ReactNode;
  update: (config: Partial<ModalMethodsConfig>) => ReactNode;
  destroy: () => void;
  useModal: () => any[];
  destroyAll: () => void;
}

const prefixCls = 'modal-container';
export const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    afterClose,
    open,
    mask,
    maskClosable,
    maskStyle,
    afterOpenChange,
    style,
    width,
    title,
    zIndex,
    closable,
    wrapClassName,
    onOk,
    okText,
    okButtonProps,
    okType,
    onCancel,
    cancelText,
    cancelButtonProps,
    bodyStyle,
    centered,
    closeIcon
  } = props;

  const [modalVisible, setModalVisible] = useState(open || false);
  const modalRef = useRef(modalVisible);
  const setModalClose = () => {
    setModalVisible(false);
    modalRef.current = false;
  };

  useEffect(() => {
    console.log('modalRef:', modalRef);
    if (!modalRef.current) {
      afterClose();
    }
    afterOpenChange(modalRef.current);
  }, [modalVisible]);

  const modalCls = classnames(prefixCls, wrapClassName);

  const modalBodyCls = classnames('modal-info');

  const modalWrapperCls = classnames('modal-wrapper', {
    [`modal-center`]: centered
  });

  const onOkClick = (e: React.MouseEvent) => {
    setModalClose();
    onOk(e);
  };

  const onCancelClick = (e: React.MouseEvent) => {
    setModalClose();
    onCancel(e);
  };

  return (
    modalVisible && (
      <div className={modalWrapperCls}>
        <Mask
          mask={mask}
          maskClosable={maskClosable}
          maskStyle={maskStyle}
          setModalClose={onCancelClick}
        />
        <div
          className={modalCls}
          style={{
            width: `${width}${typeof width === 'number' ? 'px' : ''}`,
            zIndex,
            ...style
          }}
        >
          {closable &&
            (closeIcon ? (
              <div className="modal-custom-close" onClick={onCancelClick}>
                {closeIcon}
              </div>
            ) : (
              <div className="modal-close" onClick={onCancelClick}>
                X
              </div>
            ))}
          <div className={modalBodyCls} style={bodyStyle}>
            <div className="modal-title">{title}</div>
            <div className="modal-content">{children}</div>
            <div className="modal-btns">
              <OKButton
                onOk={onOkClick}
                okButtonProps={okButtonProps}
                okText={okText || '确定'}
                okType={okType}
              />
              <CancelButton
                onCancel={onCancelClick}
                cancelButtonProps={cancelButtonProps}
                cancelText={cancelText || '取消'}
                cancelType={'primary'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
