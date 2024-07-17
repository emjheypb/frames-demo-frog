/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";

const app = new Frog({
  basePath: "/api",
  title: "Frog",
});

app.frame("/", (c) => {
  const { buttonValue, status } = c;
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        {status === "initial"
          ? "Select your fruit!"
          : `Selected: ${buttonValue}`}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>,
    ],
  });
});
