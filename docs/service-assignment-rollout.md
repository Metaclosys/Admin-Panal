## Service Assignment Rollout Checklist

This guide walks through flipping the internal dashboard to the new per-location service assignment workflow without disrupting the existing flows.

### 1. Seed assignment data
- Navigate to `mongoapi/`.
- Ensure `MONGODB_URI` is set for the target environment.
- Run `npm run backfill:service-assignments`.
- Verify the script reports zero failures (created/skipped counts are logged). Re-run if new services were added before the flip.

### 2. Enable the feature flag in the target environment
- In the frontend (`gentsbookingsoftware`), set `NEXT_PUBLIC_USE_SERVICE_ASSIGNMENTS=true`.
  - Local/dev: update `.env.local` and restart `next dev`.
  - Hosted envs: update the environment variable/secrets in your deployment platform and redeploy.

### 3. QA validation
- In QA/staging (with the flag on) test:
  - Listing: counts match previous `/services` data; check browser console for `Service assignment fetch` logs.
  - Add Service: ensure it creates a service assignment and reflects instantly.
  - Edit Service: updates only the assignment; base service remains unchanged.
  - Delete Service: removes the assignment without deleting the global template.
- Monitor backend logs for `/service-assignments` calls and confirm there are no 4xx/5xx spikes.

### 4. Gradual rollout
- After QA sign-off, enable the flag in staging, observe for a cycle, then enable in production.
- Keep the legacy `/services` paths available (flag off) so you can revert by toggling the variable back if needed.

### 5. Cleanup (post-rollout)
- Once all environments run with assignments for at least one release cycle:
  - Remove the `NEXT_PUBLIC_USE_SERVICE_ASSIGNMENTS` flag and legacy branches in the UI.
  - Update documentation to point teams toward the assignment workflow only.
  - Plan post-rollout enhancements (approvals, bulk assignment tools, notifications).
