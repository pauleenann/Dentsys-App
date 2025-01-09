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
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp2jp7OnZGWozg8VnNmQkwIHW-oXzClho1w&s" alt="Toothie Cutie Dental Clinic Logo">
    </div>
    <div class="content">
      <h1>Overdue Invoice Notice</h1>
      <p>Dear <strong style="text-transform: capitalize;"><?php echo "$recipientFname $recipientLname"; ?></strong>,</p>
      <p>We are sending you a reminder regarding your overdue invoice. Below are the details of the invoice:</p>
      
      <table class="details">
        <tr>
          <td><strong>Invoice ID:</strong></td>
          <td><?php echo $invoiceId; ?></td>
        </tr>
        <tr>
          <td><strong>Issued Date:</strong></td>
          <td><?php echo $issueDate; ?></td>
        </tr>
        <tr>
          <td><strong>Due Date:</strong></td>
          <td><?php echo $dueDate; ?></td>
        </tr>
        <tr>
          <td><strong>Total Amount:</strong></td>
          <td><?php echo "Php " . number_format($total, 2); ?></td>
        </tr>
        <tr>
          <td><strong>Service:</strong></td>
          <td><?php echo $service; ?></td>
        </tr>
      </table>
      
      <p>Please make the payment as soon as possible to avoid any service interruptions.</p>
      <p>If you have already made the payment, kindly disregard this notice. For any questions, please contact us at <strong>toothiecutie@gmail.com</strong>.</p>
      <p>We appreciate your prompt attention to this matter!</p>
    </div>
    <div class="footer">
      <p>Thank you for choosing Toothie Cutie Dental Clinic!</p>
      <p>Contact us: toothiecutie@gmail.com | Paranaque City | 09878757892</p>
    </div>
  </div>
</body>
</html>
