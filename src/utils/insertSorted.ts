import { Reminder } from '../interfaces';

const findIndex = (arr: Reminder[], item: Reminder): number => {
	let low: number = 0,
		high: number = arr.length;

	while (low < high) {
		let mid = (low + high) >>> 1;
		if (arr[mid].dateTime < item.dateTime) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}
	return low;
};

export const insertSorted = (arr: Reminder[], item: Reminder): Reminder[] => {
	const position: number = findIndex(arr, item);
	arr.splice(position, 0, item);
	return arr;
};
