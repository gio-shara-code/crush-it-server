import jwt from "jsonwebtoken"

const verifyToken = () =>
  jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
    return {id: "user_id"}
  })

export {verifyToken}
