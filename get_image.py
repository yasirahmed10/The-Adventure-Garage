import urllib.request
import re
import json
import sys

def get_unsplash_image(query):
    try:
        url = "https://unsplash.com/s/photos/" + query.replace(" ", "-")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Look for images.unsplash.com/photo-
        matches = re.findall(r'images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
        
        if matches:
            # return first unique match
            return "https://" + matches[0] + "?w=500&auto=format&fit=crop"
    except Exception as e:
        print("Error:", e)
    return None

if __name__ == "__main__":
    query = sys.argv[1] if len(sys.argv) > 1 else "shawarma"
    print(get_unsplash_image(query))
