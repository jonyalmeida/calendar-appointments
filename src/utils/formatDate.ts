export const formatDate = (date: Date): string =>
	`${date.getFullYear()}-${
		date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
	}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}T${
		date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
