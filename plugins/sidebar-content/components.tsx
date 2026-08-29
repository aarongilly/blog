/** @jsxImportSource preact */
import type { QuartzComponent } from "@quartz-community/types"

export const SidebarContent = (): QuartzComponent => {
  const Component = () => (
    <div class="sidebar-content">
      {/* Add whatever you want inside this div. */}
      <ul>          
        <li><a href="/about">About</a></li>
        <li><a href="/creations">Creations</a></li>
        <li><a href="/tools">Tools</a></li>
        <li><a href="/good">Good Columns</a></li>
        <li><a href="/now">Now</a></li>
        <li><a href="/principles">Principles</a></li>
      </ul>
    </div>
  )

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
`

  return Component
}
