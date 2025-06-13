<template>
	<div class="route-loader">
		<span />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.route-loader {
	position: absolute;
	z-index: 9999999;
	width: 100%;
	height: 5px;
	top: 0;
	left: 0;
	line-height: 0;
	display: inline-block;
	background-color: var(--color-gray, #bababa);
	background-image: linear-gradient(
		-45deg,
		var(--color-gray-light, #e8e8e8) 25%,
		transparent 25%,
		transparent 50%,
		var(--color-gray-light, #e8e8e8) 50%,
		var(--color-gray-light, #e8e8e8) 75%,
		transparent 75%,
		transparent
	);
	font-size: 30px;
	background-size: 1em 1em;
	box-sizing: border-box;
	animation: barStripe 0.5s linear infinite;
}

@keyframes barStripe {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 1em 0;
	}
}
</style>
