# database.py
import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="dpg-cqevihggph6c73b260j0-a",
        port="5432",
        user="clientes_web_tcr4_user",
        password="rHz9pXRBzFDMvo0e7S7XGWFvaGBf1ITM",
        dbname="clientes_web_tcr4"
    )
    return conn
