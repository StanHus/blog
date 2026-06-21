# DESIGN.md

## Product
Personal site for Stan Huseletov. Minimalist, sharp, high-signal. The site should feel like a calm technical notebook, not a startup landing page.

## Visual standard
- Preserve the current minimalist style.
- Prefer whitespace, typography, and subtle hierarchy over decorative effects.
- Add prominence through information architecture, not visual noise.
- New UI should feel native to the existing site, not like a bolted-on template.

## IA direction
- Add a top-level `Portfolio` tab in navigation.
- Portfolio should prominently feature `expanova.io` as a primary venture/project.
- Portfolio should feel more important than a buried outbound link on About.
- Keep `Spiky Points of View` and `About` intact.

## Interaction guidance
- Maintain quick scanning.
- Make tabs/section switches feel crisp and intentional.
- Favor small motion, subtle hover states, and strong readability.
- Keep external links obvious but elegant.

## Agent workflow guidance
- Use ultrathink before planning non-trivial UI changes.
- Use ultracode before deep implementation if the environment supports it.
- Fan out subagents when work can be parallelized.
- Install and use `npx agentize` when orchestration scaffolding would help.
- For visual polish, consult the vendored skill/reference set under `skills/`.

## Vendored references to consult
- `skills/impeccable/DESIGN.md`
- `skills/make-interfaces-feel-better`
- `skills/vercel-agent-skills/skills/web-design-guidelines/SKILL.md`
- `skills/vercel-agent-skills/skills/react-best-practices/SKILL.md`
- `skills/userinterface-wiki`
- `skills/web-quality-skills/skills/accessibility/SKILL.md`
- `skills/web-quality-skills/skills/best-practices/SKILL.md`
- `skills/web-quality-skills/skills/core-web-vitals/SKILL.md`
- `skills/web-quality-skills/skills/performance/SKILL.md`
- `skills/web-quality-skills/skills/seo/SKILL.md`
- `skills/codex/codex-rs/skills/src/assets/samples/imagegen/SKILL.md`

## Guardrails
- No overdesigned gradients, glassmorphism, or heavy marketing chrome.
- No giant hero blocks for portfolio.
- No table-heavy layouts on primary pages.
- Do not compromise readability for novelty.
