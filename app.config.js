module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "",
      enableDemoAccess: process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS || "false",
    },
  };
};
