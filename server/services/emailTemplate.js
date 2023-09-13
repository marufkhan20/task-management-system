module.exports = (verifyLink) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #666666;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verify Your Email Address</h1>
      <p>
        Thank you for signing up with [Your Company Name]! To complete your
        registration and access our services, please verify your email address
        by clicking the link below:
      </p>
      <a class="button" href="${verifyLink}">${verifyLink}</a>
      <p>
        Please make sure to click on the link within the next 24 hours to
        activate your account. If you have not registered with us, please
        disregard this email.
      </p>
      <p>
        If you encounter any issues or have questions, please don't hesitate to
        contact our customer support team at
        <a href="mailto:[Customer Support Email]">[Customer Support Email]</a>.
      </p>
      <p>
        Thank you for choosing [Your Company Name]. We look forward to serving
        you!
      </p>
    </div>
  </body>
</html>

  `;
};
