<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.title = 'Learn Svelte - Your Go-to Resource for Mastering Svelte';
		let metaDescription: HTMLMetaElement | null = document.querySelector(
			'meta[name="description"]'
		);
		let metaKeywords: HTMLMetaElement | null = document.querySelector('meta[name="keywords"]');
		if (metaDescription) {
			metaDescription.content =
				'The best platform for learning how to use Svelte, a modern JavaScript framework for building user interfaces. Start learning today!';
		}
		if (metaKeywords) {
			metaKeywords.content = 'Svelte, Learning, Tutorial, JavaScript, Framework, Frontend';
		}
	});
</script>

<div class="container">
	<header class="hero">
		<h1>Welcome to Learn Svelte</h1>
		<h2>Your Go-to Resource for Mastering Svelte</h2>
	</header>

	<section class="content">
		<h2>About Svelte</h2>
		<p>
			Svelte is a modern JavaScript framework used to build fast and efficient web applications. It
			differs from other frameworks by being truly reactive, and by doing most of the work at
			compile time, it results in smaller and more efficient code. Learn more about Svelte here.
		</p>

		<h2>Getting Started</h2>
		<p>
			Whether you're a beginner or a seasoned developer, we've got you covered. From setting up your
			environment to writing your first Svelte app, start your journey here.
		</p>
	</section>
</div>

<style>
	.container {
		width: 80%;
		margin: auto;
	}
	.hero {
		text-align: center;
		padding: 50px 0;
	}
	.content {
		margin-top: 50px;
	}
</style>
