<!-- ColorPicker.svelte -->
<script lang="ts">
	export let nicknameProp: string; // Add user prop
	let backgroundColor: string = '#ffffff';

	function updateBackgroundColor(event: Event) {
		backgroundColor = (event.target as HTMLInputElement).value;
		document.body.style.backgroundColor = backgroundColor;
		document.cookie = `backgroundColor_${nicknameProp}=${encodeURIComponent(
			backgroundColor
		)};path=/;max-age=31536000`; // Save color as a cookie with the user's ID
	}

	function getBackgroundColor(nickname: string) {
		const savedColor = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`backgroundColor_${nickname}`));
		if (savedColor) {
			backgroundColor = decodeURIComponent(savedColor.split('=')[1]);
			document.body.style.backgroundColor = backgroundColor;
		}
	}

	$: {
		getBackgroundColor(nicknameProp);
	}
</script>

<label for="colorPicker">Choose a background color:</label>
<input
	type="color"
	id="colorPicker"
	bind:value={backgroundColor}
	on:input={updateBackgroundColor}
/>
