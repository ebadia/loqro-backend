import * as sgTransport from 'nodemailer-sendgridv3-transport'

export const mailConfig = {
  transport: sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API
    }
  }),
  defaults: {
    from: '"ampanova-mailer" <enric.badia@gmail.com>'
  },
  templateDir: './src/common/email'
}
