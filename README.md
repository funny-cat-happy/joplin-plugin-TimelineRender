# joplin-plugin-TimelineRender

render the timeline in the markdown

![](./photo/result.png)

# Usage

````
```timeline
2023-1-1
build project
build folder
 
2023-2-2
develop map generate and basic AI
 
2023-2-3
test map

2023-2-7
test map

2023-2-8
test map

2023-2-9
test map
```
````
The block start with \`\`\`timeline,end with \`\`\`

Every node is composed of time and content and is split by space line between different node.

# Change Style
For example,you want to change the color of dot

open the menu above Tools->Options->Appearance->Show Advanced Settings->Custom stylesheet rendered Markdown

copy the following text to the bottom of the file
```css
.timeline-dot-past {
  background: #148b82;
}
.timeline-dot-current {
  background: #f0a80d;
}
.timeline-dot-future {
  background: #f55104;
}
```
save the file and reboot your joplin
# Acknowledgements
Hieu-Thi Luong's Life Calendar plugin,I refer to his code.

乔珂力的css时间轴教程

Joplin's offical tutorial.

# License
GPL

# Change Log
## 1.0.1
- fix the error of time in different country
- add the change style chapter to readme.md
## 1.0.2
- fixed the problem of time reduction by one day in some countries
