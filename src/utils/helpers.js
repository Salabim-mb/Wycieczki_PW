export const isYoutubeLink = link =>
	typeof link === 'string'
		? link.match(/^(https?:\/\/)(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
		: false;
