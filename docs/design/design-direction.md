# DESIGN.md

## Product Identity

This website is a personal portfolio for Ebrar, a full-stack software engineer.

The design should feel like a personal engineering operating system: part terminal dashboard, part developer command center, part structured systems map.

The site should communicate:

- Practical software engineering
- End-to-end product development
- Frontend, backend, QA, and workflow depth
- Systems thinking
- Clean execution
- AI-assisted development
- Developer tooling familiarity
- Calm technical confidence

The design should feel professional enough for hiring managers, founders, and engineering teams, while still having a strong personal identity.

It should not feel like:

- A generic SaaS landing page
- A cyberpunk or gamer UI
- A hacker cliché
- A colorful portfolio template
- A marketing-heavy personal brand page

The page should feel like an engineer’s workspace: structured, useful, readable, and intentional.

---

## Core Design Direction

Use the following adjectives as the main creative direction:

- Terminal-inspired
- Systems-oriented
- Developer cockpit
- Technical
- Dense but readable
- Editorial engineering
- Dark interface
- Monospace-heavy
- Minimal
- Structured
- Precise
- Calm
- Slightly industrial
- Internal-tool inspired
- Operating-system-like

The visual target is a dark terminal-style engineering dashboard with fixed panes, thin grid borders, path-based labels, calm green highlights, and compact but readable information density.

The design should look like a real technical interface, not a decorative imitation of one.

---

## Visual Personality

The site should feel like:

- A command center for a software engineer
- A developer system monitor
- An internal platform dashboard
- A terminal workspace
- A technical notebook
- A compact engineering profile

The page should feel dense, but controlled.

The user should be able to understand the person’s work, stack, projects, and workflow quickly from one structured view.

Avoid excessive empty space.

Avoid decorative elements that do not serve the layout.

Every line, panel, label, and accent should feel intentional.

---

## Color System

### Primary Background

Use a near-black graphite background with a slight blue/green tint.

Recommended values:

- `#071012`
- `#081113`
- `#0B1416`
- `#0A1113`

The background should not be pure black. It should feel soft, dark, technical, and slightly atmospheric.

### Secondary Background

Use slightly lighter dark panels for grouped content.

Recommended values:

- `#10191C`
- `#121D20`
- `#111A1D`
- `#0F181B`

Panels should be subtle. Do not make them look like floating SaaS cards.

### Active / Hover Background

Use a slightly brighter dark tone for active navigation, hover states, and selected rows.

Recommended values:

- `#172326`
- `#1A292D`
- `#142023`

Hover changes should be subtle and fast.

### Borders

Borders are a core part of the identity.

Use thin, low-contrast lines to build the full page grid.

Recommended values:

- Default border: `rgba(180, 220, 220, 0.12)`
- Stronger border: `rgba(180, 220, 220, 0.22)`
- Active border: `rgba(108, 255, 85, 0.65)`

Borders should clearly divide the interface into panes, but should never look bright or decorative.

The layout should rely heavily on visible grid divisions.

Sections should feel like panes inside one unified interface, not independent floating cards.

### Text Colors

Primary text:

- `#E8ECEA`
- Soft off-white
- Used for headings, names, role titles, and important labels

Secondary text:

- `#9AA6A7`
- Muted gray-blue
- Used for descriptions and body copy

Tertiary text:

- `#6F7C7E`
- Dim technical metadata
- Used for timestamps, labels, supporting details, and footer copy

Muted text should still remain readable on dark backgrounds.

### Accent Green

Primary accent:

- `#63E04F`

Secondary accent:

- `#8BFF72`

Darker accent option:

- `#4FCB3F`

Green should be used sparingly.

Use green only for:

- Active navigation state
- Status indicators
- Terminal prompts
- Highlighted dates
- Links
- Small tags
- Hero cursor
- Timeline nodes
- Key action labels

Do not use green for long paragraphs.

Do not turn the page into a neon interface.

### Optional Micro Accent Colors

Use very small amounts only in the technology stack section.

Suggested usage:

- Yellow for languages
- Green for frontend
- Blue for backend/tools
- Red or orange for data
- Purple for infrastructure

These colors should appear only as small icons or tiny markers.

Do not use large colored blocks, gradients, or badge walls.

---

## Typography

### Primary Font

Use a readable monospace font for most of the interface.

Recommended fonts:

- JetBrains Mono
- IBM Plex Mono
- Geist Mono
- Berkeley Mono
- Fira Code
- Recursive Mono

The current visual direction works best with a clean developer-focused mono font.

The font should feel technical, but not novelty-styled.

### Secondary Font

A sans-serif font may be used sparingly for longer body text, but the preferred direction is mostly monospace.

Optional sans-serif fonts:

- Inter
- Geist Sans
- Manrope

If a sans-serif is used, it should support readability without breaking the terminal/dashboard identity.

### Type Scale

Hero heading:

- Desktop: `48px` to `64px`
- Tablet: `40px` to `52px`
- Mobile: `34px` to `44px`
- Weight: `700`
- Line height: `1.1` to `1.18`
- Letter spacing: slightly tight

Hero body:

- `15px` to `17px`
- Line height: `1.65`
- Muted color

Section labels:

- `12px` to `14px`
- Uppercase
- Letter spacing: `0.04em` to `0.08em`
- Muted color

Body text:

- `14px` to `16px`
- Line height: `1.55` to `1.7`
- Secondary text color

Metadata:

- `12px` to `13px`
- Tertiary text color
- Monospace

Links:

- Same font size as surrounding text
- Accent green
- No heavy button treatment unless necessary

### Text Style Rules

Use direct, technical, calm copy.

Good tone:

- Clear
- Practical
- Specific
- Outcome-oriented
- Confident without hype

Avoid:

- “Rockstar developer”
- “10x engineer”
- “Pixel-perfect magical experiences”
- “Innovative synergy”
- Overly startup-like marketing language
- Generic portfolio slogans

---

## Layout System

The layout should be grid-based and desktop-first.

The page should feel like one unified interface divided into panes.

### Desktop Layout

Use a left sidebar plus a main content dashboard.

Recommended structure:

- Sidebar: approximately `218px` to `242px`, depending on the desktop viewport
- Main content: `1fr`
- Main internal grid: 2 columns
- Gaps: `0px` or very small
- Separators: created mostly through borders
- Overall page border: subtle, visible

The design should have a full-height application feel. The shell runs edge to edge; do not add an unexplained outer gutter to the left of the sidebar.

### Sidebar

The sidebar should be sticky on desktop.

Recommended width:

- Approximately `242px` on wide desktop and `218px` on compact desktop

The sidebar contains:

- Path label
- Name and role
- Short intro
- Navigation
- System status
- External links
- Terminal command area
- Copyright/footer detail

The sidebar should be visually separated from the main content with a vertical border.

On long pages, keep the identity and primary navigation available while the rest of the rail scrolls. Copyright belongs at the end of the sidebar content, not midway down the viewport.

### Main Content

The main area should use a modular grid.

Recommended structure:

1. Top bar
2. Hero section
3. Current focus panel
4. Experience timeline
5. Selected work projects
6. Personal projects
7. AI workflow
8. Technology stack
9. Contact
10. Footer/build note

The hero should occupy the largest visual area.

The current focus panel should sit on the top-right on desktop.

Lower sections should be arranged in two-column grid panels.

### Grid Feel

The layout should feel like fixed panes inside a dashboard.

Use:

- Vertical separators
- Horizontal separators
- Boxed content zones
- Compact cards inside panes
- Consistent panel padding
- Aligned section headers
- Visible structural rhythm

Avoid:

- Floating card layouts with large gaps
- Overly rounded SaaS cards
- Masonry grids
- Random section widths
- Loose marketing-page spacing

### Spacing

Use generous internal padding, but keep the total dashboard compact.

Recommended spacing:

- Page padding: `0px`; the application shell is edge to edge
- Sidebar padding: `24px` to `32px`
- Main panel padding: `28px` to `40px`
- Small item padding: `12px` to `18px`
- Section vertical spacing: mostly created through grid panels and borders
- Gap between compact cards: `8px` to `12px`

The page can show many sections at once on desktop, but it must not feel cramped.

### Border Radius

Use sharp or nearly sharp corners.

Recommended radius:

- Large layout panels: `0px` to `4px`
- Project cards: `2px` to `4px`
- Tags: `3px` to `4px`
- Active nav row: `2px` to `4px`

Avoid pill-heavy design.

Avoid large rounded corners.

---

## Page Structure

### Top Bar

The top bar should feel like a system header.

Include:

- Left side: path or empty grid continuation
- Right side: small online status

Example:

    ~/engineer/portfolio
    ● System Online

Rules:

- Use subtle border-bottom
- Use small text
- Status dot uses accent green
- Keep it minimal

---

## Sidebar Component

The sidebar should look like a system navigation panel.

### Required Elements

Include:

- Small path label at top, for example `~/engineer/portfolio`
- Name: `Ebrar`
- Small green status dot near the name
- Role: `Software Engineer`
- Short personal description
- Navigation list
- System status block
- External links
- Terminal command area
- Footer copyright

### Sidebar Identity

Example structure:

    Ebrar ●
    Software Engineer

    I build practical software
    that solves real problems
    and creates value.

The intro should be short and readable.

### Navigation

Navigation items should look like command/system menu rows.

Suggested items:

- Overview
- Work
- Projects
- Workflow
- Stack
- About
- Contact

Active nav item:

- Dark highlighted row
- Thin green vertical bar on the left
- Green command marker such as `>_`
- Accent green text

Inactive nav items:

- Muted icon
- Off-white label
- Subtle hover background
- Green text on hover only if needed

Example active item:

    >_ Overview

### System Status Block

This should feel like metadata from a running system.

Example:

    SYSTEM STATUS

    Focus          Deep Work
    Availability   Open
    Location       Remote
    Last Updated   July 2026

Rules:

- Keep labels muted
- Use green only for positive values
- Align values in a compact table-like layout

### External Links

Include compact links:

- GitHub
- LinkedIn
- Resume PDF

Use small external-link icons.

Keep the styling minimal.

Avoid large buttons.

### Terminal Command Area

At the bottom of the sidebar, include a small command-style block.

Example:

    $ whoami
    > problem-solver
    > builder
    > shipper

This should add personality without becoming gimmicky.

---

## Hero Section

The hero is text-first and should be the strongest visual element.

### Required Elements

Include:

- Large headline
- Green cursor accent
- Supporting paragraph
- Small callout line with green left border

Example headline:

    I build useful
    software end to end._

The cursor may be static or subtly blinking.

### Hero Rules

The hero should not use:

- Portraits
- Avatars
- Large decorative icons
- Abstract blobs
- Stock illustrations
- Huge CTA buttons

The hero should feel like a clear command output or system statement.

### Supporting Copy

Tone should be practical and calm.

Example:

    Full-stack engineer building web applications, internal tools, QA systems, and developer workflows. Focused on clean systems, clear UX, and shipping value.

### Hero Callout

Use a thin green left border.

Example:

    Currently focused on product engineering, AI-assisted development, and team enablement.

The callout should be short.

Do not turn it into a full paragraph.

---

## Current Focus Panel

The current focus panel should sit near the hero on desktop.

It should feel like a small file or note inside an engineer’s workspace.

### Label

Use a section label:

    CURRENT FOCUS

### File Name

Use file/path naming:

    /focus.txt

### Content

Include:

- 1 short paragraph
- 2 to 4 bullet points
- Updated date

Example:

    /focus.txt

    Shipping a developer platform that simplifies internal tools and workflows.

    ○ Workflow automation
    ○ API design & DX
    ○ AI-assisted coding

    Updated: May 18, 2025

Rules:

- Use compact spacing
- Use thin internal dividers
- Use green bullets sparingly
- Keep the panel smaller than the hero

---

## Experience Timeline

The experience section should use a vertical timeline.

### Required Elements

Each timeline item should include:

- Date range
- Role title
- Company/project name
- Short outcome-focused description

### Visual Rules

Use:

- Thin vertical line
- Small circular nodes
- Green dates
- Primary text for role
- Muted text for company
- Secondary text for description

Example:

    2021 - Present
    Senior Software Engineer
    Acme Inc.

    Building the developer platform used by 500+ engineers. Focused on backend systems, developer experience, and platform reliability.

### Timeline Behavior

Keep descriptions short.

Avoid long resume paragraphs.

Use the timeline to communicate progression and scope quickly.

Include a small link at the bottom:

    → View full history

---

## Selected Work Projects

The project index should use wide, alternating case-study rows. Each row pairs the existing terminal-panel copy with a visual pane so the page has a left/right rhythm instead of becoming another uniform card grid.

### Row Structure

Each card should include:

- Path-style project name
- Optional small tag
- One concise description
- Tech stack metadata line

Example:

    /projects/orderific     Featured

    Restaurant order management platform for online orders, dine-in workflows, kitchen operations, and staff-side management.

    React · Next.js · Node.js · SQL

### Visual Rules

Rows should be:

- Rectangular
- Dark-panel based
- Thin bordered
- Compact
- Slightly brighter on hover
- Mostly sharp-cornered
- Alternating image-left and image-right on desktop
- Copy-first in document order and on mobile
- Visually grounded in real project screenshots, existing product marks, or official technology icons

Avoid:

- Generic stock imagery or fake placeholder panels
- Publishing client screenshots without explicit permission
- Full-bleed marketing imagery that overpowers the project explanation
- Gradient cards
- Badge-heavy layouts
- Marketing-style feature cards

### Recommended Work Projects

Use selected professional projects such as:

- `/projects/orderific`
- `/projects/testingmill`
- `/projects/frontend-generator`
- `/projects/landers-builder`
- `/projects/qa-automation`
- `/projects/erp-modernization`
- `/projects/pos-systems`

Do not overload the first screen.

Show 3 to 5 selected projects, then link to more.

Example link:

    → View more projects

---

## Personal Projects

Personal projects should use the same alternating row system. Real, safe product screenshots are preferred when they exist; a genuine project mark or an official-icon composition is the fallback when they do not.

### Card Structure

Example:

    /devlog
    A minimal developer journal and link tracker.
    Next.js · MDX · Vercel

Use concise descriptions.

### Rules

- Keep this section compact
- Do not make personal projects visually louder than work projects
- Use the same path/file naming language

---

## AI Workflow Section

The AI workflow section should show practical process, not AI hype.

### Required Steps

Recommended flow:

1. Find the source of truth
2. Make the slice explicit
3. Build with leverage
4. Verify the real outcome
5. Leave the system clearer

### Structure

Each step should include:

- Small technical icon
- Step title
- One-line explanation

Example:

    Find the source of truth
    Inspect code, behavior, screenshots, logs, and domain context.

    Make the slice explicit
    Define acceptance criteria, interfaces, risks, and the useful sequence.

    Build with leverage
    Use agents and automation while keeping product and architecture judgment hands-on.

    Verify the real outcome
    Test the behavior and visually compare interface work.

    Leave the system clearer
    Preserve decisions, documentation, and handoff context.

The workflow page should also expose concrete review modes rather than treating "AI" as one vague tool: Grill Me for adversarial requirements discovery, Code Quality Review for implementation scrutiny, Visual QA for browser-based comparison, and Handoff for durable continuation context.

### Tone

Keep it practical.

Avoid phrases like:

- “AI revolution”
- “Supercharged productivity”
- “Magical workflows”
- “Autonomous everything”

The section should show that AI is part of the engineering workflow, not the whole identity.

---

## Technology Stack Section

The stack section should be compact, visible, and easy to scan.

It should not become a badge wall.

### Recommended Groups

Use rows grouped by category:

- Languages
- Frontend
- Backend
- Data
- Systems
- AI

### Example

    Languages
    TypeScript, JavaScript, C#, SQL

    Frontend
    React, Next.js, Expo, CSS

    Backend
    Node.js, .NET, REST APIs

    Data
    SQL Server, PostgreSQL, Convex

    Systems
    Docker, NGINX, Electron, Linux

    AI
    Agents, vLLM, LiteLLM, MCP

### Visual Rules

- Category label above or beside its values, depending on available width
- Values remain visible without hover or disclosure interactions
- Use multiple rows or a responsive grid so long categories can wrap naturally
- Small colored icon per category
- Compact row spacing
- Muted text for tools
- No large badge groups

---

## Contact Section

The contact section should be minimal and command-like.

### Include

- Email
- Remote availability
- Open to opportunities
- Small command-style CTA

Example:

    CONTACT

    Let's build something useful.

    ✉ hello@ebrar.dev
    ⌖ Remote / Worldwide
    ▣ Open to new opportunities

    $ say_hello.sh

### Rules

- Avoid a large contact form unless required
- Avoid big CTA buttons
- Keep it consistent with the terminal/system style

---

## Footer

The footer should be minimal.

Include:

- Copyright with the full name

Example:

    © 2026 Ebrar Dushullovci

The footer should stay quiet and low-contrast. Do not use a framework credit or coffee joke as filler copy.

---

## Component Style Rules

### Panels

Panels should feel like system panes.

Use:

- Thin border
- Slightly lighter background
- Minimal radius
- Compact padding
- Clear heading
- File/path labels where appropriate

Avoid:

- Heavy shadows
- Glassmorphism
- Gradients
- Decorative backgrounds
- Large rounded cards

### Tags

Tags should be tiny and functional.

Examples:

- `Featured`
- `Open`
- `Deep Work`

Rules:

- Small font
- Subtle background
- Green text only when important
- Minimal border radius

### Links

Links should be simple.

Use:

- Green text
- Arrow indicators
- Optional underline on hover

Examples:

    → View full history
    → View more projects
    $ say_hello.sh

Do not use large generic buttons unless the layout specifically needs one.

### Icons

Icons should be small and technical.

Use icons for:

- Navigation
- External links
- Stack categories
- Workflow steps
- Contact rows

Rules:

- Keep icons thin
- Use muted color by default
- Use tiny accent colors only where helpful
- Do not let icons dominate the interface

---

## Interaction Rules

Interactions should be subtle and fast.

Use:

- Slight background change on hover
- Green text on hover for links
- Thin border brightening
- Optional blinking cursor in hero
- Optional terminal command hover state
- Visible focus state for accessibility

Recommended timing:

- Duration: `120ms` to `220ms`
- Easing: `ease-out` or linear
- Movement: minimal or none

Avoid:

- Big animations
- Parallax
- Glitch effects
- Neon hover effects
- Large cursor trails
- Complex page transitions
- Overdone typing animations

The interface should feel responsive, not animated for decoration.

---

## Responsive Behavior

### Desktop

Desktop is the primary experience.

Rules:

- Full sidebar visible
- Main content uses two-column grid
- Current focus panel sits beside hero
- Dense dashboard layout is preserved
- Page feels like a full application shell

### Tablet

Tablet should preserve the dashboard feel where possible.

Rules:

- Sidebar may shrink
- Main grid can remain two-column if space allows
- Hero typography should reduce slightly
- Padding should tighten
- Avoid tiny text

### Mobile

Mobile should become a single-column terminal dashboard.

Rules:

- Sidebar becomes a top identity/header area
- Navigation becomes compact horizontal scroll or collapsible menu
- All content stacks vertically
- Preserve borders and terminal styling
- Keep path/file labels
- Keep text readable
- Do not create a separate phone-app-looking design

Mobile should still feel like the same website, just stacked.

---

## Accessibility Rules

Maintain strong readability despite the dark theme.

Rules:

- Body text must have sufficient contrast
- Green should not be used for long text
- Do not rely only on color for status
- Clickable rows should have enough height
- Focus states must be visible
- Metadata should not become too small on mobile
- Links should be identifiable beyond color when possible
- Avoid low-contrast text inside low-contrast panels

The page can be dense, but it must remain readable.

---

## Content Tone

Copy should be direct, calm, and technical.

Use phrases like:

- “I build practical software that solves real problems.”
- “Focused on clean systems, clear UX, and shipping value.”
- “End-to-end product engineering across frontend, backend, QA, and workflows.”
- “AI-assisted development, automation, and internal tooling.”
- “Building useful software from idea to production.”
- “Practical systems, clear interfaces, and reliable delivery.”

Avoid:

- “Passionate rockstar developer”
- “10x engineer”
- “Pixel-perfect magical experiences”
- “Innovative synergy”
- “Changing the world through code”
- “Crafting delightful digital journeys”
- Overly polished startup marketing language

The writing should sound like an experienced engineer, not a portfolio template.

---

## Recommended Page Content

### Hero

Headline:

    I build useful software end to end._

Supporting text:

    Full-stack engineer building web applications, internal tools, QA systems, and developer workflows. Focused on clean systems, clear UX, and shipping value.

Callout:

    Currently focused on product engineering, AI-assisted development, automation, and team enablement.

### Current Focus

Main copy:

    Shipping developer tools and product systems that simplify real workflows.

Bullets:

- Workflow automation
- API design & DX
- AI-assisted coding
- Internal tooling

### Work Areas

Suggested professional categories:

- Restaurant order management platforms
- API-based testing platforms
- Frontend generation from design files
- Self-hosted AI infrastructure and internal enablement
- ERP modernization
- POS and desktop business systems
- QA automation workflows
- Internal tools and dashboards

### Stack

Suggested stack:

- React
- Next.js
- Node.js
- TypeScript
- C#
- .NET Core
- ASP.NET Core MVC
- SQL Server
- PostgreSQL
- REST APIs
- Docker
- GitHub Actions
- Figma
- Cursor
- ChatGPT
- Visual Studio

---

## Do Not Change

The following are core to the visual identity and should remain consistent:

- Dark terminal-like background
- Left navigation/system sidebar
- Thin grid borders
- Monospace typography
- Green accent color
- Path/file naming style
- Dense engineering dashboard layout
- Minimal decorative elements
- Professional technical tone
- Compact system-status details
- Rectangular terminal panels
- Text-first hero section

These are the foundation of the design.

---

## Good Variations

When generating variants, keep the same foundation and only explore small changes.

Good variation directions:

- Slightly different green accent
- More editorial spacing
- More compact terminal dashboard
- Slightly larger hero typography
- More visible grid lines
- Softer panel background
- Alternative monospace font
- Slightly more operating-system feel
- Slightly more engineering-notebook feel
- Slightly more developer-platform dashboard feel
- Slightly stronger timeline styling
- More compact project cards
- More spacious hero area

Do not generate full redesigns unless specifically requested.

---

## Bad Variations

Avoid changing the design into:

- A colorful SaaS landing page
- A portfolio with big image cards
- A personal brand homepage with portraits
- A neon cyberpunk interface
- A hacker terminal parody
- A glassmorphism dashboard
- A minimal white portfolio
- A generic Tailwind template
- A startup marketing page
- A badge-heavy resume page

The design should remain technical, dark, structured, and personal.

---

## Final Design Summary

This portfolio should look like a personal engineering command center.

It should combine:

- A terminal-inspired sidebar
- A structured dashboard grid
- A strong text-first hero
- Compact technical panels
- Path-based project cards
- A practical AI workflow section
- A compact stack table
- Minimal contact actions

The final feeling should be:

Calm, technical, structured, useful, and confidently engineered.
