#!/usr/bin/env python3
"""
Regenerate index.html with SEO-optimized content.
Embeds all generator metadata (names, descriptions, keywords) in the HTML
while maintaining the SPA functionality for dynamic updates.

Run this script after adding or modifying generator configs.
"""

import json
import os
from pathlib import Path

def load_all_configs(generators_dir="./generators"):
    """Load all JSON config files"""
    configs = {}
    planner_order = [
        "budget", "chores", "cleaning", "homemaintenance", "meals",
        "daily", "goals", "monthly", "project", "timeblock", "todo",
        "weekly", "weeklyreview", "reading", "study",
        "fitness", "gratitude", "habits", "mood", "sleep", "water"
    ]
    
    for planner_key in planner_order:
        config_path = os.path.join(generators_dir, f"{planner_key}.json")
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                configs[planner_key] = json.load(f)
    
    return configs, planner_order

def build_seo_keywords_section(configs):
    """Build hidden SEO keyword section with all planner names and descriptions"""
    keywords_html = '    <!-- SEO Keywords (Hidden) -->\n'
    keywords_html += '    <div style="display: none;" class="seo-keywords">\n'
    
    for key, config in configs.items():
        keywords_html += f'      <section data-planner="{key}">\n'
        keywords_html += f'        <h2>{config.get("name", "")}</h2>\n'
        keywords_html += f'        <p>{config.get("tagline", "")}</p>\n'
        keywords_html += f'        <p>{config.get("description", "")}</p>\n'
        keywords_html += f'        <p>{config.get("title", "")}</p>\n'
        if config.get("intro"):
            keywords_html += f'        <p>{config.get("intro")[:500]}</p>\n'  # First 500 chars
        keywords_html += '      </section>\n'
    
    keywords_html += '    </div>\n'
    return keywords_html

def build_schema_markup(configs):
    """Build JSON-LD schema.org markup for all generators"""
    schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MicroPlan Studio",
        "url": "https://microplanstudio.com",
        "description": "Free printable planner generators for productivity, home, learning, and wellness.",
        "offers": []
    }
    
    for key, config in configs.items():
        offer = {
            "@type": "Offer",
            "name": config.get("name", ""),
            "description": config.get("description", ""),
            "category": config.get("category", "").title(),
            "priceCurrency": "USD",
            "price": "0",
            "availability": "https://schema.org/InStock"
        }
        schema["offers"].append(offer)
    
    return json.dumps(schema, indent=2)

def regenerate_index_html(output_file="./index.html"):
    """
    Regenerate index.html with SEO optimizations.
    Preserves all dynamic JavaScript functionality.
    """
    
    configs, planner_order = load_all_configs()
    
    if not configs:
        print("ERROR: No generator configs found!")
        return False
    
    # Read current index.html template (remove old SEO section if exists)
    with open(output_file, 'r') as f:
        content = f.read()
    
    # Remove old SEO keywords section if it exists
    seo_start = content.find('    <!-- SEO Keywords (Hidden) -->')
    if seo_start != -1:
        seo_end = content.find('    </div>', seo_start)
        if seo_end != -1:
            seo_end = content.find('\n', seo_end) + 1
            content = content[:seo_start] + content[seo_end:]
    
    # Build new SEO sections
    seo_keywords = build_seo_keywords_section(configs)
    schema_markup = build_schema_markup(configs)
    
    # Find insertion point (after existing schema, before closing </head>)
    closing_head = content.find('  </head>')
    if closing_head == -1:
        print("ERROR: Could not find </head> tag!")
        return False
    
    # Remove old schema if exists
    old_schema_start = content.find('    <!-- Generated Schema Markup -->')
    if old_schema_start != -1:
        old_schema_end = content.find('    </script>', old_schema_start) + len('    </script>')
        old_schema_end = content.find('\n', old_schema_end) + 1
        content = content[:old_schema_start] + content[old_schema_end:]
        closing_head = content.find('  </head>')
    
    schema_html = f'''    <!-- Generated Schema Markup -->
    <script type="application/ld+json">
{schema_markup}
    </script>

'''
    
    # Insert SEO section before </head>
    new_content = content[:closing_head] + schema_html + content[closing_head:]
    
    # Insert SEO keywords section after <main>
    main_start = new_content.find('    <main>')
    if main_start == -1:
        print("ERROR: Could not find <main> tag!")
        return False
    
    main_start = new_content.find('\n', main_start) + 1
    new_content = new_content[:main_start] + seo_keywords + new_content[main_start:]
    
    # Write updated index.html
    with open(output_file, 'w') as f:
        f.write(new_content)
    
    print(f"✅ Regenerated {output_file}")
    print(f"   - Added SEO keyword section with {len(configs)} generators")
    print(f"   - Added JSON-LD schema.org markup")
    print(f"   - Preserved all dynamic SPA functionality")
    
    return True

if __name__ == "__main__":
    regenerate_index_html()
