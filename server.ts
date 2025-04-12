import { sendMoney } from './script/simulate-trans.ts';

const res = await sendMoney();

console.log(res);
