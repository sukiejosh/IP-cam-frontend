<template>
	<div class="w-full">
		<!-- <base-header /> -->
		<router-view />
	</div>
</template>

<style>
#app {
	text-align: center;
	color: var(--ep-text-color-primary);
}
</style>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/store/user";
// import { useStationStore } from "./store/stations";

const userStore = useUserStore();



</script>
