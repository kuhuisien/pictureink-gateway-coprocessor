const express = require("express");
const validateGoogleToken = require("./authUtil");

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

app.post("/", async (req, res) => {
  const { headers } = req.body;
  // Extract token after "Bearer"
  const token = headers.authorization?.[0]?.split(" ")?.[1];

  const isValid = await validateGoogleToken(token);

  if (!isValid) {
    res.json({
      ...req.body,
      control: { break: 401 },
    });
  } else {
    res.json({
      ...req.body,
      control: "continue",
      headers,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
