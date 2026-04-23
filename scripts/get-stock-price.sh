#!/bin/bash
# Stock price scraper using Finviz (no API limits!)
# Usage: ./get-stock-price.sh SYMBOL

SYMBOL="${1^^}"  # uppercase

if [ -z "$SYMBOL" ]; then
    echo "Usage: $0 <SYMBOL>"
    exit 1
fi

# Fetch from Finviz
URL="https://www.finviz.com/quote.ashx?t=$SYMBOL"
RESPONSE=$(curl -s -A "Mozilla/5.0" "$URL")

if echo "$RESPONSE" | grep -q "Not found"; then
    echo "ERROR: Symbol $SYMBOL not found"
    exit 1
fi

# Extract price - Finviz has "Price" in a table
PRICE=$(echo "$RESPONSE" | grep -oP '(?<=<td class="fwb" style="width:65px;">)[0-9]+\.[0-9]+(?=</td>)' | head -1)

# If that didn't work, try alternative pattern
if [ -z "$PRICE" ]; then
    PRICE=$(echo "$RESPONSE" | grep -oP 'Price\s*</td>\s*<td[^>]*>\s*\$?([0-9]+\.[0-9]+)' | grep -oP '[0-9]+\.[0-9]+')
fi

# Try another pattern - look for the price in the snapshot
if [ -z "$PRICE" ]; then
    PRICE=$(echo "$RESPONSE" | grep -oP '>\s*\$?\s*([0-9]{1,2}\.[0-9]{2})\s*<' | head -1 | tr -d '>$<' | tr -d ' ')
fi

# Last resort - grep for price patterns near "Price" text
if [ -z "$PRICE" ]; then
    PRICE=$(echo "$RESPONSE" | sed -n '/Price/,/<\/tr>/p' | grep -oP '[0-9]+\.[0-9]{2}' | head -1)
fi

# Get change %
CHANGE=$(echo "$RESPONSE" | grep -oP '(?<=<td class="fwb" style="width:65px;">)[0-9.+]+%(?=</td>)' | head -1)
if [ -z "$CHANGE" ]; then
    CHANGE=$(echo "$RESPONSE" | sed -n '/Change/,/<\/tr>/p' | grep -oP '[0-9.+]+%' | head -1)
fi

# Get volume
VOLUME=$(echo "$RESPONSE" | grep -oP '(?<=<td class="fwb" style="width:85px;">)[0-9,]+(?=</td>)' | head -1)
if [ -z "$VOLUME" ]; then
    VOLUME=$(echo "$RESPONSE" | sed -n '/Volume/,/<\/tr>/p' | grep -oP '[0-9,]+' | head -1)
fi

# Get 52W High/Low
HIGH52=$(echo "$RESPONSE" | grep -oP '52W High[^0-9]*([0-9]+\.[0-9]+)' | grep -oP '[0-9]+\.[0-9]+')
LOW52=$(echo "$RESPONSE" | grep -oP '52W Low[^0-9]*([0-9]+\.[0-9]+)' | grep -oP '[0-9]+\.[0-9]+')

# Get target price
TARGET=$(echo "$RESPONSE" | grep -oP 'Target Price[^0-9]*([0-9]+\.[0-9]+)' | grep -oP '[0-9]+\.[0-9]+')

# Parse price properly - remove any $ or spaces
PRICE=$(echo "$PRICE" | tr -d '$' | tr -d ' ')

echo "{\"symbol\":\"$SYMBOL\",\"price\":\"$PRICE\",\"change\":\"$CHANGE\",\"volume\":\"$VOLUME\",\"high52\":\"$HIGH52\",\"low52\":\"$LOW52\",\"target\":\"$TARGET\"}"