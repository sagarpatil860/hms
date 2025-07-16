const COMMON_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN || "fallback-token"}`,
};

module.exports = {
  defaultTransport: {
    name: "default",
    type: "axios",
    baseUrl: "https://api.default.com",
  },
  transports: {
    auth: {
      type: "axios",
      baseUrl: "https://auth.service.com",
    },
    graphql: {
      type: "graphql",
      baseUrl: "https://graphql.service.com/graphql",
    },
    catalog: {
      type: "axios",
      baseUrl: "https://catalog.service.com/v2",
    },
  },
  headers: COMMON_HEADERS,
};

/**
 * You can extend this with:

timeout

retry

custom requestModifier functions if needed later
 */
