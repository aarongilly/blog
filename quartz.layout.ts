import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    // Component.MyCustomComponent()
  ],
  afterBody: [
    // Component.MyCustomComponent()
    Component.MobileOnly(Component.RecentNotes({title: "Recent Content"}))
  ],//Component.MyCustomComponent()],
  footer: Component.Footer({ // I customized the compontent itself
    links: {
      "✉️ Subscribe": "http://eepurl.com/gNPOV9",
      "? About": "/Pages/About",
    },
  }),
  // footer: 
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.TagList(),
    Component.ContentMeta(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.MobileOnly(Component.Search()),
    // Component.MobileOnly(Component.MyCustomMobileComponent()),
    Component.DesktopOnly(Component.MyCustomComponent()),
    Component.Spacer(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    // Component.TableOfContents(),
    // Component.DesktopOnly(Component.Search()),
    // Component.Search(),
    // Component.DesktopOnly(Component.MyCustomComponent()),
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.RecentNotes({title: "Recent Content", limit: 4})),
    // Component.Backlinks(),
    // Component.Graph(),
    // Component.Darkmode(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    // Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.MyCustomComponent(),],
}
