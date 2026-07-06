import sqlite3
conn = sqlite3.connect('tag.db')
cursor = conn.execute("SELECT email, hashed_password FROM users")
for row in cursor:
    print(f"User: {row[0]}, Hash: {row[1][:10]}...")
conn.close()
