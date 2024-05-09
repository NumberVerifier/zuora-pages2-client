# Zuora Unoffical Typescript SDK v2
This is an unofficial typescript for Zuora Pages 2.0.

https://knowledgecenter.zuora.com/Zuora_Payments/Payment_Page_and_Payment_Link/Payment_Pages_2.0/AA_Overview_Payment_Pages_2.0

### Install 
 npm install --save "git://github.com/NumberVerifier/zuora-pages2-client.git"

### Use in React 
See playground/src/pages/index.tsx for example

### Next.js
To get this to run in Next.js, 
Add the following to next.config.mjs
```typescript
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["zuora-pages2-client"],
  webpack: (config) => {
      config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom")
    };
    return config;
  },
};
```