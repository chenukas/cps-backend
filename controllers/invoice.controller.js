const Order = require('../models/order.model');
const pdf = require('pdfkit');
const fs = require('fs');

const VAT_NUMBER = 'VT56-C002';

const generateInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate({
          path: 'requisitionID',
          populate: [
            {
              path: 'siteId',
              model: 'site'
            },
            {
              path: 'siteManagerId',
              model: 'User'
            },
            {
              path: 'supplierName',
              model: 'supplier'
            }, 
            {
              path: 'items.productId',
              model: 'item'
            }
          ]
        });

        const path = `${__dirname}/${order.orderID}-${new Date().getTime()}.pdf`;
        const doc = new pdf({ margin: 50 });
        generateHeader(doc, 'Invoice');

        const items = [];
        for(let item of order.requisitionID.items) {
            if (item.productId) {
                items.push({
                    description: item.productId.itemName,
                    quantity: item.quantity,
                    vat: '0%',
                    unitPrice: item.productId.unitPrice,
                    amount: item.quantity * item.productId.unitPrice,
                })
            }
        }


        const invoiceObject = {
            from: 'Heavy Construction',
            to: order.requisitionID.supplierName && `${order.requisitionID.supplierName.supName}\n${order.requisitionID.supplierName.supLocation}\n${order.requisitionID.supplierName.supEmail}`,
            items,
            statementNumber: 'INV-'+order.orderID,
            vatNumber: VAT_NUMBER
          };

        generateCustomerInformation(doc, invoiceObject);
        generateInvoiceTable(doc, invoiceObject);
        doc.end();
        console.log('document generation done!');
        doc.pipe(fs.createWriteStream(path)).once('finish', () => {
            console.log('document writing done!');
            res.status(200).sendFile(path, err => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                fs.unlinkSync(path);
             });

        }).on('error', err => {
            console.log(err);
            throw err;
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false, error: err.message
        });
    }
}

function generateHeader(doc, invoice_title) {
    doc
        .fontSize(16)
        .text(invoice_title, 0, 60, { align: 'right' });
}

function generateCustomerInformation(doc, invoice) {
    const date = new Date();
  
    doc
      .fontSize(10)
      .text(`From`, 50, 130)
      .text(`To:`, 50, 200)
      .text(`Invoice Date:`, 50, 285)
      .text(`VAT Number:`, 50, 300)
      .text(`Invoice Number: `, 50, 315)
  
      .text(invoice.from, 200, 130)
      .text(invoice.to, 200, 200)
      .text(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, 200, 285)
      .text(`${invoice.vatNumber}`, 200, 300)
      .text(`${invoice.statementNumber}`, 200, 315)
      .moveDown();
  }

  function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 260, y, { width: 90, align: "right" })
      .text(c3, 320, y, { width: 90, align: "right" })
      .text(c4, 400, y, { width: 90, align: "right" })
      .text(c5, 0, y, { align: "right" });
  }

  function generateInvoiceTable(doc, invoice) {
    let i,
    invoiceTableTop = 380;

    generateTableRow(doc, invoiceTableTop, 'Description', 'Quantity', 'Unit Price', 'VAT', 'Amount');

    doc.moveTo(50, 398)  
            .lineTo(563, 398)      
            .lineWidth(0.5)
            .stroke();

    let position;
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
    
      position = invoiceTableTop + (i + 1) * 30;

      generateTableRow(
        doc,
        position + 1,
        item.description,
        item.quantity,
        item.unitPrice,
        item.vat === 0 ? 'NO VAT' : item.vat,
        item.amount
      );

      doc.moveTo(50, position + 20)   
      .lineTo(563, position + 20)       
      .lineWidth(0.5)
      .strokeColor("#efefef")
      .stroke() 
    }

    const sum = invoice.items.reduce((sum, curr) => sum + curr.amount, 0);

    generateTableRow(doc, position + 45, '','','', 'Total', Math.round(sum * 100)/100);

    doc.moveTo(465, position + 58)   
      .lineTo(563, position + 58)       
      .lineWidth(0.5)
      .strokeColor("black")
      .stroke() 

      doc.moveTo(465, position + 59.5)   
      .lineTo(563, position + 59.5)       
      .lineWidth(0.5)
      .strokeColor("black")
      .stroke() 
  }


  function generateFooter(doc) {
    doc
      .fontSize(8)
      .text(
        `Carehires | Company Registration No: 09319071. Registered Office: The Dock 75, Explore Drive, Leicester, United Kingdom. (LE45NU). \n\nWhere services provided on this invoice are treated as exempt from VAT this is because they are medical services exempt by way of
        the nursing agencies VAT concession (VAT Notice 701/57).`,
        50,
        700,
        { align: "center", width: 500 }
      );
  }

module.exports = {
    generateInvoice
}