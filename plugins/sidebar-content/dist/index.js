// components.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SidebarContent = () => {
  const Component = () => /* @__PURE__ */ jsx("div", { class: "sidebar-content", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/about", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "8", r: "4" }),
        /* @__PURE__ */ jsx("path", { d: "M4 21a8 8 0 0 1 16 0" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "About" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/creations", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Creations" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/tools", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9" }),
        /* @__PURE__ */ jsx("path", { d: "m17.6 15 3.7-3.7a1 1 0 0 0 0-1.4l-7.2-7.2a1 1 0 0 0-1.4 0L9 6.4Z" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Tools" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/good", children: [
      /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2l-5-4.9 6.9-1Z" }) }),
      /* @__PURE__ */ jsx("span", { children: "Good Columns" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/now", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx("path", { d: "M12 7v5l3 2" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Now" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/principles", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx("path", { d: "m16 8-2.5 5.5L8 16l2.5-5.5Z" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Principles" })
    ] }) })
  ] }) });
  Component.css = `
.sidebar-content {
  padding-top: 1rem;
  border-top: 1px solid var(--column-rule, var(--lightgray));
  font-size: 0.84rem;
  line-height: 1.45;
}

.sidebar-content > :first-child {
  margin-top: 0;
}

.sidebar-content > :last-child {
  margin-bottom: 0;
}

.sidebar-content ul {
  display: grid;
  gap: 0.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-content li {
  margin: 0;
}

.sidebar-content a {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.31rem 0.5rem;
  border-radius: 0.4rem;
  color: var(--darkgray);
  font-size: 0.92rem;
  transition:
    color 140ms ease,
    background-color 140ms ease,
    transform 140ms ease;
}

.sidebar-content a:hover {
  color: var(--column-accent, var(--secondary));
  background: var(--column-surface, var(--highlight));
  transform: translateX(2px);
}

.sidebar-content svg {
  width: 1.15rem;
  height: 1.15rem;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-content a {
    transition: none;
  }
}
`;
  return Component;
};
export {
  SidebarContent
};
