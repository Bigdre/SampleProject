<!-- src/routes/blog/index.svelte -->
<script context="module">
    import Post1 from '$lib/posts/post1.svx';
  
    export const posts = [
      {
        component: Post1,
        metadata: Post1.metadata,
      },
    ];
  </script>
  
  <script>
    export { posts } from './index.svelte';
    import Post from '$lib/components/common/inputs/Post.svelte';
  </script>
  
  {#each posts as { component: PostComponent, metadata }}
    <Post {metadata.title} {metadata.date}>
      <svelte:component this={PostComponent} />
    </Post>
  {/each}
  
  <style>
    /* Add your styles here */
  </style>