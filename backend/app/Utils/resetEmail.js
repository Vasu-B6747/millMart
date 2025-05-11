import nodemailer from 'nodemailer' 
const sendEmail=async(user)=>{
   console.log(user.email)
   try{
    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
          
    })
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:user.email,
        subject:user.subject,
        // text:`Hi ${user.name}\n Your Account ${user.message} Successfully your login credentials are \nemail:${user.email}\npassword:${user.password}`
        text:user.message,
        html:user.html || null
       
    }
 
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
export default sendEmail