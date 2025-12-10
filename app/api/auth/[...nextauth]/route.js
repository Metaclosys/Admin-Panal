import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // Allow passing pre-authenticated data from client
        accessToken: { label: "accessToken", type: "text" },
        user: { label: "user", type: "text" },
      },
      async authorize(credentials) {
        try {
          // 1) If we already have a token from a prior backend login, trust it
          if (credentials?.accessToken) {
            const parsedUser = typeof credentials.user === "string" ? JSON.parse(credentials.user) : credentials.user;
            const parsedRoles = Array.isArray(parsedUser?.roles)
              ? parsedUser.roles
              : parsedUser?.role
              ? [parsedUser.role]
              : [];
            const assignedLocations = Array.isArray(parsedUser?.assignedLocations)
              ? parsedUser.assignedLocations
              : [];

            return {
              id: parsedUser?.id || parsedUser?._id || 1,
              name: parsedUser?.name || parsedUser?.username || credentials.email,
              email: parsedUser?.email || credentials.email,
              role: parsedRoles[0] || "user",
              roles: parsedRoles,
              assignedLocations,
              accessToken: credentials.accessToken,
            };
          }

          // 2) Otherwise, authenticate against the backend now
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json().catch(() => ({}));
          if (!res.ok) return null;

          const backendToken = data?.access_token || data?.token || data?.accessToken;
          const user = data?.user || data?.data?.user || {};
          const roles = Array.isArray(user?.roles)
            ? user.roles
            : user?.role
            ? [user.role]
            : Array.isArray(data?.roles)
            ? data.roles
            : [];
          const assignedLocations = Array.isArray(user?.assignedLocations)
            ? user.assignedLocations
            : Array.isArray(data?.assignedLocations)
            ? data.assignedLocations
            : [];

          if (backendToken) {
            return {
              id: user?.id || user?._id || data?.userId || 1,
              name: user?.name || user?.username || credentials.email,
              email: user?.email || credentials.email,
              role: roles[0] || data?.role || "user",
              roles,
              assignedLocations,
              accessToken: backendToken,
            };
          }
          return null;
        } catch (error) {
          // Swallow errors to avoid leaking details, return null triggers CredentialsSignin
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.roles = user.roles || (user.role ? [user.role] : token.roles);
        token.assignedLocations = user.assignedLocations || token.assignedLocations || [];
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const roles = Array.isArray(token.roles) ? token.roles : token.role ? [token.role] : [];
      const assignedLocations = Array.isArray(token.assignedLocations) ? token.assignedLocations : [];

      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role || roles[0] || "user",
        roles,
        assignedLocations,
      };
      // Try to surface a friendly location id/name on the session so the UI
      // can show the current location without an extra client fetch.
      // assignedLocations may contain either location IDs (strings) or
      // location objects (with a `name` property). If we only have an ID and
      // an access token, fetch the location from the backend.
      try {
        if (Array.isArray(assignedLocations) && assignedLocations.length > 0) {
          const first = assignedLocations[0];
          // If it's an object with a name, use it directly
          if (first && typeof first === "object" && (first.name || first.displayName)) {
            session.user.locationId = first._id || first.id || first;
            session.user.locationName = first.name || first.displayName || "";
          } else if (typeof first === "string" && token.accessToken) {
            // Try to fetch the location details from the backend
            try {
              const locRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/locations/${first}`, {
                headers: { Authorization: `Bearer ${token.accessToken}` },
              });
              if (locRes.ok) {
                const locJson = await locRes.json().catch(() => null);
                if (locJson) {
                  session.user.locationId = locJson._id || locJson.id || first;
                  session.user.locationName = locJson.name || locJson.displayName || "";
                }
              } else {
                // fallback to the id only
                session.user.locationId = first;
              }
            } catch (e) {
              // ignore fetch errors and fall back to id-only
              session.user.locationId = first;
            }
          }
        }
      } catch (e) {
        // Do not block session creation if anything here fails
        console.warn("Failed to populate session locationName:", e?.message || e);
      }

      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google-auto-register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: user.id,
              picture: user.image,
            }),
          });
          return res.ok;
        } catch (_) {
          return true; // Allow login even if backend fails
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
});

export { handler as GET, handler as POST };
