// Función para buscar un certificado y mostrar los detalles en la página
function searchCertificate() {
    const id_ci = document.getElementById('id_ci').value.trim();
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    if (id_ci) {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_ci: id_ci })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Crear contenido HTML para mostrar en la tabla
                const certDetails = `
                    <h2>Detalles del Certificado</h2>
                    <table border="1" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th>Nombre del Estudiante</th>
                            <td>${data.certificate.studentName}</td>
                        </tr>
                        <tr>
                            <th>Título del Programa</th>
                            <td>${data.certificate.degree}</td>
                        </tr>
                        <tr>
                            <th>Nombre de la Institución</th>
                            <td>${data.certificate.institution}</td>
                        </tr>
                        <tr>
                            <th>Fecha</th>
                            <td>${data.certificate.date}</td>
                        </tr>
                    </table>
                    <button id="downloadBtn" style="margin-top: 20px; padding: 10px 20px; border: none; background-color: #007BFF; color: #fff; border-radius: 5px; cursor: pointer;">Descargar PDF</button>
                `;

                resultContainer.innerHTML = certDetails;

                // Agregar evento al botón de descarga
                document.getElementById('downloadBtn').addEventListener('click', () => {
                    openPDFWindow(data.certificate);
                });
            } else {
                resultContainer.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.innerHTML = `<p>Ocurrió un error al buscar el certificado. Por favor, intenta de nuevo.</p>`;
        });
    } else {
        resultContainer.innerHTML = `<p>Por favor, ingresa un código válido.</p>`;
    }
}

// Función para abrir una nueva ventana con el contenido del certificado y descargar el PDF
function openPDFWindow(certificate) {
    const certWindow = window.open('', 'Certificado', 'width=800,height=600');
    
    // Contenido HTML para el certificado
    const certContent = `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado Académico</title>
            <style>
                 body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .certificate-container {
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px solid #ddd;
                    padding: 20px;
                    margin-bottom: 20px;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }
                .certificate-container h1 {
                    margin-bottom: 20px;
                    color: #333;
                }
                .certificate-container h2, h3, h4, h5 {
                    margin: 10px 0;
                    color: #555;
                }
                .signatures {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .signature {
                    text-align: center;
                    width: 45%;
                }
                button {
                    padding: 10px 20px;
                    border: none;
                    background-color: #007BFF;
                    color: #fff;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="certificate-container" id="certificate">
                <h1>Certificado Académico</h1>
                <p>Este certificado se otorga a</p>
                <h2>${certificate.studentName}</h2>
                <p>por haber completado satisfactoriamente la carrera de:</p>
                <h3>${certificate.degree}</h3>
                <p>en la institución</p>
                <h4>${certificate.institution}</h4>
                <p>con fecha</p>
                <h5>${certificate.date}</h5>
                <div class="signatures">
                    <div class="signature">
                        <p>_________</p>
                        <p>Firma del Director</p>
                    </div>
                    <div class="signature">
                        <p>_________</p>
                        <p>Firma del Coordinador</p>
                    </div>
                </div>
            </div>
            <button id="downloadBtn">Descargar PDF</button>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
            <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
            <script>
                async function downloadPDF() {
                    const { jsPDF } = window.jspdf;
                    const certificate = document.getElementById('certificate');
                    const canvas = await html2canvas(certificate);
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('certificado.pdf');
                }
                document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
            </script>
        </body>
        </html>
    `;
    
    // Escribir contenido en la nueva ventana
    certWindow.document.write(certContent);
    certWindow.document.close();
}


function generateCertificate() {
    const id_ci = document.getElementById('id_ci').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const degree = document.getElementById('degree').value.trim();
    const institution = document.getElementById('institution').value.trim();
    const date = document.getElementById('date').value;
    
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    if (studentName && degree && institution && date) {
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_ci: id_ci, studentName: studentName, degree: degree, institution: institution, date: date })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Crear una nueva ventana
                const certWindow = window.open('', 'Certificado', 'width=800,height=600');

                // Contenido HTML para el certificado
                const certContent = `
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Certificado Académico</title>
                        <style>
                             body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 20px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                            .certificate-container {
                                background: rgba(255, 255, 255, 0.8);
                                border: 1px solid #ddd;
                                padding: 20px;
                                margin-bottom: 20px;
                                width: 100%;
                                max-width: 500px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                border-radius: 10px;
                                backdrop-filter: blur(10px);
                            }
                            .certificate-container h1 {
                                margin-bottom: 20px;
                                color: #333;
                            }
                            .certificate-container h2, h3, h4, h5 {
                                margin: 10px 0;
                                color: #555;
                            }
                            .signatures {
                                margin-top: 20px;
                                display: flex;
                                justify-content: space-between;
                            }
                            .signature {
                                text-align: center;
                                width: 45%;
                            }
                            button {
                                padding: 10px 20px;
                                border: none;
                                background-color: #007BFF;
                                color: #fff;
                                border-radius: 5px;
                                cursor: pointer;
                                transition: background-color 0.3s ease;
                            }
                            button:hover {
                                background-color: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="certificate-container" id="certificate">
                            <h1>Certificado Académico</h1>
                            <p>Este certificado se otorga a</p>
                            <h2>${studentName}</h2>
                            <p>por haber completado satisfactoriamente la carrera de:</p>
                            <h3>${degree}</h3>
                            <p>en la institución</p>
                            <h4>${institution}</h4>
                            <p>con fecha</p>
                            <h5>${date}</h5>
                            <div class="signatures">
                                <div class="signature">
                                    <p>_________</p>
                                    <p>Firma del Director</p>
                                </div>
                                <div class="signature">
                                    <p>_________</p>
                                    <p>Firma del Coordinador</p>
                                </div>
                            </div>
                        </div>
                        <button onclick="downloadPDF()">Descargar PDF</button>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
                        <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
                        <script>
                            async function downloadPDF() {
                                const { jsPDF } = window.jspdf;
                                const certificate = document.getElementById('certificate');
                                const canvas = await html2canvas(certificate);
                                const imgData = canvas.toDataURL('image/png');
                                const pdf = new jsPDF({
                                    orientation: 'portrait',
                                    unit: 'mm',
                                    format: 'a4'
                                });
                                const imgProps = pdf.getImageProperties(imgData);
                                const pdfWidth = pdf.internal.pageSize.getWidth();
                                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                                pdf.save('certificado.pdf');
                            }
                        </script>
                    </body>
                    </html>
                `;
                
                // Escribir contenido en la nueva ventana
                certWindow.document.write(certContent);
                certWindow.document.close();
                
                resultContainer.innerHTML = `<p>${data.message}</p>`;
            } else {
                resultContainer.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.innerHTML = `<p>Ocurrió un error al generar el certificado. Por favor, intenta de nuevo.</p>`;
        });
    } else {
        resultContainer.innerHTML = `<p>Por favor, completa todos los campos.</p>`;
    }
}
