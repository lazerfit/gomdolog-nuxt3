import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
	const isToastOpened = ref(false);
	const toastMessage = ref('');
	const toastStatus = ref('');

	function setToast(text: string, status: string) {
		toastMessage.value = text;
		isToastOpened.value = true;
		toastStatus.value = status;
		setTimeout(() => {
			isToastOpened.value = false;
			toastMessage.value = '';
		}, 3000);
	}

	return { isToastOpened, toastMessage, toastStatus, setToast };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
