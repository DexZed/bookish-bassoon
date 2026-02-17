// utils.ts
export function html(strings: TemplateStringsArray, ...values: any[]): HTMLElement {
  // Combine the template literal parts
  const fullHtml = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
  
  const template = document.createElement("template");
  template.innerHTML = fullHtml.trim();
  
  const element = template.content.firstElementChild;
  if (!(element instanceof HTMLElement)) {
    throw new Error("The html helper must return exactly one root HTMLElement.");
  }
  
  return element;
}