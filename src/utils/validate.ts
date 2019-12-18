type FormValidate = (rule: any, value: any, callback: any, source?: any, options?: any) => any;

const phoneReg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;

export const checkPhone:FormValidate = (rule, value, callback) => {
  if(!(phoneReg.test(value))){
    callback("手机号码有误，请重填");
  }else{
    callback();
  }
};
