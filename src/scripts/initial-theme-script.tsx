export default function InitialThemeScript() {
  return (
    <script
      defer
      id="apply-theme-on-first-load"
      dangerouslySetInnerHTML={{
        __html: minifyJavaScript(
          `document.documentElement.setAttribute(
            'data-theme',
            (${getInitialTheme.toString()})()
          )`,
        ),
      }}
    />
  );
}

function getInitialTheme() {
  const persistedPreference = document.cookie
    .split(';')
    .find(function (text) {
      return text.trim().startsWith('theme=');
    });
  if (persistedPreference) {
    const theme = persistedPreference.split('=')[1];
    if (theme === 'light' || theme === 'dark') {
      return theme; // User-preferred theme
    }
  }
  const mediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );
  if (typeof mediaQueryList.matches === 'boolean') {
    return mediaQueryList.matches ? 'dark' : 'light'; // System-preferred theme
  }
  return 'light'; // Default theme
}
function minifyJavaScript(snippet: string): string {
  // See: https://chat.openai.com/share/9e677c6b-daa6-4dde-b989-f9901758300e
  return (
    snippet
      // Remove comments (single-line and multi-line)
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
      // Remove line breaks and multiple whitespaces
      .replace(/\s+/g, ' ')
      // Remove whitespaces around symbols
      .replace(
        /\s*([{}()[\].,;:+\-*/%&|^!=<>?~]|==|===|!=|!==|\+=|-=|\*=|\/=|%==|&&|\|\||<<|>>|>>>)\s*/g,
        '$1',
      )
  );
}
