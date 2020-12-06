const { execSync } = require('child_process');

const ShellCommander = (sqlStatement) => {
	const shellCommand = 'echo ' + sqlStatement + ' >> E:\\GitHub\\data-cooker\\log.txt'
	// let stdout = execSync(shellCommand);
}

module.exports = ShellCommander;
