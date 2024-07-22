# database.py
import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="dpg-cqevpu9u0jms739kl9g0-a",
        port="5432",
        user="clientes_web2_user",
        password="vkN0UkzT0rMEgQT4H5nzKWsyJczqbEMc",
        dbname="clientes_web2"
    )
    return conn
