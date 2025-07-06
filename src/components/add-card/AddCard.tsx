import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import styles from './addCard.module.css';

const AddCard = ({ onForm }: { onForm: () => void }) => {
	return (
		<div className={`${styles.card} ${styles.add_card}`} onClick={onForm}>
			<CiCirclePlus className={styles.add_icon} />
		</div>
	);
};

export default AddCard;
