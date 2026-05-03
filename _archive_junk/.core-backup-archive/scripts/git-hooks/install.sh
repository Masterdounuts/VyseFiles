#!/bin/bash
# Install git hooks - run once to set up
HOOKS_DIR="$(dirname "$0")/../.git/hooks"
mkdir -p "$HOOKS_DIR"

# Link hooks
ln -sf ../../scripts/git-hooks/pre-commit "$HOOKS_DIR/pre-commit"
ln -sf ../../scripts/git-hooks/post-commit "$HOOKS_DIR/post-commit"

echo "✅ Git hooks installed"