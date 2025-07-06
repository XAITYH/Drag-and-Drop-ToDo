'use client';

import React from 'react';
import styles from './card.module.css';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import CardButtons from '../card-buttons/CardButtons';
import { TItem } from '@/app/page';

interface ICard {
	id: number;
	number: number;
	title: string;
	description: string;
	onDone: (id: number) => void;
	isDone: boolean;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

const Card = ({
	id,
	number,
	title,
	description,
	onDone,
	isDone,
	onEdit,
	onDelete
}: ICard) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: id
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? 0 : 1,
		zIndex: isDragging ? 0 : 1
	};

	const textStyle = {
		textDecoration: isDone ? 'line-through' : 'none',
		color: isDone ? '#ffffff4a' : 'hsl(52, 90%, 75%)'
	};

	return (
		<div
			className={styles.card}
			style={style}
			ref={setNodeRef}
			{...attributes}
		>
			<div className={styles.card_header}>
				<span className={styles.num}>{number}</span>

				<CardButtons
					onDone={() => onDone(id)}
					isDone={isDone}
					onEdit={() => onEdit(id)}
					onDelete={() => onDelete(id)}
				/>
			</div>

			<div style={textStyle} className={styles.text_cont} {...listeners}>
				<h3 className={styles.card_title}>{title}</h3>

				<hr className={styles.line} />

				<p className={styles.card_description}>{description}</p>
			</div>
		</div>
	);
};

export default Card;
