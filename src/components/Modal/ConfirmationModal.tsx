import { Modal } from '@/components/Modal';
import { ReactNode } from 'react'

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	content: ReactNode;
}

export const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	content,
}: ConfirmationModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			title="Confirmação"
			onClose={onClose}
			onConfirm={onConfirm}
			footer={{ confirmText: 'Confirmar', cancelText: 'Cancelar' }}
		>
			<div data-modal-content>
				{content}
			</div>
		</Modal>
	);
};
