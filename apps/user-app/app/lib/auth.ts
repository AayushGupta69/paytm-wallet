import database from "@paytm-wallet/database/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "text",
          placeholder: "(123) 456-7890",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },

      // TODO: Fix the type of credentials from NextAuth
      async authorize(credentials: any) {
        // TODO: Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await database.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await database.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: Fix the type of session and token
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
