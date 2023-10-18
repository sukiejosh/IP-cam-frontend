<template>
	<!-- <Stats2 /> -->
	<div class="flex flex-col md:flex-row-reverse md:h-screen w-full">
		<div class="flex-1">
			<div
				class="fixed top-0 bg-gray-50 flex items-center w-full justify-start h-20 px-5"
			>
				<div class="flex-1">
					<div class="text-left font-bold text-2xl">Project IP CAM</div>
				</div>
			</div>
			<div
				class="flex mx-auto md:h-screen h-[70vh] items-center justify-center w-full"
			>
				<div v-if="!userStore.currentPhoto" class="text-xl font-bold">
					Click on an image to view information
				</div>
				<div
					v-else
					class="flex flex-col space-y-5 md:w-4/5 w-11/12 md:h-screen md:pt-32 pt-20"
				>
					<div class="w-full md:h-[70vh] h-[40vh] bg-gray-400 rounded-xl">
						<img
							:src="userStore.currentPhoto?.imageUrl"
							class="h-full w-full"
						/>
					</div>
					<div class="flex w-full mx-auto justify-center">
						<div
							class="w-4/5 flex flex-col md:flex-row md:space-y-1 space-y-5 srounded-full py-3 px-5 bg-gray-200"
						>
							<div class="flex-1">
								Speed {{ userStore.currentPhoto.speed }} | Time
								{{ convertDate(userStore.currentPhoto.time) }}
							</div>
							<div class="flex-none">
								<el-button
									@click="donwloadImage(userStore.currentPhoto)"
									type="success"
									:icon="Download"
									circle
								/>
								<el-button type="warning" :icon="Share" circle />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-none">
			<div
				class="md:overflow-y-auto overflow-x-auto w-full min-h-[100px] max-h-[100vh] md:h-screen h-full p-5 flex md:flex-col flex-row md:space-y-3 space-y-0 space-x-3 md:space-x-0"
			>
				<div
					@click="userStore.setImage(i)"
					:key="i"
					v-for="(n, i) in userStore.photos"
					class="bg-red-100 cursor-pointer"
				>
					<img
						:src="n.imageUrl"
						class="md:w-40 md:h-40 h-20 w-20 shadow-xl rounded-xl"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	#app {
		text-align: center;
		color: var(--ep-text-color-primary);
	}

	.main-container {
		height: calc(100vh - var(--ep-menu-item-height) - 3px);
	}
</style>

<script lang="ts" setup>
	import { useUserStore } from "~/store/user";
	import { Download, Share } from "@element-plus/icons-vue";
	const userStore = useUserStore();

	const donwloadImage = (currentPhoto: any) => {
		const imageUrl = currentPhoto?.imageUrl;
		const a = document.createElement("a");
		a.href = imageUrl;
		a.download = `New_cam_image_${Date.now()}.jpg`;
		a.click();
	};

	const convertDate = (date: string) => {
		return date ? new Date(date).toLocaleString() : "";
	};

	const getImages = async () => {
		await userStore.getAllPhotos();
		setTimeout(getImages, 1500);
	};

	onMounted(async () => {
		await getImages();
	});

	const logout = () => {};
</script>
