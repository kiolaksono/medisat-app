import nodemailer from "nodemailer"

type paramsType={
    name:string,
    email:string,
    bookDate:string,
    status:string,
    doctorName:string,
}

export default async function PatientMail(params:paramsType) {
    const {name, email, status, doctorName} = params
    let {bookDate} = params
    bookDate = bookDate.split("-").reverse().join("-")
    const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MEDISAT_EMAIL,
                pass: process.env.MEDISAT_PASSWORD
            }
        });
    
        const info = await transporter.sendMail({
        from: process.env.MEDISAT_EMAIL, // sender address
        to: email, // list of receivers
        subject: "Registrasi", // Subject line
        text: "Registrasi", // plain text body
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        /* Reset CSS */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .body {
            padding: 20px;
            line-height: 1.6;
        }

        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Medisat App</h1>
        </div>
        <div class="body">
            <p>Yth ${name},</p>
            <p>Reservasimu sudah kami terima sebagai berikut: </p>
            <p>
                <strong>Dokter:</strong> ${doctorName}<br>
                <strong>Tanggal:</strong> ${bookDate}<br>
                <strong>Status:</strong> ${status}
            </p>
            <p>
                Anda dapat melakukan login menggunakan email: ${email} dan password yang sudah terdaftar.
            </p>
            <p>Terima kasih sudah menggunakan layanan Medisat</p>
        </div>
        <div class="footer">
            <p>&copy; Medisat 2024</p>
        </div>
    </div>
</body>

</html>`, // html body
      });

    //   console.log("Message sent: %s", info.messageId)
}

