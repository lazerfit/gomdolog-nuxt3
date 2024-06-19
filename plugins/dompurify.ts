import DOMPurify from 'dompurify';

declare module 'nuxt/app' {
	interface NuxtApp {
		$sanitizeHTML(dirty: string): string;
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$sanitizeHTML: (dirty: string) => string;
	}
}

export default defineNuxtPlugin(async (nuxtApp) => {
	let sanitize;

	if (import.meta.server) {
		const { JSDOM } = await import('jsdom');
		sanitize = DOMPurify(new JSDOM('').window).sanitize;
	} else {
		sanitize = DOMPurify.sanitize;
	}

	nuxtApp.provide('sanitizeHTML', sanitize);
});
