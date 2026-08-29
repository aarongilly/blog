// components.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SidebarContent = () => {
  const Component = () => /* @__PURE__ */ jsx("div", { class: "sidebar-content", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about", children: "About" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/creations", children: "Creations" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/tools", children: "Tools" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/good", children: "Good Columns" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/now", children: "Now" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/principles", children: "Principles" }) })
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
`;
  return Component;
};
export {
  SidebarContent
};
