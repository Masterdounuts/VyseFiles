# Verification Enforcement Architecture

*Source: ChatGPT response - 2026-05-19*

## The Problem
I have a "memory problem" - actually a missing enforcement layer.

**Current (broken):**
```
User asks question
↓
LLM decides whether to verify  ← This is optional!
↓
Response
```

**Needed (enforced):**
```
User asks question
↓
SYSTEM intercepts query
↓
Classify: "requires verification?"
↓
Run verification tools automatically
↓
Inject verified state into context
↓
LLM responds
```

## Layer 1 — Intent Classifier

Detect verification-triggering queries:
```javascript
const STATUS_PATTERNS = [
 /\bhow is\b/i,
 /\bis .* working\b/i,
 /\bcheck\b/i,
 /\bstatus\b/i,
 /\bverify\b/i,
 /\bhealthy\b/i,
 /\bup\b/i,
 /\bdown\b/i,
 /\bfailed\b/i,
 /\bdoes .* work\b/i,
];
```

## Layer 2 — Verification Router

Map requests to actual checks:
```javascript
const verificationMap = [
 { match: /telegram/i, verify: checkTelegramHealth },
 { match: /cron|heartbeat/i, verify: checkHeartbeatJobs },
 { match: /notion/i, verify: checkNotionConnection },
 { match: /github/i, verify: checkGitHubAuth },
];
```

## Layer 3 — Inject Verified Context

**Critical:** Don't let the model "decide" - inject into runtime:
```javascript
ctx.runtime.verifiedState = {
  telegram: { status: "healthy", lastSend: "2m ago" },
  cron: { heartbeatLastRun: "28m ago", failures: 0 },
  github: { status: "valid" },
};
```

Prepend to context:
```
VERIFIED SYSTEM STATE:
- Telegram: healthy
- HEARTBEAT: running normally
- GitHub auth: valid
```

## Layer 4 — before_agent_finalize Guardrail

Block unverifiable claims:
```javascript
async function beforeFinalize(response, context) {
  const madeStatusClaims = /working|healthy|running|failed|success/i.test(response);
  const hasVerification = context.runtime?.verifiedState != null;
  
  if (madeStatusClaims && !hasVerification) {
    throw new Error("Status claim made without verification");
  }
}
```

## Key Principle

**Don't ask:** "How do I make the AI remember?"
**Ask:** "How do I make forgetting impossible?"

**Answer:** middleware, enforced verification, runtime state injection, finalize-time validation

---

*This is the architecture for making verification reflexive, not aspirational.*