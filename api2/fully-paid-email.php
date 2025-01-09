<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      text-transform: capitalize;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 150px;
      height: auto;
    }
    .content {
      color: #333;
    }
    .content h1 {
      font-size: 24px;
      color: #333;
      text-align: center;
    }
    .details {
      margin: 20px 0;
      border-collapse: collapse;
      width: 100%;
    }
    .details td {
      padding: 10px;
      border: 1px solid #ddd;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp2jp7OnZGWozg8VnNmQkwIHW-oXzClho1w&s" alt="Clinic Logo" />
    </div>
    <div class="content">
      <h1>Payment Confirmation</h1>
      <p>Dear <strong style="text-transform: capitalize;"><?php echo "$recipientFname $recipientLname";?></strong>,</p>
      <p>Thank you for visiting <strong>Toothie Cutie Dental Clinic</strong>. This email confirms that your payment has been successfully processed. Below are the details of your visit:</p>
      <table class="details">
        <tr>
          <td><strong>Patient Name:</strong></td>
          <td style="text-transform: capitalize;"><?php echo "$recipientFname $recipientLname";?></td>
        </tr>
        <tr>
          <td><strong>Dentist Name:</strong></td>
          <td style="text-transform: capitalize;"><?php echo "$dentistFname $dentistLname";?></td>
        </tr>
        <tr>
          <td><strong>Date of Service:</strong></td>
          <td style="text-transform: capitalize;"><?php echo $serviceDate;?></td>
        </tr>
        <tr>
          <td><strong>Service:</strong></td>
          <td><?php echo $service;?></td>
        </tr>
        <tr>
          <td><strong>Total Cost:</strong></td>
          <td><?php echo "Php $totalAmount";?></td>
        </tr>
      </table>
      <p>If you have any questions or need further assistance, please don’t hesitate to contact us at <strong>toothiecute@gmail.com</strong>.</p>
      <p>We appreciate your trust in <strong>Toothie Cutie Dental Clinic</strong> and look forward to serving you again!</p>
    </div>
    <div class="footer">
      <p>toothiecute@gmail.com | Paranaque City | 09878757892</p>
    </div>
  </div>
</body>
</html>
