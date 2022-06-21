import assert from "assert/strict";
import path from "path";
import url from "url";

import { AppError } from "../utils/errors.js";
import { GarbageDetector } from "../utils/od/garbageDetector.mjs";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** 테스트를 수행하고 성공 여부를 객체로 반환합니다. */
const main = async () => {
  const result = {};

  // 1. 말도 안되는 경로를 집어넣고 에러를 제대로 내는지 봅니다.
  console.info(`Testing sanity check functionality\n\n`);
  try {
    new GarbageDetector(`ham/jam/spam.eggs`);
    console.warn(`FAIL: didn't error out`);
  } catch (error) {
    if (error instanceof AppError) {
      console.info(`Don't panic, everything is under control`);
      result[`Sanity check test`] = true;
    } else {
      result[`Sanity check test`] = false;
    }
    console.info(error);
  }
  console.log(`\n\n`);

  // 2. 모델을 만듭니다.
  let gd;
  try {
    const modelPath = path.resolve(
      __dirname,
      `..`,
      //   `utils/od/gdmodel/weights/last_web_model/model.json`,
      `utils/od/gdmodel/weights/last_saved_model`
    );
    console.info(`model's absolute path is "${modelPath}"`);
    gd = new GarbageDetector(modelPath);
    await gd.init();
    console.info(gd);
    console.log(`\n\n`);
    result[`Model loading test`] = true;
  } catch (error) {
    result[`Model loading test`] = false;
    return result;
  }
};

main().then((res) => console.info(res));
