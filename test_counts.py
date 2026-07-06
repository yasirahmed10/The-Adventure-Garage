import sqlite3

def check_counts():
    conn = sqlite3.connect('tag.db')
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cur.fetchall()
    print("Table Counts:")
    for t in tables:
        tname = t[0]
        cur.execute(f"SELECT COUNT(*) FROM {tname};")
        count = cur.fetchone()[0]
        print(f" - {tname}: {count}")
    conn.close()

if __name__ == '__main__':
    check_counts()
