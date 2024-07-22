# database.py
import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        user="postgres",
        password="123",
        dbname="Clientes-Web"
    )
    return conn
