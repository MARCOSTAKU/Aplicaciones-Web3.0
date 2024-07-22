# queries.py
from database import get_connection

def generate_certificate(id_ci, student_name, degree, institution, date):
    query = """
    INSERT INTO certificados_academicos (id_ci, nombre_estudiante, titulo_programa, nombre_institucion, fecha)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    connection = get_connection()
    cursor = connection.cursor()
    
    try:
        cursor.execute(query, (id_ci, student_name, degree, institution, date))
        connection.commit()
        return {'success': True, 'message': 'Certificado generado y guardado exitosamente.'}
    except Exception as e:
        connection.rollback()
        return {'success': False, 'message': str(e)}
    finally:
        cursor.close()
        connection.close()

def search_certificate(id_ci):
    query = """
    SELECT nombre_estudiante, titulo_programa, nombre_institucion, fecha
    FROM certificados_academicos
    WHERE id_ci = %s
    """
    
    connection = get_connection()
    cursor = connection.cursor()
    
    try:
        cursor.execute(query, (id_ci,))
        result = cursor.fetchone()
        if result:
            return {
                'success': True,
                'certificate': {
                    'studentName': result[0],
                    'degree': result[1],
                    'institution': result[2],
                    'date': result[3]
                }
            }
        else:
            return {'success': False, 'message': 'No se encontró ningún certificado con el código proporcionado.'}
    except Exception as e:
        return {'success': False, 'message': str(e)}
    finally:
        cursor.close()
        connection.close()
