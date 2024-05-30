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
						divDate.className = 'timeline-date'
						divDate.innerHTML = contentBlock[i].substring(0, index)
						divNode.appendChild(divDate)
						let divContent = document.createElement('div')
						divContent.className = 'timeline-content'
						divContent.innerHTML = markdownIt.render(contentBlock[i].substring(index + 1))
						divNode.appendChild(divContent)
						resultHtml.appendChild(divNode)
					}
				}
				return resultHtml.outerHTML
			}
		},
		assets: function () {
			return [{ name: 'Timeline.css' }, { name: 'TimelineRender.js' }]
		},
	}
}
