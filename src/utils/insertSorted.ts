const findIndex = (arr, item) => {
	let low = 0,
		high = arr.length;

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

export const insertSorted = (arr, item) => {
	const position = findIndex(arr, item);
	arr.splice(position, 0, item);
	return arr;
};
