import * as bcrypt from "bcrypt"

interface PasswordData {
  currentPassword: string
  correctPassword: string
}

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

const comparePassword = async (data: PasswordData) => {
  let result
  try {
    result = await bcrypt.compare(data.currentPassword, data.correctPassword)
  } catch (e) {
    console.log(`Comparing password failed. ${e}`)
    return
  }
  return result
}

export {hashPassword, comparePassword}
