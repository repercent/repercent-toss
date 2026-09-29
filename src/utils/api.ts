import axios from 'axios';

import { PURCHASE_API_URL } from '../constant/env';

/** 매입 API 클라이언트 */
export const purchaseApi = axios.create({ baseURL: PURCHASE_API_URL });
