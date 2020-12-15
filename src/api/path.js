var LOADIP = "http://182.92.223.226";
let Ip = {
  productIP: LOADIP + "/",
};
let path = {
  website: {
    //个人工作台
    login: Ip.productIP + "login",
    register: Ip.productIP + "register",
    getUserInfo: Ip.productIP + "getUserInfo",
    alterPassword: Ip.productIP + "alterPassword",
    uploadUserImage: Ip.productIP + "uploadUserImage",
    updateUserImgPath: Ip.productIP + "updateUserImgPath",
    updateUserInfo: Ip.productIP + "updateUserInfo",
    getUserQuestionByUsername: Ip.productIP + "getUserQuestionByUsername",
    setPassword: Ip.productIP + "setPassword",

    //检索
    searchProject: Ip.productIP + "scholarship/getProjectListByKeyword",
  },
};
export default path;
