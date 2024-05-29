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
				let contentBlock = content.split('\n')
				let contentNodes = []
				let contentNode = []
				for (let i = 0; i < contentBlock.length; i++) {
					if (contentBlock[i] != '') {
						contentNode.push(contentBlock[i])
					} else {
						contentNodes.push(contentNode)
						contentNode = []
					}
				}
				let result = ''
				for (let i = 0; i < contentNodes.length; i++) {
					for (let j = 0; j < contentNodes[i].length; j++) {
						if (j === 0) {
							result += `<p>${contentNodes[i][j]}</p>`
						} else {
							result += markdownIt.render(contentNodes[i][j])
						}
					}
				}
				return `
              <div class="timeline-container">${result}</div>
          `
			}
		},
		assets: function () {
			return [{ name: 'Timeline.css' }, { name: 'Timeline.js' }]
		},
	}
}
