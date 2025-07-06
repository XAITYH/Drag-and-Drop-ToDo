import React from 'react';
import styles from './buttons.module.css';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';

interface ButtonProps {
	onDone: () => void;
	isDone: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

const CardButtons = ({ onDone, isDone, onEdit, onDelete }: ButtonProps) => {
	return (
		<div className={styles.buttons}>
			<button className={styles.btn} onClick={onDone}>
				{isDone ? <RxCross1 /> : <IoMdCheckmark />}
			</button>
			<button className={styles.btn} onClick={onEdit}>
				<MdEdit />
			</button>
			<button className={styles.btn} onClick={onDelete}>
				<MdDelete />
			</button>
		</div>
	);
};

export default CardButtons;
