// Import the necessary modules from the VS Code API
const vscode = require('vscode');

// This function is called when the extension is activated
function activate(context)
{
  // Retrieve the user's active theme configuration
  const activeTheme = vscode.workspace.getConfiguration().get('editor.tokenColorCustomizations');

  // Check if the necessary scope is supported by the current theme
  if (!activeTheme || !activeTheme['textMateRules'] || !activeTheme['textMateRules'].some(rule => rule.scope.includes('log.keywords1.hist')))
  {
    // Update the token color customization configuration with the default color for the unsupported scope
    const updatedTheme =
    {
      ...activeTheme,
      textMateRules:
      [
        ...(activeTheme?.textMateRules || []),
        { scope: "log.keywords1.hist",             settings: { foreground: '#ff00ff' } },
        { scope: "log.keywords2.hist",             settings: { foreground: '#ff6600' } },
        { scope: "log.keywords3.hist",             settings: { foreground: '#00aaff' } },
        { scope: "log.keywords4.hist",             settings: { foreground: '#00ff00' } },
        { scope: "invalid.hist",                   settings: { foreground: '#ff0000' } },
        { scope: "constant.numeric.hist",          settings: { foreground: '#656152' } },
        { scope: "comment.line.double-slash.hist", settings: { foreground: '#55aa44' } },
        { scope: "keyword.operator.hist",          settings: { foreground: '#7c4b2f' } },
        { scope: "string.quoted.hist",             settings: { foreground: '#999900' } },
      ]
    };

    // Apply the updated theme configuration with the default color
    vscode.workspace.getConfiguration().update('editor.tokenColorCustomizations', updatedTheme, true);
  }
}

// Export the activate function as the entry point for the extension
module.exports = {
  activate
};
