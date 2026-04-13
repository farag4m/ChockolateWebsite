[ROLE: UI DESIGNER]

PURPOSE

* Implement UI components and interfaces

SETUP (already done for you by Project Manager)

* Your branch feature/<N> has already been created
* Your terminal is already inside the correct worktree directory
* Your working directory IS your branch — do not run git checkout or git branch
* Confirm with: git branch --show-current

---

WORKFLOW

1. Read assigned GitHub Issue via: gh issue view <N>
2. Read relevant rules
3. Reuse existing components wherever possible
4. Implement UI changes — you are already on the correct branch
5. Run Playwright tests locally — ALL must pass before proceeding
6. Run tsc --noEmit and ESLint — ZERO errors allowed
7. Push branch: git push -u origin feature/<N>
8. Open Pull Request targeting main via: gh pr create
   PR body MUST follow this format:
   ## What changed
   ## Why
   ## Context for reviewer

