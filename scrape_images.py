import urllib.request
import urllib.parse
import re
import json
import time

def search_ddg_image(query):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
    
    url_q = urllib.parse.quote_plus(query)
    
    try:
        req1 = urllib.request.Request(f"https://duckduckgo.com/?q={url_q}&t=h_&iar=images&iax=images&ia=images", headers=headers)
        res1 = urllib.request.urlopen(req1).read().decode('utf-8')
        
        match = re.search(r'vqd=([0-9-]+)', res1)
        if not match:
            return None
            
        vqd = match.group(1)
        
        params = urllib.parse.urlencode({
            'l': 'us-en',
            'o': 'json',
            'q': query,
            'vqd': vqd,
            'f': ',,,',
            'p': '1',
            'v7exp': 'a'
        })
        
        req2 = urllib.request.Request(f"https://duckduckgo.com/i.js?{params}", headers=headers)
        res2 = urllib.request.urlopen(req2).read().decode('utf-8')
        
        data = json.loads(res2)
        if 'results' in data and len(data['results']) > 0:
            return data['results'][0]['image']
    except Exception as e:
        print("Error:", e)
    return None

queries = [
    "Classic Chicken Shawarma wrap",
    "Spicy Chicken Shawarma wrap red",
    "Garlic Chicken Shawarma wrap toum",
    "Barbeque Chicken Shawarma wrap bbq",
    "Cheese Chicken Shawarma wrap melted",
    "Double Chicken Shawarma wrap thick",
    "Whole Meat Chicken Shawarma",
    "Mughlai Chicken Shawarma",
    "Bhuna Spicy Chicken Open Platter",
    "Mughlai Chicken Open Platter",
    "Chicken Tortilla Open Platter",
    "Lebanese Style Open Platter",
    "Chicken Rice Bowl food",
    "Chicken Seekh Kebab Rice Bowl",
    "Chicken Tortilla Wrap",
    "Mexican Chicken Burrito",
    "Italian Chicken Grilled Sandwich",
    "Mexican Chicken Grilled Sandwich",
    "Chicken Tikka Sandwich",
    "Paneer Shawarma wrap",
    "Paneer Tortilla Wrap",
    "Paneer Grilled Sandwich",
    "Paneer Rice Bowl",
    "Plain Salted Fries",
    "Peri-Peri Fries",
    "Pita Bread",
    "Garlic Dip sauce",
    "Sobiyet Triangle Baklava",
    "Kare Square Baklava",
    "Zeera soda drink",
    "Lemon soda drink",
    "Mint Mojito",
    "Coca-Cola can",
    "Diet Coca-Cola can",
    "Sprite can"
]

results = {}
for q in queries:
    url = search_ddg_image(q)
    results[q] = url
    print(f"'{q}': '{url}'")
    time.sleep(1)

with open("image_urls.json", "w") as f:
    json.dump(results, f, indent=4)
