#!/usr/bin/env bash
# Wait for user approval via a message reply.
# Usage: await_approval.sh "<description>"
# Blocks until a reply "approve" or "deny" is received on the control UI.

description=$1
printf "APPROVAL REQUIRED: $description\n"
# Simple polling loop – in real deployment this would hook into OpenClaw messaging API.
while true; do
  # Placeholder: check for user reply (this is a stub).
  # In practice, the OpenClaw runtime will replace this with proper waiting.
  sleep 5
  # break for demo
  break
done
exit 0
