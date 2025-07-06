'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './form.module.css';
import FormButtons from '../form-buttons/FormButtons';
import TextareaAutosize from 'react-textarea-autosize';

type FormMode = 'add' | 'edit';

interface IForm {
	number: number;
	mode?: FormMode;
	initialData?: { title: string; description: string };
	onFormSubmit: (item: { title: string; description: string }) => void;
	onCancel: () => void;
}

const Form = ({
	number,
	mode = 'add',
	initialData,
	onFormSubmit,
	onCancel
}: IForm) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
	const descTextareaRef = useRef<HTMLTextAreaElement>(null);

	// function adjuctTextareaHeight(ref: RefObject<HTMLTextAreaElement | null) {
	// 	if (ref) {
	// 		ref.current.style.height = 'auto';
	// 		ref.current.style.height = `${ref.current.scrollHeight}px`;
	// 	}
	// }

	// useEffect(() => {
	// 	adjuctTextareaHeight(titleTextareaRef);
	// 	adjuctTextareaHeight(descTextareaRef);
	// }, [title, description]);

	useEffect(() => {
		if (mode === 'edit' && initialData) {
			setTitle(initialData.title);
			setDescription(initialData.description);
		}
	}, [mode, initialData]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (title !== '' && description !== '') {
			onFormSubmit({ title, description });
		} else if (title === '' && description !== '') {
			alert('Title is blank');
		} else if (title !== '' && description === '') {
			alert('Description is blank');
		} else {
			alert('Your note is blank');
		}
	};

	return (
		<form className={styles.form}>
			<div className={styles.form_header}>
				<span className={styles.num}>{number}</span>
			</div>

			<div className={styles.text_cont}>
				<TextareaAutosize
					placeholder='Title'
					className={styles.form_title}
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<hr className={styles.line} />

				<TextareaAutosize
					placeholder='Description'
					className={styles.form_description}
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
			</div>
			<FormButtons
				onFormSubmit={(e: FormEvent) => handleSubmit(e)}
				onCancel={onCancel}
			/>
		</form>
	);
};

export default Form;
