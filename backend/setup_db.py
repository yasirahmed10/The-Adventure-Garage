import psycopg2

def setup():
    try:
        conn = psycopg2.connect('postgresql://khansama:khansama123@localhost:5432/postgres')
        conn.autocommit = True
        cur = conn.cursor()
        
        # Check if role exists
        cur.execute("SELECT 1 FROM pg_roles WHERE rolname = 'tag_user'")
        if not cur.fetchone():
            cur.execute("CREATE ROLE tag_user WITH LOGIN SUPERUSER PASSWORD 'tag_pass'")
            print("Role tag_user created.")
        else:
            print("Role tag_user already exists.")
            
        # Check if database exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = 'tag_db'")
        if not cur.fetchone():
            cur.execute("CREATE DATABASE tag_db OWNER tag_user")
            print("Database tag_db created.")
        else:
            print("Database tag_db already exists.")
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    setup()
