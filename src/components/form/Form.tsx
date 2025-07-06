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

	useEffect(() => {
		if (mode === 'add') {
			setTitle('');
			setDescription('');
		} else if (mode === 'edit' && initialData) {
			setTitle(initialData.title);
			setDescription(initialData.description);
		}
	}, [mode, initialData]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!title.trim() || !description.trim()) {
			alert('Please fill all fields');
			return;
		}
		onFormSubmit({ title, description });
	}

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
