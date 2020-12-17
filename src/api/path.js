var LOADIP = "http://182.92.223.226";
let Ip = {
  productIP: LOADIP + "/",
};
let path = {
  website: {
    //个人工作台
    login: Ip.productIP + "user/login",
    register: Ip.productIP + "user/register",
    getUserInfo: Ip.productIP + "getUserInfo",
    alterPassword: Ip.productIP + "alterPassword",
    uploadUserImage: Ip.productIP + "uploadUserImage",
    updateUserImgPath: Ip.productIP + "updateUserImgPath",
    updateUserInfo: Ip.productIP + "updateUserInfo",
    getUserQuestionByUsername: Ip.productIP + "getUserQuestionByUsername",
    setPassword: Ip.productIP + "setPassword",
    isEmailUsed: Ip.productIP + "user/emailUsed",
    isNameUsed: Ip.productIP + "user/nameUsed",
    userVerify: Ip.productIP + "user/verify",
    scholarVerify: Ip.productIP + "user/toBeScholar",
    getInfo: Ip.productIP + "user/getInfo",

    //检索
    searchProject: Ip.productIP + "scholarship/advancedSearchProject",
    searchProjectSortByDate: Ip.productIP + "scholarship/advancedSearchProjectSortByDate",
    searchPatent: Ip.productIP + "scholarship/advancedSearchPatent",
    searchPatentSortByDate: Ip.productIP + "scholarship/advancedSearchPatentSortByDate",
    searchPaper: Ip.productIP + "scholarship/advancedSearchPaper",
    searchPaperSortByDate: Ip.productIP + "scholarship/advancedSearchPaperSortByDate",
    searchPaperSortByCitation: Ip.productIP + "scholarship/advancedSearchPaperSortByCitationCount",
    getProjectById: Ip.productIP + "scholarship/getProjectById/",
    getPatentById: Ip.productIP + "scholarship/getPatentByPatentId/",
    searchDataScholar: Ip.productIP + "scholar/SearchDataScholar",
    searchScholar: Ip.productIP + "scholar/Search",

    //申诉列表
    getAppeal: Ip.productIP + "message/appeal/all/",
    updateAppeal: Ip.productIP + "message/appeal/one/",
    getHotFields: Ip.productIP + "scholarship/hotFields/",

    //通过id获取数据库门户信息
    getScholarByID: Ip.productIP + "scholar/dataScholar/",

    //通过学者ID查询学者
    getRealScholarByID: Ip.productIP + "/scholar/admin/Search/",

    //认退领项目
    renlingProg: Ip.productIP + "/scholarship/claimProject/",
    disrenlingProg: Ip.productIP + "/scholarship/backClaimProject/",

    //认退领专利
    renlingPatent: Ip.productIP + "/scholarship/claimPatent/",
    disrenlingPatent: Ip.productIP + "/scholarship/backClaimPatent/",

    //查询项目、专利是否被认领
    haveRenling: Ip.productIP + "scholarship/getHaveClaim/",

    //学者
    getSameNameScholar: Ip.productIP + "scholar/sameName",
    subscribe: Ip.productIP + "scholar/subscribe",
    undoSubscribe: Ip.productIP + "scholar/subscribe",
    getScholarInfo: Ip.productIP + "scholar/info",
    editScholarInfo: Ip.productIP + "scholar/infoUpdate",
    claimDataPortal: Ip.productIP + "scholar/Scholar_DataScholar",
    undoClaimDataPortal: Ip.productIP + "scholar/Scholar_DataScholar",
    getDataPortal: Ip.productIP + "scholar/Scholar_DataScholar",
    addWorkExp: Ip.productIP + "scholar/workExperience",
    deleteWorkExp: Ip.productIP + "scholar/workExperience",
  },
};
export default path;
