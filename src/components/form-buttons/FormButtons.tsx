import React, { FormEvent } from 'react';
import styles from './formButtons.module.css';
import { RxCross1 } from 'react-icons/rx';
import { IoMdCheckmark } from 'react-icons/io';

interface IFormButtons {
	onCancel: () => void;
	onFormSubmit: (e: FormEvent) => void;
}

const FormButtons = ({ onCancel, onFormSubmit }: IFormButtons) => {
	return (
		<div className={styles.add_buttons}>
			<button className={styles.btn} onClick={onCancel}>
				<RxCross1 />
			</button>
			<button className={styles.btn} onClick={onFormSubmit}>
				<IoMdCheckmark />
			</button>
		</div>
	);
};

export default FormButtons;
