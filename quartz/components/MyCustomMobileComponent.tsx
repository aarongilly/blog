import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
    links: Record<string, string>
}

export default ((opts?: Options) => {
    const Custom: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
        const year = new Date().getFullYear()
        const links = opts?.links ?? []
        return (
            <div>
                Not in use currently.
            </div>
        )
    }

    Custom.css = style
    return Custom
}) satisfies QuartzComponentConstructor

