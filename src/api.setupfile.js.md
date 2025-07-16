/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

//🔧 How to Use This Config in Your Setup Script
import config from "./api.transport.config.js";
import { TransportRegistry } from "./core/TransportRegistry";
import { AxiosTransport } from "./transport/AxiosTransport";
import { GraphQLTransport } from "./transport/GraphQLTransport";

const transportMap = {
  axios: AxiosTransport,
  graphql: GraphQLTransport,
};

TransportRegistry.setDefault(
  new transportMap[config.defaultTransport.type](),
  config.defaultTransport.baseUrl,
);

Object.entries(config.transports).forEach(([name, cfg]) => {
  const Strategy = transportMap[cfg.type];
  TransportRegistry.register(name, new Strategy(), cfg.baseUrl);
});

/**
 * Now your entire transport setup is configuration-driven, portable, and easily testable. Want to support env-specific config merging next (e.g., config.dev.js, config.prod.js) or help wrap this into a CLI tool to scaffold all files from config? You're turning this into a micro-library ecosystem. Let’s push it further.
 */
