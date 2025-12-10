import CredentialsProvider from "next-auth/providers/credentials";
import { apiCall, API_ENDPOINTS } from "../apiContent/apiContent";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        accessToken: { type: "text" },
        user: { type: "json" },
      },
      async authorize(credentials) {
        try {
          console.log("NextAuth authorize called with credentials:", {
            email: credentials.email,
            hasAccessToken: !!credentials.accessToken,
            hasUser: !!credentials.user,
          });

          // If we already have an access token from the custom API login
          if (credentials.accessToken) {
            console.log("Using pre-authenticated token");
            const userData =
              typeof credentials.user === "string"
                ? JSON.parse(credentials.user)
                : credentials.user;
            return {
              id: userData.id || userData._id,
              name: userData.name || userData.email,
              email: userData.email,
              role: userData.role || userData.roles?.[0] || "user",
              accessToken: credentials.accessToken,
            };
          }

          console.log("No pre-authenticated token, attempting direct API call");
          // Fallback to direct API call if no access token provided
          const response = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          console.log("Direct API call response:", response);

          if (response.access_token) {
            return {
              id: response.user.id,
              name: response.user.name || response.user.email,
              email: response.user.email,
              role: response.user.roles?.[0] || "user",
              accessToken: response.access_token,
            };
          }

          console.log("No access token in response");
          return null;
        } catch (error) {
          console.error("Auth error in NextAuth:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, hasUser: !!user });
      if (user) {
        // Copy all user data to token
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      // Set all user data in session
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true, // Enable debug mode
};
