// "use server";
// import { signIn, signOut } from "../auth";
// import { redirect } from "next/navigation";
// export async function docredentilas(Data: any) {
//   try {
//     const { email, password } = Data;

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//     console.log("user geting");

//     return {
//       success: true,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.cause?.err?.message || error.message,
//     };
//   }
// }

