import express from "express";
import path from "path";

const app = express();

const port = 9000;

app.use(express.static("./build"));

/**
 * @route GET *
 * @description Serve personal site
 * @access  Public
 */
app.get("*", async (_req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
