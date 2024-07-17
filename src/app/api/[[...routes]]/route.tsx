/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput, TextInputProps } from "frog";
import { handle } from "frog/next";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { pinata } from "frog/hubs";
import { neynar } from "frog/middlewares";

const app = new Frog({
  basePath: "/api",
  title: "Frog",
  hub: pinata(),
}).use(
  neynar({
    apiKey: "NEYNAR_FROG_FM",
    features: ["interactor", "cast"],
  })
);

app.frame("/", (c) => {
  const { buttonValue, status, frameData, inputText } = c;

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          fontSize: 60,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {status === "initial"
          ? "Select your fruit!"
          : `${frameData?.fid.toString()} selected ${buttonValue}`}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
      <Button action="/neynar">Neynar</Button>,
    ],
  });
});

app.frame("/neynar", (c) => {
  const { buttonValue, status, inputText } = c;
  const { displayName, followerCount, pfpUrl } = c.var.interactor || {};

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          fontSize: 60,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img src={pfpUrl} style={{ width: 200, height: 200 }} />
        {status === "initial"
          ? "Select your fruit!"
          : `${displayName} selected ${buttonValue}`}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
      <Button action="/">Home</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
