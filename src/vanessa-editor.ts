import { ActionManager } from "./actions";
import { ProblemManager } from "./problems";
import { RuntimeManager } from "./runtime";
import { SyntaxManager } from "./syntax";

export class VanessaEditor {

  // 1C:Enterprise interaction call.
  public getContent = (codeWidget: number = 0) => this.runtimeManager.getContent(codeWidget);
  public setContent = (arg: string) => { this.runtimeManager.clear(); this.editor.setValue(arg); }
  public undo = () => this.editor.trigger('undo…', 'undo', undefined);
  public redo = () => this.editor.trigger('undo…', 'redo', undefined);
  public popMessage = () => this.actionManager.popMessage();
  public getLineContent = (lineNumber: number, codeWidget: number = 0) => this.runtimeManager.getLineContent(lineNumber, codeWidget);
  public getSelectedContent = () => this.editor.getModel().getValueInRange(this.editor.getSelection());
  public getPosition = () => this.editor.getPosition();
  public getSelection = () => this.editor.getSelection();
  public setPosition = (lineNumber: number, column: number) => this.editor.setPosition({ lineNumber: lineNumber, column: column });
  public setSelection = (startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) => this.editor.setSelection(new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn));
  public setReadOnly = (arg: boolean) => this.editor.updateOptions({ readOnly: arg });
  public setTheme = (arg: string) => monaco.editor.setTheme(arg);
  public revealLine = (arg: number) => this.editor.revealLine(arg);
  public setRuntimeProgress = (status: string, lines: any, widget: number = 0) => this.runtimeManager.setStatus(status, lines, widget);
  public getRuntimeProgress = (status: string) => this.runtimeManager.getStatus(status);
  public getCurrentProgress = () => this.runtimeManager.getCurrent();
  public setCurrentProgress = (lineNumber: number, codeWidget: number = 0) => this.runtimeManager.setCurrent(lineNumber, codeWidget);
  public showRuntimeError = (lineNumber: number, codeWidget: number, data: string, text: string) => this.runtimeManager.showError(lineNumber, codeWidget, data, text);
  public showRuntimeCode = (lineNumber: number, text: string) => this.runtimeManager.showCode(lineNumber, text);
  public setRuntimeUnderline = (status: string, lines: any, widget: number = 0) => this.runtimeManager.setUnderline(status, lines, widget);
  public nextRuntimeProgress = () => this.runtimeManager.next();
  public clearRuntimeCodes = () => this.runtimeManager.clearSubcode();
  public clearRuntimeErrors = () => this.runtimeManager.clearErrors();
  public clearRuntimeStatus = () => this.runtimeManager.clearStatus();
  public clearRuntimeUnderline = () => this.runtimeManager.clearUnderline();
  public clearRuntimeProgress = () => this.runtimeManager.clear();
  public decorateBreakpoints = (arg: string) => this.runtimeManager.breakpoints = JSON.parse(arg);
  public setBreakpoints = (arg: string) => this.runtimeManager.breakpoints = JSON.parse(arg);
  public getBreakpoints = (arg: string) => JSON.stringify(this.runtimeManager.breakpoints);
  public decorateProblems = (arg: string) => this.problemManager.problems = JSON.parse(arg);
  public toggleBreakpoint = () => this.runtimeManager.toggleBreakpoint(this.editor.getPosition().lineNumber);
  public getActions = () => JSON.stringify(this.actionManager.actions);
  public addCommands = (arg: string) => this.actionManager.addCommands(JSON.parse(arg));
  public insertText = (text: string, arg: string = undefined) => this.actionManager.insertText(text, arg);
  public fireEvent = (event: any, arg: any = undefined) => this.actionManager.fireEvent(event, arg);
  public setSuggestWidgetWidth = (arg: any) => this.actionManager.setSuggestWidgetWidth(arg);
  public showMessage = (arg: string) => this.editor.getContribution('editor.contrib.messageController')["showMessage"](arg, this.getPosition());
  public onErrorLink = (e: HTMLElement) => this.fireEvent(e.dataset.id, e.parentElement.dataset.value);
  public checkSyntax = () => this.syntaxManager.checkSyntax();

  get errorLinks() { return this.actionManager.errorLinks; }
  get traceKeyboard(): boolean { return this.actionManager.traceKeyboard; }
  set traceKeyboard(value: boolean) { this.actionManager.traceKeyboard = value; }

  public editor: monaco.editor.IStandaloneCodeEditor;
  private runtimeManager: RuntimeManager;
  private problemManager: ProblemManager;
  private actionManager: ActionManager;
  private syntaxManager: SyntaxManager;

  constructor(content: string, language: string) {
    this.editor = monaco.editor.create(document.getElementById("VanessaEditor"), {
      language: language,
      scrollBeyondLastLine: false,
      glyphMargin: true,
      automaticLayout: true,
      lightbulb: { enabled: true }
    });
    this.editor.setValue(content);
    this.runtimeManager = new RuntimeManager(this);
    this.problemManager = new ProblemManager(this.editor);
    this.actionManager = new ActionManager(this.editor)
    this.syntaxManager = new SyntaxManager(this.editor);
  }

  public dispose(): void {
    this.editor.dispose();
  }
}
