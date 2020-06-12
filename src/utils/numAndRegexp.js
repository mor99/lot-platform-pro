//  把十进制数转换为0x开头的x位十六进制数

export function num10to16(num,n) {
    return `0x${(Array(n).join(0) + num.toString(16)).slice(-n)}`
}

// 正则表示式
export const regExp = {
    // 四位十六进制数
    four16: new RegExp(/^(0[x])?[0-9a-fA-F]{4}$/, "g"),
    // 0-7之间的整数
    num0to7: new RegExp(/^[0-7]\d*$/, "g")
}
// 四位十六进制数

export const four16 = new RegExp(/^(0[x])?[0-9a-fA-F]{4}$/, "g")

// 0-7之间的整数

export const num0to7 = new RegExp(/^[0-7]\d*$/, "g")