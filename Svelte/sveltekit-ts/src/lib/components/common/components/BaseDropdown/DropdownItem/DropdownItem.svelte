{#each props.items as item}
	<li>
		<BaseButton props={{ ...dropdownLinkProps, href: item.href }}>{item.label}</BaseButton>
	</li>
{/each}
