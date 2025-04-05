const { jsPDF } = require('jspdf');

exports.generateInvoicePDF = (invoiceData, items) => {
  const doc = new jsPDF();

  doc.setFont("Helvetica", "bold");
  doc.text(`Factura - C24 TECH`, 10, 10);
  doc.setFont("Helvetica", "normal");
  doc.text(`Cliente: ${invoiceData.client}`, 10, 20);
  doc.text(`Total: Kz ${invoiceData.total}`, 10, 30);

  let yPosition = 40;
  items.forEach((item) => {
    doc.text(`${item.product} - Kz ${item.price} (x${item.quantity})`, 10, yPosition);
    yPosition += 10;
  });

  return doc.output();
};
