---
tags:
  - creation
  - creation/other
date: 2026-01-09
---
# Summary

After years of iteration, I've arrived on an Obsidian-based project management system that I enjoy using, with no asterisks necessary. This page tells all about it.

# More
## Overview

### Capabilities

- **Project management**
	- With tasks & project notes
	- Housing resources used by projects
	- Housing templates
- **Getting Things Done**
	- `Projects` list 
	- `Next Actions` list - automatically derived from in-progress tasks in projects
	- Housing & facilitating my weekly review

#### Features

- **Almost zero overhead** - I don't spend time managing things for the sake of the system, it works with how I manage things naturally
- **Templates & resources** - don't repeat yourself
- **Reusable modules** - don't repeat yourself
- **Weekly notes** - Daily notes go by too quickly, weekly notes work better for my brain
- **Folder-based project lifecycle management** - Projects are `active`, `backlog`, or `maybe` depending on which folder they're in

## Vault Structure

Those familiar with Tiago Forte's PARA method will recognize the basic structure.

- **📁 Projects** - for *active* projects
	- **📁 Backlog** - for things I know I want to do, but am not actively working
		- **📁 Maybe** - for things I *might* want to do
- **📁 Areas** - for notes about the high-level areas of my life (e.g. health, home, family, etc)
- **📁 Resources** 
	- **📁 Assets** - where images & non-markdown files go
	- **📁 Templates** - for projects, resources, weekly notes
	- **📁 Inventory** - for housing notes about things I own (warranties, etc)
	- **📁 Drawings** - for housing Excalidraw drawings (and the `svg` exports)
	- **📁 Modules** - for reused modules across my notes (task queries, bases, etc)
- **📁 Archives** - don't delete things, but also don't let clutter build up in the main folders
	- **📁 Archived Projects**
	- **📁 Archived Resources**
	- **📁 Archived Areas** - e.g. "school"
- **📁 Periods**
	- **📁 Weeks** - for my weekly note
	- **📁 Years** - for annual reviews & goals
- ***📄 Home*** - a Markdown file, not a folder, the only markdown file in the top-level of the vault 
## Plug-ins

This is why I like the system the most - it's **not** using a ton of stitched-together plugins. In particular, I **avoid** the Dataview & Templater plugins, which are both incredibly powerful and awesome, but not necessary for how I do things.

- Core
	- **Tasks** - I *only* use tasks to gain access to the `task` *query* functionality
	- **[[Auto-Properties Plugin|Auto-properties]]** - for promoting in-progress tasks to a `next` property automatically
- Optional
	- **QuickAdd** - more easily creating project/resource/weekly notes, in the right folder, with the right template
	- **Excalidraw** - drawings are good, I set this up in a specific way (more [[#Excalidraw|below]])
	- **Calendar** - the calendar sidebar is an easy way to jump to a given weekly note
- Optional - purely aesthetic
	- **Linter** - I like having some consistent formatting applied to notes & this manages the `created` and `modified` properties
	- **Iconize** - adding little icons to notes, similar-ish to Notion
	- **Style Settings** - I've dabbled with CSS snippets before, but this is easier

## Key Notes

> [!example]
> ![[creations-obsidian-projects-1.png]]

### Home
```markdown
# [🗓️ Daily Note Link](obsidian://daily)

![[Tasks Not in Projects]]

### Active Projects
![[Active Projects.base]]

### Backlog

![[Backlog.base]]
```

### Tasks Not in Projects

NOTE: to make this render properly I had to take out a backtick. The "tasks" query embed requires **triple backticks** in reality.
```markdown
``tasks
not done
(due on or before next week) OR ((path does not include Projects) AND (status.type is IN_PROGRESS))
``
```

### Active Projects.base
```plaintext
filters:
  or:
    - file.folder == "Projects"
    - deadline <= today() + "1 week"
views:
  - type: list
    name: Active Project List
    groupBy:
      property: deadline
      direction: ASC
    order:
      - file.name
      - next
    indentProperties: true
  - type: table
    name: Table
    groupBy:
      property: deadline
      direction: ASC
    order:
      - file.name
      - next
    sort:
      - property: file.mtime
        direction: DESC
    columnSize:
      file.name: 332
      file.mtime: 205

```

### Backlog.base
```plaintext
filters:
  and:
    - file.folder.contains("Projects")
formulas:
  Untitled: ""
views:
  - type: table
    name: Backlog
    filters:
      and:
        - file.folder != "Projects"
    groupBy:
      property: file.folder
      direction: ASC
    order:
      - file.name
      - next
    sort:
      - property: file.mtime
        direction: DESC
    columnSize:
      file.name: 332
      file.mtime: 100

```

### newProject (template)

```markdown
---
created:
modified:
areas:
resources:
image: ""
todos: 0
deadline:
next: ""
---
<span style="font-size: 1.15em; color:orange; padding:0px; margin:0px;">Scope</span>
-

> [!check] Open Tasks
>
> ```tasks
> path includes {{query.file.path}}
> not done
> hide backlink
> ```

---

```

## Misc Tips

In lieu of writing a full-blown "how to...", which maybe I'll do someday, here are a smattering of tips that made it work well.

#### Auto-properties
- Key: "next"
- Rule: Pull all lines starting with "- [/]" 

- Key: "image"
- Rule: Pull first line starting with "![["

- Key: "todos"
- Rule: Count all lines starting with "- [ ]"

#### Daily Notes
- Set the "Daily Notes" plugin option date format to `YYYY-[W]WW` - this makes it function as *weekly* notes
- The obsidian URLs for daily notes still work, they now just point to your weekly note

#### Excalidraw
- If you, like me, are really particular about using only **durable file formats**, you can configure Excalidraw to auto-generate and embed SVGs (or PNGs) in your notes.
- For more, see: https://gillespedia.com/Excalidraw+in+Obsidian

#### Task Management
- Use **Obsidian-native** in-line tasks (i.e. just a regular checkbox)
- Mark your **next** tasks as "in-work" by changing `- [ ]` into `- [/]`. This is what makes the auto-property (and thus: bases) work nicely
- This is easier if you change the options in the Tasks plugin to change the task statuses such that tapping an empty checkbox first moves it to "in progress" before moving to "complete"