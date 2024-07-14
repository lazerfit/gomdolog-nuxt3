import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { JWT } from '~/types';

export interface SigninForm {
	email: string;
	password: string;
}

export const useHeaderStore = defineStore('header', () => {
	const config = useRuntimeConfig();
	const isAdmin = ref(false);
	const isModalOpened = ref(false);
	const isAdminMenuOpened = ref(false);
	const isDarkMode = ref(false);
	const toastStore = useCommonStore();
	const signinForm = ref<SigninForm>({
		email: '',
		password: '',
	});

	const darkModeToggle = () => {
		isDarkMode.value = !isDarkMode.value;
		localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
		if (isDarkMode.value) {
			document.body.classList.add('darkMode');
		} else {
			document.body.classList.remove('darkMode');
		}
	};

	const setDarkMode = () => {
		const savedSetting = localStorage.getItem('darkMode');
		if (savedSetting === 'true') {
			isDarkMode.value = true;
		} else {
			isDarkMode.value = false;
		}
	};

	const setLoginStatus = () => {
		if (
			sessionStorage.getItem('userRole') === null ||
			sessionStorage.getItem('useRole') === 'USER'
		) {
			isAdmin.value = false;
		} else {
			isAdmin.value = true;
		}
	};

	const signin = async () => {
		try {
			const data = await $fetch<JWT>(`${config.public.apiBase}/auth/signin`, {
				method: 'POST',
				body: {
					email: signinForm.value.email,
					password: signinForm.value.password,
				},
			});

			sessionStorage.setItem('token', data.token);
			sessionStorage.setItem('userRole', data.role);
			isAdmin.value = true;
			isModalOpened.value = false;
			signinForm.value.password = '';
			toastStore.setToast('로그인에 성공하였습니다.', 'check');
		} catch (error) {
			console.log(error);
			toastStore.setToast('아이디 혹은 비밀번호가 올바르지 않습니다.', 'error');
		}
	};

	return {
		isAdmin,
		isModalOpened,
		isAdminMenuOpened,
		isDarkMode,
		signinForm,
		darkModeToggle,
		setDarkMode,
		setLoginStatus,
		signin,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useHeaderStore, import.meta.hot));
}
