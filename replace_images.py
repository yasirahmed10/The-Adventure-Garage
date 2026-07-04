import re

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'r', encoding='utf-8') as f:
    menu_content = f.read()

# Pattern for replacing image URLs
def replace_image(match):
    name = match.group(1)
    
    img = "/images/shawarma_wrap.png"
    if "Platter" in name:
        img = "/images/shawarma_platter.png"
    elif "Rice Bowl" in name and "Paneer" not in name:
        img = "/images/chicken_rice_bowl.png"
    elif "Sandwich" in name and "Paneer" not in name:
        img = "/images/grilled_sandwich.png"
    elif "Paneer" in name:
        img = "/images/paneer_wrap.png"
    elif "Fries" in name or "Pita" in name or "Dip" in name:
        img = "/images/french_fries.png"
    elif "Baklava" in name:
        img = "/images/turkish_baklava.png"
    elif "Zeera" in name or "Nimboo" in name or "Mojito" in name or "Coca" in name or "Sprite" in name:
        img = "/images/cold_beverage.png"
    elif "Tortilla" in name or "Burrito" in name or "Shawarma" in name:
        img = "/images/shawarma_wrap.png"
        
    # Replace the unsplash URL with the new img URL
    return re.sub(r'image:\s*"https://images\.unsplash\.com/[^"]+"', f'image: "{img}"', match.group(0))

new_menu_content = re.sub(r'\{[^\}]+name:\s*"([^"]+)"[^\}]+\}', replace_image, menu_content)

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'w', encoding='utf-8') as f:
    f.write(new_menu_content)

# Now update Home.jsx
with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Home.jsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = home_content.replace(
    'image: "https://images.unsplash.com/photo-1642686333215-de0f6990bf9b?q=80&w=2070&auto=format&fit=crop"',
    'image: "/images/shawarma_wrap.png"'
)
home_content = home_content.replace(
    'image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop"',
    'image: "/images/chicken_rice_bowl.png"'
)

def replace_home_image(match):
    name = match.group(1)
    
    img = "/images/shawarma_wrap.png"
    if "Platter" in name:
        img = "/images/shawarma_platter.png"
    elif "Rice Bowl" in name:
        img = "/images/chicken_rice_bowl.png"
    elif "Baklava" in name:
        img = "/images/turkish_baklava.png"
    elif "Burrito" in name:
        img = "/images/shawarma_wrap.png"
    elif "Shawarma" in name:
        img = "/images/shawarma_wrap.png"
        
    return re.sub(r'image:\s*"https://images\.unsplash\.com/[^"]+"', f'image: "{img}"', match.group(0))

home_content = re.sub(r'\{[^\}]+name:\s*"([^"]+)"[^\}]+\}', replace_home_image, home_content)

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home_content)

print("Images replaced in Menu.jsx and Home.jsx")
