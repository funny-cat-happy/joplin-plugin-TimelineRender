export default function (context) {
	return {
		plugin: function (markdownIt, _options) {
			const defaultRender =
				markdownIt.renderer.rules.fence ||
				function (tokens, idx, options, env, self) {
					return self.renderToken(tokens, idx, options, env, self)
				}
			markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
				const token = tokens[idx]
				if (token.info !== 'timeline') {
					return defaultRender(tokens, idx, options, env, self)
				}
				let content = markdownIt.utils.escapeHtml(token.content)
				let contentBlock = content.split(/\n\s*\n/g)
				let resultHtml = document.createElement('div')
				resultHtml.className = 'timeline-container'
				for (let i = 0; i < contentBlock.length; i++) {
					let divNode = document.createElement('div')
					divNode.className = 'timeline-item'
					let index = contentBlock[i].indexOf('\n')
					if (index !== -1) {
						let divDate = document.createElement('div')
						let itemDateStr = contentBlock[i].substring(0, index)
						divDate.className = 'timeline-left'
						divDate.innerHTML = `<p>${itemDateStr}</p>`
						divNode.appendChild(divDate)
						let timelineDotElem = document.createElement('div')
						timelineDotElem.className = 'timeline-dot-current'
						const compareResult = compareDate(itemDateStr, _options.settingValue('timeformat'))
						if (compareResult==='future') {
							timelineDotElem.className = 'timeline-dot-future'
						} else if (compareResult==='past') {
							timelineDotElem.className = 'timeline-dot-past'
						}
						divNode.appendChild(timelineDotElem)
						let divContent = document.createElement('div')
						divContent.className = 'timeline-right'
						divContent.innerHTML = markdownIt.render(contentBlock[i].substring(index + 1))
						divNode.appendChild(divContent)
						resultHtml.appendChild(divNode)
					}
				}
				return resultHtml.outerHTML
			}
		},
		assets: function () {
			return [{ name: 'Timeline.css' }]
		},
	}
}
const compareDate = (date, format) => {
	try {
		date = date.split('-')
		let itemDate: Date
		if (format === 'YYYY-MM-DD') {
			itemDate = new Date(Date.UTC(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2])))
		} else if (format === 'DD-MM-YYYY') {
			itemDate = new Date(Date.UTC(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0])))
		}
		let currentDate = new Date()
		currentDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()))
		if (itemDate > currentDate) {
			return 'future'
		} else if (itemDate < currentDate) {
			return 'past'
		}
		return 'current'
	} catch (error) {
		return 'current'
	}
}
