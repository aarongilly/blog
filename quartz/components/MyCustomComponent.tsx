import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
    links: Record<string, string>
}

export default ((opts?: Options) => {
    const Custom: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
        const year = new Date().getFullYear()
        const links = opts?.links ?? []
        // if(fileData.slug === 'index') return <></>
        return (
            <div class="desktop-only">
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <div style="margin: auto; width: 90px">
                        <img src="/assets/home-mugshot.png" style="border-radius: 50%"></img>
                    </div>
                    <div>
                        <div style="display:block">
                            <h3 style='margin-top: 0em'>Aaron Gillespie</h3>
                            <p>Husband. Father. Writer. Coder. Engineer. Purveyor of bad jokes.</p>
                        </div>
                    </div>
                    <div class="footer-link-box">
                        <a class="footer-link" href="http://eepurl.com/gNPOV9">
                            <img src="/assets/home-subscribe.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">Subscribe</div>
                        </a>
                        <span class="footer-link">
                            <img src="/assets/home-location.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">Lawrence, KS</div>
                        </span>
                        <a class="footer-link" href="https://gillespedia.com">
                            <img src="/assets/home-notes.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">My Notes</div>
                        </a>
                        <a class="footer-link" href="https://shows.acast.com/we-scene-a-movie">
                            <img src="/assets/home-podcast.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">Movie Podcast</div>
                        </a>
                        <a class="footer-link" href="https://aaronspuzzles.com">
                            <img src="/assets/home-puzzle.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">Puzzle Boxes</div>
                        </a>
                        <a class="footer-link" href="https://github.com/aarongilly">
                            <img src="/assets/home-github.svg" style="height: 1.5em; margin: 0em"></img><div style="margin-left: 0.5em">GitHub</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    Custom.css = style
    return Custom
}) satisfies QuartzComponentConstructor

