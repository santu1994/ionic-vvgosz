import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as moment from 'moment-timezone';
import autoTable from 'jspdf-autotable';
import { OrderSchema } from 'src/app/common/model/order.model';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ToastController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private file: File,
    private notification: NotificationService,
    public toastController: ToastController,
    private fileOpener: FileOpener
  ) { }

  async generateInvoice(order: OrderSchema, adminInfo: AdminCurrencySchema) {
    try {
      const toast = await this.toastController.create({
        message: 'Please wait.....',
        position: 'bottom',
        animated: true,
        keyboardClose: true,
        color: 'success',
        buttons: [
          {
            side: 'start',
            icon: 'cafe-outline',
          },
        ],
      });
      toast.present();
      const doc = new jsPDF({ filters: ['ASCIIHexEncode'] });
      doc.addFont('assets/fonts/roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
      doc.addFont('assets/fonts/roboto/Roboto-Bold.ttf', 'Roboto', 'bold');
      doc.addFont('assets/fonts/roboto/Roboto-Thin.ttf', 'Roboto', 'thin');
      doc.addFont('assets/fonts/roboto/Roboto-Italic.ttf', 'Roboto', 'italic');
      doc.setFont('Roboto'); // set font
      const image = new Image();

      // Full Color
      // Header Section
      doc.setDrawColor(0).setFillColor(223, 223, 223).rect(0, 0, 220, 300, 'F');

      // Header Section
      doc.setDrawColor(0).setFillColor(0, 150, 136).rect(0, 0, 220, 33, 'F');
      // Header logo
      image.src = 'assets/images/logo-white.png';
      doc.addImage(image, 'png', 10, 10, 45, 12);

      const xAxis = 10;
      let yAxis = 40;

      // Customer Name
      doc
        .setFontSize(12)
        .setTextColor(93, 93, 93)
        .text('Invoice to: ', xAxis, yAxis);

      yAxis += 6;

      doc
        .setFontSize(13)
        .setFont('Roboto', 'bold')
        .setTextColor(0, 150, 136)
        .text(order.address_info.name, xAxis, yAxis, { maxWidth: 105 });

      yAxis += 6;

      doc
        .setFontSize(11)
        .setFont('Roboto', 'thin')
        .setTextColor(0, 0, 0)
        .text(this.customerAddress(order), xAxis, yAxis, { maxWidth: 105 });

      doc
        .setFont('Roboto', 'bold')
        .setFontSize(30)
        .setTextColor(0, 150, 136)
        .text('INVOICE', 136, yAxis - 5, { charSpace: 3 });

      // Invoice Number
      doc
        .setFont('Roboto', 'bold')
        .setFontSize(11)
        .setTextColor(92, 92, 92)
        .text('No', 136, yAxis + 2, { charSpace: 0.8 })
        .setFont('Roboto', 'normal')
        .setFontSize(10)
        .text(
          `#${order.order_group_id.toUpperCase()}${order._id
            .slice(-2)
            .toUpperCase()}`,
          136 + 7,
          yAxis + 2,
          { charSpace: 0.8 }
        );

      // line
      yAxis += 10;
      doc.setLineWidth(0.6).line(xAxis, yAxis, 200, yAxis);
      // Order Id
      yAxis += 6;
      doc
        .setFontSize(11)
        .setFont('Roboto', 'bold')
        .text(`Order Id: ${order.order_group_id.toUpperCase()}`, xAxis, yAxis);
      // Order Date
      yAxis += 7;
      doc
        .setFontSize(11)
        .setFont('Roboto', 'bold')
        .text(`Order Date:`, xAxis, yAxis, { maxWidth: 80 })
        .setFont('Roboto', 'normal')
        .text(
          this.getTimeZoneConvert(order.createdAt, adminInfo),
          xAxis + 22,
          yAxis
        );
      // Invoice Date
      yAxis += 7;
      doc
        .setFontSize(11)
        .setFont('Roboto', 'bold')
        .text(`Invoice Date:`, xAxis, yAxis, { maxWidth: 80 })
        .setFont('Roboto', 'normal')
        .text(
          this.getTimeZoneConvert(order.createdAt, adminInfo),
          xAxis + 24,
          yAxis
        );

      // line
      yAxis += 5;
      doc.setLineWidth(0.6).line(xAxis, yAxis, 200, yAxis);

      yAxis += 8;
      const columns = [
        ['Product', 'Quantity', 'Gross Amount', 'Discount', 'Total'],
      ];
      const data = [
        [
          order.products_info.name,
          order.products_info.quantity,
          adminInfo.currency.symbol + ' ' + order.paid_amount,
          0,
          adminInfo.currency.symbol + ' ' + order.paid_amount,
        ],
        [
          'Shipping Fee',
          '',
          adminInfo.currency.symbol +
          ' ' +
          (order.products_info.fees.shipping_fees
            ? order.products_info.fees.shipping_fees
            : 0),
          0,
          adminInfo.currency.symbol +
          ' ' +
          (order.products_info.fees.shipping_fees
            ? order.products_info.fees.shipping_fees
            : 0),
        ],
        [
          'Processing Fee',
          '',
          adminInfo.currency.symbol +
          ' ' +
          (order.products_info.fees.processing_fees
            ? order.products_info.fees.processing_fees
            : 0),
          0,
          adminInfo.currency.symbol +
          ' ' +
          (order.products_info.fees.processing_fees
            ? order.products_info.fees.processing_fees
            : 0),
        ],
      ];

      autoTable(doc, {
        head: columns,
        theme: 'striped',
        styles: {
          cellPadding: 3,
          halign: 'center',
          valign: 'middle',
          overflow: 'linebreak',
        },
        columnStyles: { 0: { halign: 'center', fontSize: 10 } },
        headStyles: {
          fillColor: [246, 141, 54],
          textColor: [255, 255, 255],
        },
        body: data,
        margin: { top: yAxis, left: xAxis },
        tableWidth: 190,
        didDrawPage: (dataArg) => {
          doc.setFontSize(20);
          doc.setTextColor(40);
        },
        willDrawCell: (data) => {
          if (
            data.section === 'body' &&
            data.column.index === 0 &&
            data.row.index === 0
          ) {
            doc.setFont('Roboto', 'bold').setFontSize(11);
          }

          if (data.section === 'body' && data.column.index === 4) {
            doc.setFont('Roboto', 'bold').setFontSize(10);
          }
        },
        didParseCell: (data) => {
          if (data.section === 'body' && data.column.index === 0) {
            data.cell.styles.halign = 'left';
          }
        },
      });

      // Grand Total
      yAxis = 153;
      doc
        .setDrawColor(0)
        .setFillColor(246, 141, 54)
        .rect(135, yAxis - 6, 64, 10, 'F')
        .setFontSize(15)
        .setFont('Roboto', 'bold')
        .setTextColor(255, 255, 255)
        .text(`Grand Total:`, 140, yAxis + 1)
        // tslint:disable-next-line:max-line-length
        .text(
          adminInfo.currency.symbol + ' ' + this.totalPrice(order).grossAmount,
          doc.internal.pageSize.getWidth() - 15,
          yAxis + 1,
          {
            align: 'right',
          }
        );

      // Authorized Signatory
      yAxis += 32;
      doc
        .setFontSize(12)
        .setFont('Roboto', 'normal')
        .setTextColor(93, 93, 93)
        // tslint:disable-next-line:max-line-length
        .text(
          'Authorized Signatory',
          doc.internal.pageSize.getWidth() - 20,
          yAxis,
          {
            align: 'right',
          }
        );

      // line
      yAxis += 5;
      doc
        .setDrawColor(0, 0, 0)
        .setLineWidth(0.6)
        .line(xAxis, yAxis, 200, yAxis);
      // Image
      yAxis += 10;
      image.src = 'assets/images/logo.png';
      doc.addImage(
        image,
        'png',
        doc.internal.pageSize.getWidth() - 50,
        yAxis,
        35,
        13
      );

      yAxis += 20;
      doc
        .setFontSize(13)
        .setFont('Roboto', 'normal')
        .text('Thank You', doc.internal.pageSize.getWidth() - 47, yAxis);

      yAxis += 5;
      doc
        .setFontSize(11)
        .setTextColor(179, 179, 179)
        .text(
          'for shopping with us',
          doc.internal.pageSize.getWidth() - 51,
          yAxis
        );

      yAxis += 25;
      doc
        .setFontSize(11)
        .setFont('Roboto', 'normal')
        .setTextColor(93, 93, 93)
        .text('Teams & Condition:', xAxis, yAxis);

      yAxis += 5;
      doc
        .setFontSize(10)
        .setFont('Roboto', 'thin')
        .setTextColor(0, 0, 0)
        .text(
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
          xAxis + 5,
          yAxis,
          { maxWidth: 183 }
        );

      doc.setProperties({
        title: 'Invoice',
      });

      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
      }

      // This is where the PDF file will stored , you can change it as you like
      const directory = this.file.externalApplicationStorageDirectory;
      // Name of pdf
      const fileName = order.order_group_id.toUpperCase() + '.pdf';
      // Writing File to Device
      let options: IWriteOptions = { replace: true };
      this.file
        .writeFile(directory, fileName, buffer, options)
        .then(async (success) => {
          // this.notification.showSuccess('File created Succesfully', '', 3000);
          await toast.dismiss();
          const toast1 = await this.toastController.create({
            message: 'File created Successfully',
            position: 'bottom',
            animated: true,
            keyboardClose: true,
            color: 'success',
            buttons: [
              {
                side: 'start',
                icon: 'checkmark-circle-outline',
              },
              {
                side: 'end',
                text: 'CANCEL',
                role: 'cancel',
              },
              {
                side: 'end',
                text: 'OPEN',
                handler: () => {
                  this.fileOpener.showOpenWithDialog(directory + fileName, 'application/pdf')
                    .then(() => console.log('File is opened'))
                    .catch(e => {
                      this.notification.showError('Cannot Open File', '', 3000);
                      console.log('Error opening file', e);
                    });
                },
              },
            ],
          });
          toast1.present();
          // console.log('File created Succesfully' + JSON.stringify(success));
        })
        .catch((error) => {
          this.notification.showError('Cannot Create File', '', 3000);
          console.log('Cannot Create File ' + JSON.stringify(error));
        });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Get TimeZone
   */
  getTimeZoneConvert(date, adminInfo: AdminCurrencySchema) {
    return moment(date).tz(adminInfo.time_zone).format('DD MMM YYYY');
  }

  /**
   * @description Customer Address
   */
  customerAddress(order) {
    let address = order.address_info.address;
    if (order.address_info.city) {
      address = address + ', ' + order.address_info.city;
    }
    if (order.address_info.state) {
      address = address + ', ' + order.address_info.state;
    }
    if (order.address_info.pin) {
      address = address + ', Pin - ' + order.address_info.pin;
    }
    address = address + ', Phone - ' + order.address_info.phone;
    return address;
  }

  totalPrice(order) {
    let grossAmount;

    grossAmount = order.paid_amount;

    if (order.products_info.fees.processing_fees) {
      grossAmount =
        Math.round(
          (Number(grossAmount) +
            Number(order.products_info.fees.processing_fees)) *
          1e12
        ) / 1e12;
    }

    if (order.products_info.fees.shipping_fees) {
      grossAmount =
        Math.round(
          (Number(grossAmount) +
            Number(order.products_info.fees.shipping_fees)) *
          1e12
        ) / 1e12;
    }

    return { grossAmount };
  }
}
