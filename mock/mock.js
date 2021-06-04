import Mock from 'mockjs'

const dataErr = {
    code: 20001,
    token: "",
    success: false
}


const mockServe = () => {

    Mock.mock(
        '/api/v-admin/user/login',
        'post',
        (req) => {
            const {username, password} = JSON.parse(req.body)
            if (username === "admin" && password === "123456") {
                return {
                    code: 20000,
                    token: "admin-t" + Date.now(),
                    data: {
                        roles: ["admin"],
                        username: "admin",
                        avatar: "",
                        age: "12",
                    },
                    success: true
                }
            } else {
                return dataErr
            }

        }
    )

    Mock.mock(
        '/api/v-admin/user/info',
        'post',
        (req) => {
            // console.log(req)
            if (req) {
                return {
                    code: 20000,
                    data: {
                        roles: ["admin"],
                        username: "admin",
                        avatar: "",
                        age: "12",
                        menu: []
                    },
                    success: true
                }
            } else {
                return dataErr
            }

        }
    )


    return true
}

export default mockServe

