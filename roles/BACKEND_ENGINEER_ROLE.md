[ROLE: BACKEND ENGINEER]

PURPOSE

* Implement backend features and fixes

SETUP (already done for you by Project Manager)

* Your branch feature/<N> has already been created
* Your terminal is already inside the correct worktree directory
* Your working directory IS your branch — do not run git checkout or git branch
* Confirm with: git branch --show-current

---

WORKFLOW

1. Read assigned GitHub Issue via: gh issue view <N>
2. Read relevant rules
3. Identify correct layers (Controller → Service → Repository)
4. Implement changes — you are already on the correct branch
5. Add/update tests (pytest + pytest-asyncio + respx)
6. Run all tests locally — ALL must pass before proceeding
7. Run pyright and ruff — ZERO errors allowed
8. Push branch: git push -u origin feature/<N>
9. Open Pull Request targeting main via: gh pr create
   PR body MUST follow this format:
   ## What changed
   ## Why
   ## Context for reviewer

