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
import { createPortal, unmountComponentAtNode } from 'react-dom';

interface ModalProps {
  children?: ReactNode;
  afterClose: Function;
  open: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  afterOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
  width?: string | number;
  title?: ReactNode;
  zIndex?: number;
  closable?: boolean;
  wrapClassName?: string;
  okText?: ReactNode;
  okType?: ButtonSize;
  onOk: MouseEventHandler;
  onCancel: MouseEventHandler;
  okButtonProps?: CSSProperties;
  cancelButtonProps?: CSSProperties;
  cancelText?: ReactNode;
  bodyStyle?: CSSProperties;
  centered?: boolean;
  closeIcon?: ReactNode;
  footer?: ReactNode;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  className?: string;

  confirmLoading?: boolean;
  focusTriggerAfterClose?: boolean;
  keyboard?: boolean;
  modalRender?: (node: ReactNode) => ReactNode;
}

interface ModalMethodsConfig {
  afterClose: Function;
  autoFocusButton: null | 'ok' | 'cancel';
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

type ModalType = 'success' | 'info' | 'warning' | 'error';

const prefixCls = 'modal-container';
const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    afterClose,
    open,
    mask = true,
    maskClosable = true,
    maskStyle = {},
    afterOpenChange = () => {},
    style,
    width,
    title,
    zIndex,
    closable,
    wrapClassName,
    onOk,
    okText,
    okButtonProps = {},
    okType,
    onCancel,
    cancelText,
    cancelButtonProps = {},
    bodyStyle = {},
    centered = false,
    closeIcon,
    footer,
    getContainer,
    destroyOnClose = false,
    forceRender,
    className
  } = props;

  const [modalVisible, setModalVisible] = useState(open || false);
  const modalRef = useRef(modalVisible);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  const setModalClose = () => {
    setModalVisible(false);
    modalRef.current = false;
    destroyOnClose &&
      unmountComponentAtNode(modalContainerRef.current as HTMLDivElement);
  };

  useEffect(() => {
    console.log('modalRef:', modalRef);
    if (!modalRef.current) {
      afterClose();
    }
    afterOpenChange(modalRef.current);
  }, [modalVisible]);

  useEffect(() => {
    if (forceRender) {
      setModalVisible(() => true);
    }
  }, []);

  const modalCls = classnames(prefixCls, {
    [`modal-center`]: centered
  });

  const modalBodyCls = classnames('modal-info', className);

  const modalWrapperCls = classnames('modal-wrapper', wrapClassName);

  const onOkClick = (e: React.MouseEvent) => {
    setModalClose();
    onOk(e);
  };

  const onCancelClick = (e: React.MouseEvent) => {
    setModalClose();
    onCancel(e);
  };

  const containerResult =
    typeof getContainer === 'function'
      ? getContainer()
      : getContainer || document.body;

  return (
    modalVisible &&
    createPortal(
      <div className={modalWrapperCls} ref={modalContainerRef}>
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
            ...style,
            top: centered ? '' : style?.top || '100px'
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
            {title && <div className="modal-title">{title}</div>}
            <div className="modal-content">{children}</div>
            <div className="modal-btns">
              {footer && Array.isArray(footer) ? (
                footer.map((button: ReactNode) => button)
              ) : footer != null ? (
                <>
                  <OKButton
                    onOk={onOkClick}
                    okButtonProps={okButtonProps}
                    okText={okText}
                    okType={okType}
                  />
                  <CancelButton
                    onCancel={onCancelClick}
                    cancelButtonProps={cancelButtonProps}
                    cancelText={cancelText}
                    cancelType={'primary'}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>,
      containerResult
    )
  );
};

Modal.defaultProps = {
  mask: true,
  cancelText: '取消',
  centered: false,
  closable: true,
  // closeIcon: <CloseOutLined />,
  confirmLoading: false,
  destroyOnClose: false,
  focusTriggerAfterClose: true,
  footer: 'footer',
  forceRender: false,
  getContainer: document.body,
  keyboard: true,
  maskStyle: {},
  // modalRender
  okButtonProps: {},
  okText: '确定',
  okType: 'primary',
  style: {},
  title: 'Modal title',
  width: 520,
  wrapClassName: '',
  zIndex: 1000,
  onOk: () => {},
  afterOpenChange: () => {}
};

export default Modal;

export const ModalSuccess = (props: Partial<ModalMethodsConfig>) => {
  const {
    autoFocusButton,
    afterClose = () => {},
    onOk = () => {},
    onCancel = () => {},
    content,
    ...restProps
  } = props;
  return (
    <Modal
      open
      afterClose={afterClose}
      footer={[
        <OKButton onOk={() => {}} okText={'知道了'} okButtonProps={{}} />
      ]}
      onCancel={onCancel}
      onOk={onOk}
      {...restProps}
    >
      {content}
    </Modal>
  );
};
