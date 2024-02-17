import webpack from "webpack";
import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";

interface EvnVariables {
  mode: BuildMode;
  port: number;
}
export default (evn: EvnVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.ts"),
    html: path.resolve(__dirname, "public", "index.html"),
  };
  const config: webpack.Configuration = buildWebpack({
    port: evn.port ?? 3000,
    mode: evn.mode ?? "development",
    paths,
  });

  return config;
};
