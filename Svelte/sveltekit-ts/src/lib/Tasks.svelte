<!-- Tasks.svelte -->
<script lang="ts">
	import api from './api.js';
	import { userPermissionsStore } from './auth0Store';

	interface Task {
		_id: {
			$oid: string;
		};
		title: string;
		description: string;
		createdAt?: string;
		updatedAt?: string;
	}

	let permissionsLoaded: boolean = false;
	userPermissionsStore.subscribe(($userPermissions: string[]) => {
		if ($userPermissions && $userPermissions.length > 0) {
			permissionsLoaded = true;
		}
	});

	let tasks: Task[] = [];
	let title: string = '';
	let description: string = '';
	let selectedTaskId: string | null = null;

	let userPermissions: string[] = [];
	userPermissionsStore.subscribe(($userPermissions: string[]) => {
		userPermissions = $userPermissions;
	});

	function hasPermission(permission: string): boolean {
		console.log(permission);
		console.log(userPermissions.includes(permission));

		return userPermissions.includes(permission);
	}
	async function fetchTasks() {
		const response = await api.get('/tasks');
		tasks = response.data;
	}

	async function createTask() {
		try {
			const response = await api.post('/tasks', {
				title: title,
				description: description
			});
		} catch (error) {
			console.error(error);
		}
		await fetchTasks();
	}

	async function updateTask() {
		await api.put(`/tasks/${selectedTaskId}`, { title, description });
		selectedTaskId = null;
		title = '';
		description = '';
		await fetchTasks();
	}

	async function deleteTask(id: string) {
		await api.delete(`/tasks/${id}`);
		await fetchTasks();
	}

	function selectTask(task: Task) {
		selectedTaskId = task._id.$oid;
		title = task.title;
		description = task.description;
	}

	fetchTasks();
</script>

{#if permissionsLoaded}
	<div>
		{#if hasPermission('create:tasks')}
			<h1>Task Manager</h1>

			<form on:submit|preventDefault={selectedTaskId ? updateTask : createTask}>
				<div>
					<label for="title">Title:</label>
					<input id="title" bind:value={title} />
				</div>
				<div>
					<label for="description">Description:</label>
					<input id="description" bind:value={description} />
				</div>

				<button type="submit">{selectedTaskId ? 'Update Task' : 'Add Task'}</button>

				{#if selectedTaskId}
					<button type="button" on:click={() => (selectedTaskId = null)}>Cancel</button>
				{/if}
			</form>
		{/if}
		<h2>Tasks</h2>
		{#if tasks.length === 0}
			<p>No tasks found.</p>
		{:else if hasPermission('read:tasks')}
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each tasks as task (task._id.$oid)}
						<tr>
							<td>{task.title}</td>
							<td>{task.description}</td>
							<td
								>{#if hasPermission('update:tasks')}
									<button on:click={() => selectTask(task)}>Edit</button>
								{/if}
								{#if hasPermission('delete:tasks')}
									<button on:click={() => deleteTask(task._id.$oid)}>Delete</button>{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
{/if}

<style>
	h1 {
		font-size: 2em;
		color: #333;
	}

	button {
		font-size: 1em;
		padding: 0.5em 1em;
		border: none;
		border-radius: 0.25em;
		background-color: #333;
		color: white;
		cursor: pointer;
	}

	button:hover {
		background-color: #555;
	}
</style>
