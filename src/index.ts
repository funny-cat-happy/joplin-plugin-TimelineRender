import joplin from 'api'
import { ContentScriptType } from 'api/types'
import registerTimelineMenu from './menu'

joplin.plugins.register({
	onStart: async function () {
		registerTimelineMenu()
		await joplin.contentScripts.register(ContentScriptType.MarkdownItPlugin, 'TimelineRule', './TimelineRule.js')
	},
})
