//  把十进制数转换为0x开头的x位十六进制数

export function num10to16(num, n) {
    return `0x${(Array(n).join(0) + num.toString(16)).slice(-n)}`
}

// 正则表示式
export const regExp = {
    // 四位十六进制数
    four16: new RegExp(/^(0[x])?[0-9a-fA-F]{4}$/, "g"),
    // 数字
    num: new RegExp(/^[1-9]([0-9])*$/, "g"),
    // 数据长度
    datalengthRule: new RegExp(/^[0-7]$/, "g"),
    // 用户名
    userRule: new RegExp(/^[0-9a-zA-Z_]{1,12}$/, "g"),
    // 网关名称
    gatewayRule: new RegExp(/^[0-9a-zA-Z_]{1,16}$/, "g")
}