// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
class FireflyViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly extensionUri: vscode.Uri) {}

    resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
        };
		const imagePath = vscode.Uri.joinPath(this.extensionUri, 'media', 'firefly_02.webp');
        const imageUri = webviewView.webview.asWebviewUri(imagePath);
        webviewView.webview.html = `
		<body style="display: flex; flex-direction: column; align-items: center; padding-top: 130px;">
        	<img src="${imageUri}" width="180"/>
			<div style="font-size: 14px" font-weight: 500px"><p>.°<br>O</p>╭ ◜◝ ͡ ◜◝ ͡  ◜◝ ╮<br><span style="color:#b8a080">반디가 생각하는 중...</span><br>
			╰ ◟◞ ͜  ◟ ͜  ◞◟◞ ╯
			</div>
    	</body>
	`;
    }
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "firefly-manager" is now active!');

	const provider = new FireflyViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('fireflyView', provider)
	);
	vscode.commands.executeCommand('fireflyView.focus');
}

// This method is called when your extension is deactivated
export function deactivate() {}
