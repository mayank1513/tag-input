"use strict";
import fs from "fs";
import path from "path";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf-8")
);
if (process.env.TOKEN) {
  const { Octokit } = require("octokit");
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.TOKEN,
  });

  const octoOptions = {
    owner: process.env.OWNER,
    repo: process.env.REPO,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
  octokit
    .request("GET /repos/{owner}/{repo}/topics", octoOptions)
    .then(({ data }) => {
      octoOptions.names = [
        ...new Set([...data.names, ...packageJson.keywords]),
      ];
      if (octoOptions.names.length !== data.names.length)
        octokit
          .request("PUT /repos/{owner}/{repo}/topics", octoOptions)
          .then(console.log) // eslint-disable-line no-console -- intentional debug log
          .catch(console.error); // eslint-disable-line no-console -- intentional error log
    });
}
delete packageJson.devDependencies;
delete packageJson.dependencies;
delete packageJson.scripts;

packageJson.main = "TagInput.umd.mjs";
packageJson.module = "TagInput.js";
packageJson.types = "TagInput.vue.d.ts";

const outDir = path.resolve(process.cwd(), "dist", "lib");

fs.writeFileSync(
  path.resolve(outDir, "package.json"),
  JSON.stringify(packageJson, null, 2)
);

fs.copyFileSync(
  path.resolve(process.cwd(), "README.md"),
  path.resolve(outDir, "README.md")
);

fs.rename(
  path.resolve(outDir, "TagInput.umd.cjs"),
  path.resolve(outDir, "TagInput.umd.mjs"),
  () => {}
);
