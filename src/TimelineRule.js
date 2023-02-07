module.exports = {
  default: function(context) {
    return {
      plugin: function (markdownIt, _options) {
        const defaultRender = markdownIt.renderer.rules.fence || function(tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
        markdownIt.renderer.rules.fence = function(tokens, idx, options, env, self) {
          const token = tokens[idx];
          if (token.info !== 'timeline') 
          {
            return defaultRender(tokens, idx, options, env, self);
          }
          try {
            var contentHtml = markdownIt.utils.escapeHtml(token.content);
          } catch (e) {
            var contentHtml = {};
          }
          return `
              <div class="timeline-container">${contentHtml}</div>
          `;
        };
      },
      assets: function () {
        return [
            { name: 'Timeline.css' },
            { name: 'Timeline.js' }
        ];
      }
    }
  }
}