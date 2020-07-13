export default function loadMore (res, count) {
	//Мой вариант
	const messages = res.splice(0, count)
	messages.forEach(item => item.main = true)
	return messages
}