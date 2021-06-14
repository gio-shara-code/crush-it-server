import jwt from "jsonwebtoken"

const verifyTokenValid = () =>
  jest.spyOn(jwt, "verify").mockImplementation((token: string, secret: any) => {
    return {id: "user_id"}
  })

export {verifyTokenValid}
