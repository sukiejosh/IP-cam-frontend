<template>
	<!-- <Stats2 /> -->
	<div class="flex flex-col md:flex-row-reverse md:h-screen w-full">
		<div class="flex-1 relative">
			<div
				class="absolute top-0 bg-gray-50 flex items-center w-full justify-start h-20 px-5"
			>
				<div class="flex-1">
					<div class="text-left font-bold text-2xl">Project IP CAM</div>
				</div>
				<div class="flex-none"></div>
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
						{{ date }}
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
								<!-- <el-button type="warning" :icon="Share" circle /> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-none">
			<div class="flex flex-col pt-2">
				<div class="text-xs">Filter by date</div>
				<div class="w-full p-2 flex space-x-2 items-center">
					<VDatePicker v-model="date">
						<template #default="{ inputValue, inputEvents }">
							<el-input readonly :value="inputValue" v-on="inputEvents" />
						</template>
					</VDatePicker>
					<div>
						<el-button
							@click="date = ''"
							type="danger"
							size="small"
							:icon="Close"
							circle
						/>
					</div>
				</div>
				<div
					class="md:overflow-y-auto overflow-x-auto w-full min-h-[100px] max-h-[100vh] md:h-screen h-[200px] p-5 flex md:flex-col flex-row md:space-y-3 space-y-0 space-x-3 md:space-x-0"
				>
					<div v-if="filteredObjects.length > 0" class="">
						<div
							@click="userStore.setImage(i)"
							:key="i"
							v-for="(n, i) in filteredObjects"
							class="bg-red-100 cursor-pointer md:w-40 md:h-40 h-20 w-20"
						>
							<img
								:src="n.imageUrl"
								class="shadow-xl w-full h-full rounded-xl"
							/>
						</div>
					</div>
					<div v-else>
						<div class="font-bold">No photos</div>
					</div>
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
	import { Download, Share, Close } from "@element-plus/icons-vue";
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

	const date = ref(new Date());

	const getImages = async () => {
		await userStore.getAllPhotos();
		setTimeout(getImages, 1500);
	};

	function filterObjectsByDate(array: any, targetDate: any) {
		if (!targetDate) return array;
		// Convert the target date to a Date object
		targetDate = new Date(targetDate);

		// Calculate the start and end times for the target date
		const startDate = new Date(targetDate);
		startDate.setHours(0, 0, 0, 0); // Set to the start of the day
		const endDate = new Date(targetDate);
		endDate.setHours(23, 59, 59, 999); // Set to the end of the day

		// Use the filter method to filter objects in the array
		const filteredArray = array.filter((item) => {
			// Convert the item's createdAt field to a Date object
			const createdAtDate = new Date(item.createdAt);

			// Check if the createdAt date falls within the start and end times
			return createdAtDate >= startDate && createdAtDate <= endDate;
		});

		return filteredArray;
	}

	const startDate = "2023-09-18T00:00:00.000Z"; // Replace with your selected start date
	const endDate = new Date().toISOString(); // Replace with your selected end date

	const filteredObjects = computed(() => {
		return filterObjectsByDate(userStore.photos, date.value);
	});

	onMounted(async () => {
		await getImages();
	});

	const logout = () => {};
</script>
