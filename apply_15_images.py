import re

# Mapping from Menu.jsx names to results keys
name_mapping = {
    "Classic Chicken Shawarma": "/images/shawarma_wrap.png",
    "Spicy Chicken Shawarma": "/images/spicy_shawarma.png",
    "Garlic Chicken Shawarma": "/images/garlic_shawarma.png",
    "Barbeque Chicken Shawarma": "/images/bbq_shawarma.png",
    "Cheese Chicken Shawarma": "/images/cheese_shawarma.png",
    "Double Chicken Shawarma": "/images/double_shawarma.png",
    "Whole Meat Chicken Shawarma": "/images/shawarma_wrap.png",
    "Mughlai Chicken Shawarma": "/images/mughlai_shawarma.png",
    
    "Bhuna Spicy Chicken Open Platter": "/images/bhuna_platter.png",
    "Mughlai Chicken Open Platter": "/images/shawarma_platter.png",
    "Chicken Tortilla Open Platter": "/images/shawarma_platter.png",
    "Lebanese Style Open Platter": "/images/shawarma_platter.png",
    
    "Chicken Rice Bowl": "/images/chicken_rice_bowl.png",
    "Chicken Seekh Kebab Rice Bowl": "/images/chicken_rice_bowl.png",
    
    "Chicken Tortilla Wrap": "/images/shawarma_wrap.png",
    "Jaffa Chicken Burrito": "/images/spicy_shawarma.png",
    
    "Italian Chicken Grilled Sandwich": "/images/grilled_sandwich.png",
    "Mexican Chicken Grilled Sandwich": "/images/grilled_sandwich.png",
    "Chicken Tikka Sandwich": "/images/grilled_sandwich.png",
    
    "Paneer Shawarma": "/images/paneer_wrap.png",
    "Paneer Tortilla Wrap": "/images/paneer_wrap.png",
    "Paneer Grilled Sandwich": "/images/paneer_wrap.png",
    "Paneer Rice Bowl": "/images/paneer_wrap.png",
    
    "Plain & Salted Fries": "/images/french_fries.png",
    "Peri-Peri Fries": "/images/french_fries.png",
    "Extra Pita Bread": "/images/french_fries.png",
    "Dip (Garlic/Spicy/Cheese)": "/images/french_fries.png",
    
    "Söbiyet Triangle Baklava (4pcs)": "/images/turkish_baklava.png",
    "Söbiyet Triangle Baklava (8pcs)": "/images/turkish_baklava.png",
    "Özel Kare Square Baklava (4pcs)": "/images/turkish_baklava.png",
    "Özel Kare Square Baklava (8pcs)": "/images/turkish_baklava.png",
    
    "Lahori Zeera": "/images/cold_beverage.png",
    "Lahori Nimboo": "/images/cold_beverage.png",
    "Mint Mojito": "/images/cold_beverage.png",
    "Coca-Cola": "/images/cold_beverage.png",
    "Diet Coca-Cola": "/images/cold_beverage.png",
    "Sprite": "/images/cold_beverage.png"
}

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'r', encoding='utf-8') as f:
    menu_content = f.read()

def replace_image(match):
    name = match.group(1)
    if name in name_mapping:
        url = name_mapping[name]
        return re.sub(r'image:\s*".*?"', f'image: "{url}"', match.group(0))
    return match.group(0)

new_menu_content = re.sub(r'\{[^\}]+name:\s*"([^"]+)"[^\}]+\}', replace_image, menu_content)

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'w', encoding='utf-8') as f:
    f.write(new_menu_content)

# Update Home.jsx popular items
with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Home.jsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

new_home_content = re.sub(r'\{[^\}]+name:\s*"([^"]+)"[^\}]+\}', replace_image, home_content)

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Home.jsx', 'w', encoding='utf-8') as f:
    f.write(new_home_content)

print("Menu.jsx and Home.jsx images updated with distinct URLs!")
