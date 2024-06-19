import Btn from './Btn';
import './modal.scss';

interface ModalProps {
  text: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { text, onConfirm, onCancel, cancelText, confirmText } = props;

  return (
    <div className="modal_main">
      <div className="modal_main__content">
        <p>{text}</p>
        <div className="modal_main__buttons">
          {confirmText && onConfirm && <Btn text={confirmText} btnClass="primary_opposite" onClick={onConfirm} />}
          {cancelText && onCancel && <Btn text={cancelText} btnClass="primary" onClick={onCancel} />}
        </div>
      </div>
    </div>
  );
};
