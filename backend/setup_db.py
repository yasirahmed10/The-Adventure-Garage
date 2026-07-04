import psycopg2

def setup():
    try:
        conn = psycopg2.connect('postgresql://khansama:khansama123@localhost:5432/postgres')
        conn.autocommit = True
        cur = conn.cursor()
        
        # Check if role exists
        cur.execute("SELECT 1 FROM pg_roles WHERE rolname = 'jaffa_user'")
        if not cur.fetchone():
            cur.execute("CREATE ROLE jaffa_user WITH LOGIN SUPERUSER PASSWORD 'jaffa_pass'")
            print("Role jaffa_user created.")
        else:
            print("Role jaffa_user already exists.")
            
        # Check if database exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = 'jaffa_db'")
        if not cur.fetchone():
            cur.execute("CREATE DATABASE jaffa_db OWNER jaffa_user")
            print("Database jaffa_db created.")
        else:
            print("Database jaffa_db already exists.")
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    setup()
