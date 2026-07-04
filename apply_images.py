import re
import json

with open("image_urls.json", "r") as f:
    results = json.load(f)

# Mapping from Menu.jsx names to results keys
name_mapping = {
    "Classic Chicken Shawarma": "Classic Chicken Shawarma wrap",
    "Spicy Chicken Shawarma": "Spicy Chicken Shawarma wrap red",
    "Garlic Chicken Shawarma": "Garlic Chicken Shawarma wrap toum",
    "Barbeque Chicken Shawarma": "Barbeque Chicken Shawarma wrap bbq",
    "Cheese Chicken Shawarma": "Cheese Chicken Shawarma wrap melted",
    "Double Chicken Shawarma": "Double Chicken Shawarma wrap thick",
    "Whole Meat Chicken Shawarma": "Whole Meat Chicken Shawarma",
    "Mughlai Chicken Shawarma": "Mughlai Chicken Shawarma",
    "Bhuna Spicy Chicken Open Platter": "Bhuna Spicy Chicken Open Platter",
    "Mughlai Chicken Open Platter": "Mughlai Chicken Open Platter",
    "Chicken Tortilla Open Platter": "Chicken Tortilla Open Platter",
    "Lebanese Style Open Platter": "Lebanese Style Open Platter",
    "Chicken Rice Bowl": "Chicken Rice Bowl food",
    "Chicken Seekh Kebab Rice Bowl": "Chicken Seekh Kebab Rice Bowl",
    "Chicken Tortilla Wrap": "Chicken Tortilla Wrap",
    "Jaffa Chicken Burrito": "Mexican Chicken Burrito",
    "Italian Chicken Grilled Sandwich": "Italian Chicken Grilled Sandwich",
    "Mexican Chicken Grilled Sandwich": "Mexican Chicken Grilled Sandwich",
    "Chicken Tikka Sandwich": "Chicken Tikka Sandwich",
    "Paneer Shawarma": "Paneer Shawarma wrap",
    "Paneer Tortilla Wrap": "Paneer Tortilla Wrap",
    "Paneer Grilled Sandwich": "Paneer Grilled Sandwich",
    "Paneer Rice Bowl": "Paneer Rice Bowl",
    "Plain & Salted Fries": "Plain Salted Fries",
    "Peri-Peri Fries": "Peri-Peri Fries",
    "Extra Pita Bread": "Pita Bread",
    "Dip (Garlic/Spicy/Cheese)": "Garlic Dip sauce",
    "Söbiyet Triangle Baklava (4pcs)": "Sobiyet Triangle Baklava",
    "Söbiyet Triangle Baklava (8pcs)": "Sobiyet Triangle Baklava",
    "Özel Kare Square Baklava (4pcs)": "Kare Square Baklava",
    "Özel Kare Square Baklava (8pcs)": "Kare Square Baklava",
    "Lahori Zeera": "Zeera soda drink",
    "Lahori Nimboo": "Lemon soda drink",
    "Mint Mojito": "Mint Mojito",
    "Coca-Cola": "Coca-Cola can",
    "Diet Coca-Cola": "Diet Coca-Cola can",
    "Sprite": "Sprite can"
}

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'r', encoding='utf-8') as f:
    menu_content = f.read()

def replace_image(match):
    name = match.group(1)
    if name in name_mapping:
        mapped_key = name_mapping[name]
        url = results.get(mapped_key)
        if url:
            # Replace the image field specifically
            return re.sub(r'image:\s*".*?"', f'image: "{url}"', match.group(0))
    return match.group(0)

new_menu_content = re.sub(r'\{[^\}]+name:\s*"([^"]+)"[^\}]+\}', replace_image, menu_content)

with open(r'c:\Users\ASUS\.gemini\antigravity-ide\scratch\jaffa\frontend\src\pages\Menu.jsx', 'w', encoding='utf-8') as f:
    f.write(new_menu_content)

print("Menu.jsx images updated with distinct URLs!")
