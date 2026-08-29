import type { FullSlug, QuartzComponent, QuartzComponentProps } from "@quartz-community/types"
import { pathToRoot } from "@quartz-community/utils"

export interface ProfileLink {
  label: string
  href: string
}

export interface ProfileCardOptions {
  name?: string
  image?: string
  imageAlt?: string
  bio?: string
  location?: string
  aboutHref?: string
  aboutLabel?: string
  links?: ProfileLink[]
}

const defaults: Required<Omit<ProfileCardOptions, "links">> & { links: ProfileLink[] } = {
  name: "Aaron Gillespie",
  image: "assets/home-mugshot.png",
  imageAlt: "Aaron Gillespie",
  bio: "Making things, measuring things, and writing about whatever survives both.",
  location: "Kansas",
  aboutHref: "pages/about",
  aboutLabel: "More about me",
  links: [],
}

function localHref(slug: FullSlug, target: string): string {
  const root = pathToRoot(slug)
  return `${root}/${target.replace(/^\//, "")}`
}

export const ProfileCard = (userOptions?: ProfileCardOptions): QuartzComponent => {
  const options = { ...defaults, ...userOptions }

  const Component = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = fileData.slug as FullSlug

    return (
      <aside
        class={`${displayClass ?? ""} profile-card`.trim()}
        aria-label={`About ${options.name}`}
      >
        <a class="profile-card-image-link" href={localHref(slug, options.aboutHref)}>
          <img
            class="profile-card-image"
            src={localHref(slug, options.image)}
            alt={options.imageAlt}
            loading="lazy"
            width="44"
            height="44"
          />
        </a>
        <div class="profile-card-identity">
          <p class="profile-card-name">{options.name}</p>
          {options.location && <p class="profile-card-location">Based in {options.location}</p>}
        </div>
        <div class="profile-card-copy">
          <p class="profile-card-bio">{options.bio}</p>
          <nav class="profile-card-links" aria-label={`${options.name} links`}>
            <a href={localHref(slug, options.aboutHref)}>{options.aboutLabel}</a>
            {options.links.map((link) => (
              <a href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>
      </aside>
    )
  }

  Component.css = `
.profile-card {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  gap: 0.6rem 0.75rem;
  align-items: center;
  padding: 0.75rem 0.15rem;
  border-top: 1px solid var(--column-rule, var(--lightgray));
}

.profile-card-image-link {
  display: block;
  line-height: 0;
}

.profile-card-image {
  width: 2.75rem;
  height: 2.75rem;
  margin: 0;
  border-radius: 50%;
  object-fit: cover;
  filter: saturate(0.88) contrast(1.03);
  box-shadow: none;
}

.profile-card-copy {
  grid-column: 1 / -1;
}

.profile-card-identity p,
.profile-card-copy p {
  margin: 0;
}

.profile-card-name {
  color: var(--dark);
  font-family: var(--headerFont);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.profile-card-location {
  margin-top: 0.15rem !important;
  color: var(--gray) !important;
  font-family: var(--codeFont);
  font-size: 0.64rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.profile-card-bio {
  font-size: 0.84rem;
  line-height: 1.45;
}

.profile-card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.75rem;
  margin-top: 0.65rem;
  font-size: 0.76rem;
}

.profile-card-links a {
  color: var(--secondary);
}

.profile-card-links a::after {
  content: " →";
  color: var(--column-accent, var(--tertiary));
}

@media (max-width: 800px) {
  .profile-card {
    display: none;
  }
}

`

  return Component
}
