/** @jsxImportSource preact */
import type { QuartzComponent } from "@quartz-community/types"

export const SidebarContent = (): QuartzComponent => {
  const Component = () => (
    <div class="sidebar-content">
      {/* Add whatever you want inside this div. */}
      <ul>
        <li>
          <a href="/about">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="/creations">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span>Creations</span>
          </a>
        </li>
        <li>
          <a href="/tools">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9" />
              <path d="m17.6 15 3.7-3.7a1 1 0 0 0 0-1.4l-7.2-7.2a1 1 0 0 0-1.4 0L9 6.4Z" />
            </svg>
            <span>Tools</span>
          </a>
        </li>
        <li>
          <a href="/good">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2l-5-4.9 6.9-1Z" />
            </svg>
            <span>Good Columns</span>
          </a>
        </li>
        <li>
          <a href="/principles">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m16 8-2.5 5.5L8 16l2.5-5.5Z" />
            </svg>
            <span>Principles</span>
          </a>
        </li>
        <li>
          <a href="/now">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>Now</span>
          </a>
        </li>
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
`

  return Component
}
