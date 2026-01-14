'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApplicationData {
    fullName: string;
    age: string;
    cityCountry: string;
    instagram: string;
    height: string;
    bust: string;
    waist: string;
    hips: string;
    shoeSize: string;
    images: {
        headshot: string;
        profile: string;
        waistUp: string;
        fullLength: string;
    };
}

export async function submitApplication(data: ApplicationData) {
    const directorEmail = process.env.DIRECTOR_EMAIL;

    if (!directorEmail) {
        return { success: false, error: 'Director email not configured' };
    }

    try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Model Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F9F8F4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9F8F4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #ECEAE4;">
          
          <tr>
            <td style="padding: 40px 40px 30px 40px; border-bottom: 1px solid #ECEAE4;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #1C1B1A; letter-spacing: 0.02em;">
                NAATH
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #787672; text-transform: uppercase; letter-spacing: 0.15em;">
                New Application Received
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 600; color: #A6A29A; text-transform: uppercase; letter-spacing: 0.2em;">
                I. The Identity
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Full Name</span><br>
                    <span style="font-size: 18px; color: #1C1B1A; font-style: italic;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Age</span><br>
                    <span style="font-size: 18px; color: #1C1B1A; font-style: italic;">${data.age}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Location</span><br>
                    <span style="font-size: 18px; color: #1C1B1A; font-style: italic;">${data.cityCountry}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Instagram</span><br>
                    <a href="https://instagram.com/${data.instagram.replace('@', '')}" style="font-size: 18px; color: #1C1B1A; font-style: italic; text-decoration: none;">
                      ${data.instagram}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 600; color: #A6A29A; text-transform: uppercase; letter-spacing: 0.2em;">
                II. The Metric
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 10px 8px 0; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Height</span><br>
                    <span style="font-size: 16px; color: #1C1B1A;">${data.height} cm</span>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 10px; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Bust</span><br>
                    <span style="font-size: 16px; color: #1C1B1A;">${data.bust} cm</span>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 10px 8px 0; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Waist</span><br>
                    <span style="font-size: 16px; color: #1C1B1A;">${data.waist} cm</span>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 10px; border-bottom: 1px solid #ECEAE4;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Hips</span><br>
                    <span style="font-size: 16px; color: #1C1B1A;">${data.hips} cm</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <span style="font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Shoe Size</span><br>
                    <span style="font-size: 16px; color: #1C1B1A;">${data.shoeSize}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 600; color: #A6A29A; text-transform: uppercase; letter-spacing: 0.2em;">
                III. The Polaroids
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 0 10px 20px 0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Headshot</p>
                    <a href="${data.images.headshot}">
                      <img src="${data.images.headshot}" alt="Headshot" style="width: 100%; max-width: 200px; height: auto; border: 1px solid #ECEAE4;">
                    </a>
                  </td>
                  <td width="50%" style="padding: 0 0 20px 10px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Profile</p>
                    <a href="${data.images.profile}">
                      <img src="${data.images.profile}" alt="Profile" style="width: 100%; max-width: 200px; height: auto; border: 1px solid #ECEAE4;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 0 10px 0 0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Waist Up</p>
                    <a href="${data.images.waistUp}">
                      <img src="${data.images.waistUp}" alt="Waist Up" style="width: 100%; max-width: 200px; height: auto; border: 1px solid #ECEAE4;">
                    </a>
                  </td>
                  <td width="50%" style="padding: 0 0 0 10px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.1em;">Full Length</p>
                    <a href="${data.images.fullLength}">
                      <img src="${data.images.fullLength}" alt="Full Length" style="width: 100%; max-width: 200px; height: auto; border: 1px solid #ECEAE4;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1B1A; text-align: center;">
              <p style="margin: 0; font-size: 10px; color: #787672; text-transform: uppercase; letter-spacing: 0.2em;">
                Naath Model Management
              </p>
              <p style="margin: 8px 0 0 0; font-size: 10px; color: #787672;">
                ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

        const result = await resend.emails.send({
            from: 'Naath Applications <onboarding@resend.dev>',
            to: directorEmail,
            subject: `New Application: ${data.fullName}`,
            html: emailHtml,
        });

        console.log('Resend result:', result);

        if (result.error) {
            console.error('Resend error:', result.error);
            return { success: false, error: result.error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to send application email:', error);
        return { success: false, error: 'Failed to send application' };
    }
}
