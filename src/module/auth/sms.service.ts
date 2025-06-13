import { Injectable, InternalServerErrorException } from '@nestjs/common';
import ENDPOINTS from 'src/common/endpoint';
import axios from 'axios';
@Injectable()
class SmsService {
  private email: string = process.env.ESKIZ_EMAIL as string;
  private password: string = process.env.ESKIZ_PASSWORD as string;
  constructor() {}
  async getToken() {
    try {
      const url = ENDPOINTS.getEskizTokenUrl();
      const fromData = new FormData();
      fromData.set('email', this.email);
      fromData.set('password', this.password);
      const {
        data: {
          data: { token },
        },
      } = await axios.post(url, fromData, {
        headers: {
          'Content-Type': 'multipart/from-data',
        },
      });
      return token;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async sendSms(phone_number: string, otp: string) {
    const url = ENDPOINTS.smsurl();
    const token = await this.getToken();
    const fromData = new FormData();

    fromData.set('mobile_phone', phone_number);
    fromData.set('message', `StudyHub ilovasiga kirish kodi:${otp}`);
    fromData.set('from', '4546');

    const { status } = await axios.post(url, fromData, {
      headers: {
        'Content-Type': 'multipart/from-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (status !== 200) throw new InternalServerErrorException('server error');
  }
}
export default SmsService;
