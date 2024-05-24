import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { basicLogger } from "launchdarkly-js-client-sdk";
import { faker } from '@faker-js/faker';

const clientSideID = process.env.REACT_APP_CLIENT_ID;

(async () => {
  const LDProvider = await initLD({
    clientSideID,
    context: createRandomUser(true),
  });
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );
})();

async function initLD({ clientSideID, context }) {
  return asyncWithLDProvider({
    clientSideID,
    options: {
      logger: basicLogger({
        level: "info",
      }),

      evaluationReasons: true,
      sendEvents: true,
      sendEventsOnlyForVariation: false,
      fetchGoals: true,
      diagnosticOptOut: false,
      application: {
        version: "1.0.0",
        id: "vite-react-demo",
      },
    },
    context,
    reactOptions: { sendEventsOnFlagRead: true, useCamelCaseFlagKeys: true },
  });
}

function createRandomUser(anonymous = false) {
  const user = {
    kind: "multi",
    user: {
      key: faker.string.uuid(),
      name: faker.person.fullName(),
      state: faker.location.state(),
      city: faker.location.city(),
      country: faker.location.country(),
      anonymous,
    },
    animal: {
      key: faker.animal.bird(),
      type: faker.animal.type(),
    },
    application: {
      key: faker.helpers.arrayElement([
        "webapp",
        "mobile",
        "IOT",
      ]),
      version: faker.system.semver(),
    },
  };

  return user;
}