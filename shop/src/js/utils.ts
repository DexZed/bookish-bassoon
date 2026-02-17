// utils.ts
export function html(strings: TemplateStringsArray, ...values: any[]): HTMLElement {
  const placeholders: Map<string, HTMLElement | HTMLElement[]> = new Map();
  
  // 1. Build the HTML string, replacing Objects with unique IDs
  const fullHtml = strings.reduce((acc, str, i) => {
    const value = values[i];
    let replacement = value;

    if (value instanceof HTMLElement || (Array.isArray(value) && value[0] instanceof HTMLElement)) {
      const id = `placeholder-${Math.random().toString(36).substr(2, 9)}`;
      placeholders.set(id, value);
      replacement = `<div id="${id}"></div>`; // Temporary marker
    }

    return acc + str + (replacement ?? "");
  }, "");

  const template = document.createElement("template");
  template.innerHTML = fullHtml.trim();
  const root = template.content.firstElementChild as HTMLElement;

  // 2. Swap placeholders with the actual DOM nodes
  placeholders.forEach((node, id) => {
    const marker = root.querySelector(`#${id}`);
    if (marker) {
      if (Array.isArray(node)) {
        marker.replaceWith(...node);
      } else {
        marker.replaceWith(node);
      }
    }
  });

  return root;
}