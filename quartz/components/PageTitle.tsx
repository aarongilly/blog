import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const imgSrc = joinSegments(baseDir, "static/logo-icon.png")
  return (
    <h1 class={classNames(displayClass, "page-title")} >
      <a href={baseDir} style="display:flex; align-items: center"><img src={imgSrc} alt="Eye Logo" style="height: 1em; padding-right: 0.25em"></img>{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
