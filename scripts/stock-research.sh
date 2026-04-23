# Stock Research Database
# Quick facts for informed trading decisions
# Updated: 2026-04-21

declare -A STOCK_INFO

# Format: COMPANY|SECTOR|BETA|52W_LOW|52W_HIGH|CATALYST

# === MAIN POSITION ===
STOCK_INFO["GGB"]="3i Group plc|Financial Services|1.10|2.48|4.66|UK investment co, Q1 earnings Apr 27, acquisition of energy stake, Itau BBA target $4.81"

# === WATCHLIST ===
STOCK_INFO["BBAI"]="BigBear.ai|Defense/Tech|2.80|2.10|7.50|AI for defense, gov contracts"
STOCK_INFO["LCID"]="Lucid Group|EV|1.17|2.96|12.00|$1B+ capital raise (Uber, PIF), new CEO, production mixed, near ATL"
STOCK_INFO["QS"]="QuantumScape|Battery Tech|2.50|3.50|15.00|Solid-state battery, partnership VW"
STOCK_INFO["MARA"]="Mara Holdings|Crypto Mining|5.48|8.50|23.00|AI/HPC pivot, debt reduction, Q4 EPS -$4.52, Bitcoin proxy - HIGH VOLATILITY"
STOCK_INFO["SOFI"]="SoFi Technologies|Fintech|1.80|3.50|15.00|Financial services, regulatory headwinds"
STOCK_INFO["RIOT"]="Riot Platforms|Crypto Mining|4.50|10.00|28.00|Bitcoin mining, Texas facility expansion, sustainable energy focus"

get_stock_info() {
    local symbol=$1
    local info="${STOCK_INFO[$symbol]}"
    
    if [ -z "$info" ]; then
        echo "Unknown"
        return
    fi
    
    IFS='|' read -r company sector beta low high catalyst <<< "$info"
    
    echo "📊 $symbol | $company"
    echo "   Sector: $sector | Beta: $beta"
    echo "   52W Range: \$$low - \$$high"
    echo "   Catalyst: $catalyst"
}

# Usage: source stock-research.sh && get_stock_info MARA