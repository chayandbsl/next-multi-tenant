import { CUSTOMER_CODE_PREFIX } from "./constant";

export async function generateUserCode(
  lastUserCode: string | null | undefined
) {
  let newCode;
  if (lastUserCode) {
    const lastCode = lastUserCode;
    const lastNumber = parseInt(lastCode.substring(3), 10);
    const nextNumber = lastNumber + 1;
    newCode = `${CUSTOMER_CODE_PREFIX}${nextNumber
      .toString()
      .padStart(3, "0")}`;
  } else {
    newCode = "CUS001";
  }

  return newCode;
}
