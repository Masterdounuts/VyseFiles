#!/usr/bin/env python3
"""Memory-to-Notion Sync Script"""
import sqlite3
import subprocess
import os
from datetime import datetime, timedelta, timezone

DB_PATH = '/home/openclaw/.openclaw/lcm-db/messages.db'
WORKSPACE = '/home/openclaw/.openclaw/workspace-vyse'

def createNotionPage(title, content):
    """Call Node CLI to create Notion page"""
    result = subprocess.run(
        ['node', f'{WORKSPACE}/composio-notion.cjs', 'create', title, content],
        env={**os.environ, 'NODE_PATH': f'{os.environ.get("HOME")}/.local/lib/node_modules'},
        capture_output=True, text=True, cwd=WORKSPACE
    )
    
    if result.returncode != 0:
        raise Exception(result.stderr)
    
    # Extract URL from output
    for line in result.stdout.split('\n'):
        if 'Created:' in line:
            return line.split('Created:')[1].strip()
    
    return result.stdout

def formatDate(iso):
    dt = datetime.fromisoformat(iso.replace('Z', '+00:00'))
    pt = dt.astimezone(timezone(timedelta(hours=-7)))
    return pt.strftime('%b %d %I:%M %p PT')

def syncToNotion(daysAgo=7):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cutoff = datetime.now() - timedelta(days=daysAgo)
    cutoffStr = cutoff.isoformat()
    
    print(f"Syncing memory from last {daysAgo} days...")
    
    # Get conversations
    cursor.execute(
        "SELECT id, started_at, last_message_at, message_count FROM conversations WHERE last_message_at > ? ORDER BY last_message_at DESC",
        (cutoffStr,)
    )
    conversations = cursor.fetchall()
    print(f"Found {len(conversations)} conversations")
    
    content = f"# Vyse Memory Sync\n\n"
    content += f"*Synced: {datetime.now().isoformat()}*\n\n"
    content += "---\n\n"
    
    for conv in conversations:
        convId, started, lastMsg, msgCount = conv
        
        cursor.execute(
            "SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY seq",
            (convId,)
        )
        messages = cursor.fetchall()
        
        if not messages:
            continue
        
        # Skip heartbeat-only conversations
        userMsgs = [m for m in messages if m[0] == 'user']
        hasRealWork = any('heartbeat' not in m[1] for m in userMsgs)
        if not hasRealWork and userMsgs:
            continue
        
        content += f"## Session: {convId[:8]}...\n"
        content += f"**Started:** {formatDate(started)}\n"
        content += f"**Messages:** {msgCount}\n\n"
        
        for role, text, created in messages[-20:]:
            if 'heartbeat' in text or 'Rehydrate' in text:
                continue
            
            roleLabel = "👤 User" if role == 'user' else "🤖 Vyse"
            preview = text[:200].replace('\n', ' ')
            ellipsis = '...' if len(text) > 200 else ''
            content += f"### {roleLabel} ({formatDate(created)})\n{preview}{ellipsis}\n\n"
        
        content += "---\n\n"
    
    conn.close()
    
    # Create Notion page
    print("Creating Notion page...")
    title = f"Memory Sync - {datetime.now().strftime('%b %d')}"
    
    url = createNotionPage(title, content)
    print(f"✅ Created: {url}")
    return url

if __name__ == '__main__':
    import sys
    days = int(sys.argv[1]) if len(sys.argv) > 1 else 7
    syncToNotion(days)