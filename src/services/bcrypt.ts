import * as bcrypt from "bcrypt"

const hashPassword = async (password: string) => {
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 10)
  } catch (e) {
    console.log(`hashing password with bcrypt failed. ${e}`)
    return
  }
  return hashedPassword
}

export {hashPassword}
