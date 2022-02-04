//获取当前svg目录所有后缀为.svg的文件
const reg = require.context('../assets/svg',false,/\.svg$/);
//解析获取的.svg文件的文件名称，并返回
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);
};
requireAll(reg);