/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { handle } from "frog/next";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { pinata } from "frog/hubs";

const app = new Frog({
  basePath: "/api",
  title: "Frog",
  hub: pinata(),
});

app.frame("/", (c) => {
  const { buttonValue, status, frameData, verified, inputText } = c;

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
          : `${frameData?.fid} Selected ${buttonValue} and typed in "${inputText}"`}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your fruit..." />,
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
