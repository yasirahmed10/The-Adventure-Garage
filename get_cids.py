import urllib.request
import urllib.parse
import re

queries = [
    "Jaffa Shawarma Kohefiza Bhopal",
    "Jaffa Shawarma Arera Colony Bhopal",
    "Jaffa Shawarma Hamidia Road Bhopal",
    "Jaffa Shawarma TT Nagar Bhopal",
    "Jaffa Shawarma Trilanga Bhopal",
    "Jaffa Shawarma Bairagarh Bhopal"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for q in queries:
    url = f"https://www.google.com/maps/search/{urllib.parse.quote_plus(q)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Look for the CID in the HTML. Usually found in window.APP_INITIALIZATION_STATE
        match = re.search(r'0x[0-9a-f]+:0x([0-9a-f]+)', html)
        if match:
            cid_hex = match.group(1)
            cid = int(cid_hex, 16)
            print(f"{q} -> CID: {cid}")
        else:
            print(f"{q} -> CID not found")
    except Exception as e:
        print(f"{q} -> Error: {e}")
