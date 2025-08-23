import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      firstName: string;
      lastName: string;
      locale: string;
      verified: boolean;
      username: string;
      id: string;
      name: string;
      image: string;
      email: string;
    };
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    image: string;
    given_name: string;
    family_name: string;
    email_verified: string;
    locale: string;
    login: string;
    avatar_url: string;
  }
}
