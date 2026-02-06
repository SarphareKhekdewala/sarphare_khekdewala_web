import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOrderConfirmation(order: any, customer: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: customer.email || customer.phone + '@example.com',
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1890ff; color: white; padding: 20px; text-align: center;">
          <h1>Sarphare Khekdewala</h1>
          <p>Fresh Seafood Delivered</p>
        </div>
        
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h2>Thank you for your order!</h2>
          <p>Dear ${customer.name},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₹${order.finalAmount.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <p><strong>Order Status:</strong> ${order.status}</p>
          </div>
          
          <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Delivery Address</h3>
            <p>${customer.address}</p>
            <p>${customer.area} - ${customer.pincode}</p>
            <p>Phone: ${customer.phone}</p>
          </div>
          
          <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Items Ordered</h3>
            ${order.items.map((item: any) => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.product.name}</strong></p>
                <p>Quantity: ${item.quantity} ${item.product.unit} × ₹${item.price} = ₹${item.total.toFixed(2)}</p>
              </div>
            `).join('')}
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #1890ff;">
              <p style="font-size: 18px;"><strong>Final Amount: ₹${order.finalAmount.toFixed(2)}</strong></p>
            </div>
          </div>
          
          <p style="margin-top: 20px;">We will contact you shortly to confirm the delivery time.</p>
          <p>For any queries, please call us or WhatsApp: <strong>+91-XXXXXXXXXX</strong></p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              © 2024 Sarphare Khekdewala. All rights reserved.<br>
              Fresh Seafood | Mumbai, Thane, Navi Mumbai
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function sendOrderStatusUpdate(order: any, customer: any, newStatus: string) {
  const statusMessages: Record<string, string> = {
    confirmed: 'Your order has been confirmed and is being prepared.',
    processing: 'Your order is currently being processed.',
    'out-for-delivery': 'Your order is out for delivery! Our delivery person will reach you soon.',
    delivered: 'Your order has been delivered successfully. Thank you for your purchase!',
    cancelled: 'Your order has been cancelled. Please contact us for any queries.',
  };

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: customer.email || customer.phone + '@example.com',
    subject: `Order Status Update - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1890ff; color: white; padding: 20px; text-align: center;">
          <h1>Order Status Update</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f5f5f5;">
          <p>Dear ${customer.name},</p>
          <p style="font-size: 16px;"><strong>${statusMessages[newStatus]}</strong></p>
          
          <div style="background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Current Status:</strong> ${newStatus}</p>
          </div>
          
          <p>Thank you for choosing Sarphare Khekdewala!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Status update email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
