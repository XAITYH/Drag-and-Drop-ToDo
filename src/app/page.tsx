'use client';

import Card from '@/components/card/Card';
import styles from './page.module.css';
import { useState } from 'react';
import {
	closestCenter,
	defaultDropAnimation,
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	DropAnimation,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext
} from '@dnd-kit/sortable';
import AddCard from '@/components/add-card/AddCard';
import Form from '@/components/form/Form';

export type TItem = {
	id: number;
	title: string;
	description: string;
	isDone: boolean;
};

export default function Home() {
	const [items, setItems] = useState<TItem[]>([
		{
			id: 1,
			title: 'React',
			description: 'JS Library',
			isDone: false
		},
		{
			id: 2,
			title: 'Next.js',
			description: 'React Framework',
			isDone: false
		},
		{
			id: 5,
			title: 'Testing scrollbar',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ea inventore maxime exercitationem deleniti dolor animi facilis cumque ab? A voluptas ratione velit provident. Non facere inventore hic neque quisquam. Lorem ipsum epsilon delta beta force gojo satoru',
			isDone: false
		}
	]);

	const [visibleForm, setVisibleForm] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

	function handleAdd() {
		setEditingId(null);
		setFormMode('add');
		setVisibleForm(true);
	}

	function handleFormSubmit(data: { title: string; description: string }) {
		setItems(prevItems => {
			if (formMode === 'add') {
				return [
					...prevItems,
					{
						...data,
						id: Math.max(0, ...prevItems.map(item => item.id)) + 1,
						isDone: false
					}
				];
			} else if (editingId) {
				return prevItems.map(item =>
					item.id === editingId ? { ...item, ...data } : item
				);
			}
			return prevItems;
		});
		setEditingId(null);
		setFormMode('add');
		setVisibleForm(false);
	}

	function handleDone(id: number) {
		setItems(prevItems => {
			const updatedItems = prevItems.map(item =>
				item.id === id ? { ...item, isDone: !item.isDone } : item
			);

			const item = updatedItems.find(item => item.id === id);
			if (item?.isDone) {
				return [...updatedItems.filter(i => i.id !== id), item];
			}
			return updatedItems;
		});
	}

	function handleEdit(id: number) {
		const itemToEdit = items.find(item => item.id === id);
		try {
			if (itemToEdit) {
				setEditingId(id);
				setFormMode('edit');
				setVisibleForm(true);
			}
		} catch (error) {
			throw new Error('No such item');
		}
	}

	function handleDelete(id: number) {
		try {
			setItems(items => items.filter(item => item.id !== id));
		} catch (error) {
			alert('No such item');
			throw new Error('No such item');
		}
	}

	const [activeId, setActiveId] = useState<number | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor)
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as number);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setItems(items => {
				const oldIndex = items.findIndex(item => item.id === active.id);
				const newIndex = items.findIndex(item => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	};

	const dropAnimation: DropAnimation = {
		...defaultDropAnimation
	};

	const activeItem = activeId
		? items.find(item => item.id === activeId)
		: null;

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div>
				<header className={styles.header}>Drag & Drop ToDo</header>
				{visibleForm ? (
					<Form
						number={
							formMode === 'add'
								? items.length + 1
								: items.findIndex(
										item => item.id === editingId
								  ) + 1
						}
						mode={formMode}
						initialData={
							formMode === 'edit'
								? items.find(item => item.id === editingId)
								: undefined
						}
						onFormSubmit={handleFormSubmit}
						onCancel={() => setVisibleForm(false)}
					/>
				) : (
					<main className={styles.main}>
						<SortableContext
							items={items}
							strategy={rectSortingStrategy}
						>
							{items.map((item, idx) => (
								<Card
									key={idx}
									id={item.id}
									number={idx + 1}
									title={item.title}
									description={item.description}
									onDone={handleDone}
									isDone={item.isDone}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							))}
						</SortableContext>
						<AddCard onForm={handleAdd} />
					</main>
				)}
				<DragOverlay dropAnimation={dropAnimation}>
					{activeItem ? (
						<Card
							id={activeItem.id}
							number={
								items.findIndex(
									item => item.id === activeItem.id
								) + 1
							}
							title={activeItem.title}
							description={activeItem.description}
							onDone={handleDone}
							isDone={activeItem.isDone}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					) : null}
				</DragOverlay>
				<footer className={styles.footer}></footer>
			</div>
		</DndContext>
	);
}
