var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

export default function handler(req, res){
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'riokuncoro799@gmail.com',
        pass: 'vcvukiemnykbpozg'
      }
    }));
    
    var mailOptions = {
      from: 'x@noreply.com',
      to: 'riokuncoro26@gmail.com',
      subject: '[Info] New Devices Accesing Site.',
      text: "Plaintext version of the message",
      html: `
            <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
                </head>

                <body>
                    <div>
                        <h3 class="text-primary">New person accessing your site</h3>
                    </div>
                    <center>
                        <div style="background: #472D2D; padding: 15px;">
                            <div style="background: black; width: 100%; padding: 3px">
                                <h4 style="color: white">NEW DEVICES! 🧔</h4>
                            </div>
                            <div style="background: skyblue; width: 100%; margin-top: 10%; padding: 5px">
                                <h4 style="color: white">Location 🌍</h4>
                            </div>

                            <div style="margin-top: 15px">
                                <b style="color: white">IP -> ${req.body.ip}</b><br><br>
                                <b style="color: white">City -> ${req.body.city}</b><br><br>
                                <b style="color: white">Country -> ${req.body.country}</b><br><br>
                                <b style="color: white">ISP -> ${req.body.isp}</b><br><br>
                                <b style="color: white">Region -> ${req.body.regionName}</b><br><br>
                                <b style="color: white">Google Maps -> <a href='${req.body.maps}'>Lokasi Devices</a></b><br><br>
                            </div>

                            <div style="background: purple; width: 100%; margin-top: 10%; padding: 3px">
                                <h4 style="color: white">Devices 📱</h4>
                            </div>

                            <div style="margin-top: 15px">
                                <b style="color: white">User Agent -> ${req.body.user_agent}</b><br><br>
                                <b style="color: white">Battery Level -> ${req.body.battery}%</b><br><br>
                                <b style="color: white">RAM -> ${req.body.device_ram}GB<b><br><br>
                                <b style="color: white">Platform -> ${req.body.platform}</b><br><br>
                                <b style="color: white">Language -> ${req.body.language}</b><br><br>
                                <b style="color: white">Connections Type -> ${req.body.connections}</b><br><br>
                                <b style="color: white">Date -> ${req.body.date}</b>
                            </div>
                        </div>
                    </center>
                </body>
            </html>
      `
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        res.send(error);
      } else {
        res.json({
            response: info.response
        })
      }
    });  
    
}
