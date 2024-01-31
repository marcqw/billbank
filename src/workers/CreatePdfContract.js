const PDFDocument = require('pdfkit');
const fs = require('fs');
const moment = require('moment');

function createPdfContractWorker(zbc) {
    return zbc.createWorker({
        taskType: 'create-pdf-contract',
        taskHandler: job => {
            console.log(job.variables);

            const currentDate = moment().locale('fr').format('LL');
            const fileName = `./storage/${job.variables.fullName.replace(/\s+/g, '_').toLowerCase()}-${Date.now()}.pdf`;

            const doc = new PDFDocument({ size: 'A4' });
            doc.pipe(fs.createWriteStream(fileName));

            // Header
            doc.image('logo.png', 50, 20, { width: 220 });
            doc.moveDown();

            doc.fontSize(10)
                .text('Super Agence', { align: 'right' })
                .text('Place Guillaume II', { align: 'right' })
                .text('1648, Luxembourg', { align: 'right' })
                .moveDown()
                .text('+352 22 28 09', { align: 'right' })
                .moveDown(3);

            // Contract Title
            doc.fontSize(18).text('Contrat d\'ouverture de compte courant bancaire', { align: 'center' });
            doc.moveDown();

            // Contract Parties
            doc
                .fontSize(12)
                .text('Entre')
                .text('L\'incroyable banque BillBank dont le siège se situe quelque part dans le monde.')
                .text('Ci-dessous nommée La Banque.')
                .moveDown()
                .text('et')
                .text(`${job.variables.fullName} né le  ${moment(job.variables.dateOfBirth).locale('fr').format('LL')} et résidant ${job.variables.address}`)
                .text('Ci-dessous nommée Le Client.')
                .moveDown(2);
            // Contract Content
            doc.fontSize(12).text(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed convallis leo. Donec lobortis eu lorem vel sodales. Nulla eget risus at augue suscipit venenatis. Suspendisse non mi velit. Vestibulum mollis felis id dignissim auctor. Nulla suscipit sem eu imperdiet scelerisque. Etiam in ultrices libero, quis varius ligula. Donec sit amet magna a nulla pretium pellentesque eget eget magna.

            Nullam pretium dictum erat, in commodo diam egestas eget. Ut vitae porta felis, sed molestie sem. Phasellus facilisis magna sed velit vehicula, pulvinar fringilla mauris volutpat. Etiam facilisis, metus quis ultrices tincidunt, nisi dui gravida purus, sed imperdiet ante dolor eu orci. Donec gravida at eros nec facilisis. Sed sodales, felis at placerat ultricies, massa enim facilisis mauris, a vehicula velit enim vitae nisl. Aenean ut iaculis odio.
            
            Quisque sit amet suscipit eros. Maecenas congue sapien et tempor ultrices. Nam et semper lacus. Nullam luctus, sem sit amet viverra sollicitudin, tellus sem rhoncus nisi, rutrum posuere ligula ex in purus. Integer posuere leo a consequat porttitor. Quisque sed mi quis sapien faucibus dapibus a tempus nunc. Donec eleifend diam non faucibus viverra. Nulla scelerisque odio at consectetur ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis accumsan neque, non dictum quam. Morbi sit amet aliquet diam.
            
            In sollicitudin neque massa, vitae euismod mauris varius a. Pellentesque sit amet eros vitae mi elementum accumsan. Pellentesque quis erat orci. Suspendisse eu urna sit amet dui sagittis tincidunt in nec dolor. Duis finibus in libero ut vehicula. Praesent in dui a ligula tempor vehicula at sed lorem. Aliquam porttitor, diam sed consectetur finibus, nisi ligula volutpat ligula, eu iaculis quam tellus ac nunc. Duis pharetra purus augue, vitae lobortis erat fermentum at. Aliquam vestibulum odio ac sem malesuada hendrerit.
            
            Ut turpis tellus, ullamcorper eu arcu ac, efficitur mollis ex. Etiam ac nisi at ex dignissim vestibulum. Nunc turpis libero, luctus nec risus id, accumsan facilisis dui. Curabitur non enim erat. Nam vel enim non turpis condimentum aliquet. Donec sed eleifend massa, et porta felis. Sed varius quis orci sed ornare. Aliquam sed ligula semper, pretium purus sit amet, accumsan nisi. Cras commodo nisi eget pellentesque venenatis. Proin vel massa gravida, ultrices tortor ac, bibendum sem. Aliquam vel blandit mi. Mauris facilisis enim consequat tincidunt volutpat. Etiam lobortis sit amet augue quis rhoncus. Maecenas gravida sagittis erat et efficitur. Nunc eleifend risus magna, ut feugiat tellus volutpat vel. Suspendisse potenti.`, { align: 'justify' });

            // Date and Signatures
            doc.text(`Fait à Luxembourg, le ${currentDate}`, 50, 500, { align: 'left' });

            // Bank's signature box
            doc.rect(50, 550, 200, 120).stroke();
            doc.text('Signature de la banque', 60, 570);
            doc.image('signature.png', 90, 600, { width: 100 });

            // Customer's signature box
            doc.rect(300, 550, 200, 120).stroke();
            doc.text('Signature du client', 310, 570);
            doc.text('{{Sign;type=signature}} ', 310, 600);

            // End the document
            doc.end();

            return job.complete({
                //customerRecordExists: true,
                //ilove: 'je decide!'
            });
        }
    });
}

module.exports = createPdfContractWorker;
