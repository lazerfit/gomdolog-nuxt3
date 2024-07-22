import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export interface ISigninForm {
	email: string;
	password: string;
}

export const useHeaderStore = defineStore('header', () => {
	const { $api } = useNuxtApp();
	const token = useSessionStorage('token', '');
	const userRole = useSessionStorage('userRole', '');
	const isAdmin = ref(false);
	const isModalOpened = ref(false);
	const isAdminMenuOpened = ref(false);
	const isDarkMode = ref(false);
	const toastStore = useCommonStore();
	const signinForm = ref<ISigninForm>({
		email: '',
		password: '',
	});

	const setLoginStatus = () => {
		if (userRole.value === '' || userRole.value === 'USER') {
			isAdmin.value = false;
		} else {
			isAdmin.value = true;
		}
	};

	const signin = async () => {
		await $api.admin
			.signin(signinForm.value)
			.then((response) => {
				token.value = response.token;
				userRole.value = response.role;
				isAdmin.value = true;
				isModalOpened.value = false;
				signinForm.value.password = '';
				toastStore.setToast('로그인에 성공하였습니다.', 'check');
			})
			.catch((error) => {
				console.log(error);
				toastStore.setToast(
					'아이디 혹은 비밀번호가 올바르지 않습니다.',
					'error'
				);
			});
	};

	return {
		isAdmin,
		isModalOpened,
		isAdminMenuOpened,
		isDarkMode,
		signinForm,
		setLoginStatus,
		signin,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useHeaderStore, import.meta.hot));
}
