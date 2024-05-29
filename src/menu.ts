import joplin from 'api'
import { SettingItemType } from 'api/types'
const registerTimelineMenu = async () => {
	await joplin.settings.registerSection('timeline', {
		label: 'Timeline',
		iconName: 'fas fa-clock',
	})
	await joplin.settings.registerSettings({
		timeformat: {
			value: '2023-2-3',
			type: SettingItemType.String,
			isEnum: true,
			section: 'timeline',
			public: true,
			label: 'time format',
			options: {
				'2023-2-3': '2023-2-3',
				'3-2-2023': '3-2-2023',
			},
		},
	})
}
export default registerTimelineMenu
