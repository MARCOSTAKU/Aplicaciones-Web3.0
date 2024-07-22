# database.py
import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="dpg-cqf04588fa8c73eg4tjg-a.oregon-postgres.render.com",
        port="5432",
        user="marcos123",
        password="VyQMxUmYkmJbul7POI0Kkb1yEwfzIZpR",
        dbname="clientesweb"
    )
    return conn
