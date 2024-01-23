exports.successfullyRegistered = (name, accountType) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>successfully Registered</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
        <a href="https://res.cloudinary.com/dq11p7tgo/image/upload/v1702163486/galaxy/jzamwllountfnk3xxh8e.png"><img src="https://www.dkte.ac.in/images/dkte-logo.png" alt="Aicte Logo" border="0"></a>
            <div class="message">Welcome ${name}, you have registered as ${accountType}. </div>
            <div class="body">
                <p>You have successfully Registered with DKTE Bus Pass<span class="highlight"></span>.
                </p>
                <p>All India Council for Technical Education (AICTE) was set up in November 1945 as a national-level Apex Advisory Body to conduct a survey on the facilities available for technical education and to promote development in the country in a coordinated and integrated manner.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:aicte.org.official@gmail.com">aicte.org.official@gmail.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};