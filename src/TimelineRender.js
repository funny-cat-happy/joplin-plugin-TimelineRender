import joplin from 'api'
document.addEventListener('joplin-noteDidUpdate', parseContent)
if (/WebKit/i.test(navigator.userAgent)) {
	let _timer_life = setInterval(function () {
		if (/loaded|complete/.test(document.readyState)) {
			if (_timer_life) clearInterval(_timer_life)
			parseContent()
		}
	}, 10)
}

function parseContent() {
	const timelines = document.getElementsByClassName('timeline-container')
	for (var i = 0; i < timelines.length; i++) {
		var timeline = timelines[i]
		reBuildStruct(timeline)
	}
}

async function reBuildStruct(container) {
	console.error(await joplin.settings.value('timeformat'))
	let itemList = container.getElementsByClassName('timeline-item')
	for (let index = 0; index < itemList.length; index++) {
		const item = itemList[index]
		const itemDateStr = item.getElementsByClassName('timeline-date')[0].innerText
		let timelineElem = document.createElement('div')
		timelineElem.className = 'timeline'
		let timelineLeftElem = document.createElement('div')
		timelineLeftElem.className = 'timeline-left'
		timelineLeftElem.innerHTML = `<p>${itemDateStr}</p>`
		let timelineDotElem = document.createElement('div')
		timelineDotElem.className = 'timeline-dot-current'
		if (itemDate > currentDate) {
			timelineDotElem.className = 'timeline-dot-future'
		} else if (itemDate < currentDate) {
			timelineDotElem.className = 'timeline-dot-past'
		}
		const itemContent = item.getElementsByClassName('timeline-content')[0]
		let timelineRightElem = document.createElement('div')
		timelineRightElem.className = 'timeline-right'
		timelineRightElem.innerHTML = itemContent.outerHTML
		timelineElem.appendChild(timelineLeftElem)
		timelineElem.appendChild(timelineDotElem)
		timelineElem.appendChild(timelineRightElem)
		itemList[index].innerHTML = timelineElem.innerHTML
	}
}

function dateCompare(date) {
	const itemDate = new Date(itemDateStr + 'T00:00:00Z')
	let currentDate = new Date()
	currentDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()))
}
