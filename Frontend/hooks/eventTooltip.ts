/* eslint-disable @typescript-eslint/no-explicit-any */
export function handleEventMouseEnter(info: any) {

  if (info.el.tooltip) {
    info.el.tooltip.remove();
  }

  const tooltip = document.createElement("div");

  tooltip.className =
    "fixed z-[9999999] bg-opacity-80 text-white py-2 px-3 rounded shadow-lg text-sm max-w-xs break-words pointer-events-none";

  tooltip.style.backgroundColor = "#F5F5F5";
  tooltip.style.color = "#3C3D37";
  const title = info.event.title;
  const description = info.event.extendedProps?.description || "";
  const start = info.event.start ? info.event.start.toLocaleString() : "";
  const end = info.event.end ? info.event.end.toLocaleString() : "";

  tooltip.innerHTML = `
    <strong>${title}</strong><br>
    ${description ? description + "<br>" : ""}
    <small>Start: ${start}</small><br>
    <small>End: ${end}</small>
  `;

  document.body.appendChild(tooltip);
  info.el.tooltip = tooltip;

  tooltip.style.position = "absolute";
  tooltip.style.top = `${info.jsEvent.clientY + 10}px`;
  tooltip.style.left = `${info.jsEvent.clientX + 10}px`;

  tooltip.style.maxWidth = "250px";
  tooltip.style.whiteSpace = "normal";
  tooltip.style.overflow = "visible";
}

export function handleEventMouseLeave(info: any) {
  if (info.el.tooltip) {
    info.el.tooltip.remove();
    info.el.tooltip = null;
  }
}
