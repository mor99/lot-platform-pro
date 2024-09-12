// 用户token

const tokenModel = {
    namespace: 'authorization',
    state: {
        accessToken: undefined,
    },
    reducers: {
        saveToken(state, { payload }) {
            return { ...state,accessToken: payload }
        }
    }

}

export default tokenModel;