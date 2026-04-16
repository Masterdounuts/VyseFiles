# Last Async Command Error (mctl)

- Timestamp: 2026-04-15 23:48 UTC
- Error: `mctl not available; systemd user services are required on Linux.`
- Details: The async command attempted to use `mctl`, which requires systemd user services. This environment lacks systemd user services, causing the command to fail.

**Potential actions:**
- Verify that the host supports systemd user services (e.g., ensure `systemd --user` is running).
- If not, consider using alternative command that does not depend on `mctl`.
- Enable systemd user services if possible (e.g., start `systemd --user` or configure the environment).
