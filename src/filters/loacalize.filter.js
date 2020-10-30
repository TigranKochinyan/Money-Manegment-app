import store from '../store';

import ru from '@/locales/lang-ru.json';
import am from '@/locales/lang-am.json';
import en from '@/locales/lang-en.json';

const locales = {
	'ru-RU': ru,
	'en-US': en,
	'am-AM': am
}

export default function localizeFilter(key) {
	const locale = store.getters.info.locale || 'ru-RU';
	return locales[locale][key] || `[Localize error]: key ${key} not found`;
}