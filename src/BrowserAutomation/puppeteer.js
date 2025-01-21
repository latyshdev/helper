const logger = require('./../logger');
const {pause} = require('./../time');
/* ========================================================================= */
async function CreateBrowser(BOT, params){
  logger.log(`[PUPPETEER] | CreateBrowser | ${BOT._id}`);
  BOT.browser = await connectWs(params);
  logger.log(BOT.browser);
  // await connectWs(params);
  if (BOT.browser === false) {
    return false;
  } else {
    logger.log(`[PUPPETEER] | CreateBrowser | ${BOT._id} | READY`);
    let pages = await BOT.browser.pages();
    while (pages.length === 0) {
      pages = await BOT.browser.pages();
      await pause(300);
    }
    return BOT.browser;
  }
}

/* ========================================================================= */
async function connectWs(params) {
  logger.log("[PUPPETEER] | connectWs");
  // logger.log(params);
  try {
    const puppeteer = require('puppeteer-core');
    // RecaptchaPlugin
    return await puppeteer.connect(params);
    // logger.log(browser);
    // logger.log("connectWs ready");
    return browser;
  } catch (err) {
    logger.log("[PUPPETEER] | ERROR: " + err.message);
    logger.error(err);
    return false;
  }

}

/* ========================================================================= */
async function xPathExist(page, xPath) {
  try {
    let element = false;
    element  = await page.$('xpath/' + xPath);
    return (element) ? element : false;
  } catch (err) {
    logger.warn("[PUPPETEER] | xPathExist: " + err.message)
    logger.error(err);
  }
}

/* ========================================================================= */
async function xPathExistObject(page, xPathObject) {
  const result = {};
  for (let xPath in xPathObject){
      result[xPath] = await xPathExist(page, xPathObject[xPath]);
  };
  return result;
}


/* ========================================================================= */
async function elementInnerText(page, element){
  return await page.evaluate((element)=>{
    return element.innerText
  }, element);
}

/* ========================================================================= */
async function elementTextContent(page, element){
  return await page.evaluate((element)=>{
    return element.textContent
  }, element);
}

/* ========================================================================= */
async function elementScrollByConsole(page, element, range){
  if (!element) return null;
  logger.log("[PUPPETEER] | ELEMENT:", element, range);
  return await page.evaluate(
      (element, range) => {
          // logger.log("elementScrollByConsole:", element);
          element.scrollBy(0, range)
      }, element, range
  )
};

/* ========================================================================= */
async function elementScrollIntoViewConsole(page, element, range){
  if (!element) return null;
  // logger.log("[PUPPETEER] | ELEMENT:", element, range);
  return await page.evaluate(
      (element, range) => {
          // logger.log("elementScrollByConsole:", element);
          element.scrollIntoView(0)
      }, element, range
  )
};

/* ========================================================================= */
async function clickElementByConsole (page, element) {
  return await page.evaluate((element)=> {element.click()}, element);
}

/* ========================================================================= */
async function clickElementByLib (element) {
  try {
      // TODO: check clicked ? then.(result => true) ??
    return await element.click();
  } catch {
    return false;
  }
}

/* ========================================================================= */
async function fillInInputWithoutCheck (input, value) {
  await input.click({clickCount: 3});
  await input.focus();
  await input.type(String(value));
}

/* ========================================================================= */
async function fillInInputWithCheck (page, input, value) {
  let input_value =  await elementValue(page, input);
  let input_innerText = await elementInnerText(page, input);
  let inputIsOK = input_value === value || input_innerText === value;

  value = value.replaceAll("\r", "").replaceAll("\n", "");

  while (!inputIsOK) {
    await input.click({clickCount: 3});
    await input.focus();
    await input.type(String(value));
    input_value =  await elementValue(page, input);
    input_innerText = await elementInnerText(page, input);
    logger.log("input_value", input_value);
    logger.log("input_innerText", input_innerText);

    if (input_value) {
      input_value = input_value.replaceAll("\r", "").replaceAll("\n", "");
    }

    if (input_innerText) {
      input_innerText = input_innerText
        .replaceAll("\r", "")
        .replaceAll("\n", "");
    };

    inputIsOK = input_value === value || input_innerText === value;
    logger.log(inputIsOK, JSON.stringify(input_value), JSON.stringify(input_innerText), value);
    await pause(500);
  }
  return true;
  // @TODO:: eternal while?
}

/* ========================================================================= */
async function elementValue (page, element) {
  return await page.evaluate((element)=> { return element.value}, element);
}

/* ========================================================================= */
// puppeteer exports
exports.CreateBrowser = CreateBrowser;
exports.connectWs = connectWs;
exports.xPathExist = xPathExist;
exports.xPathExistObject = xPathExistObject;
exports.elementInnerText = elementInnerText;
exports.elementValue = elementValue;
exports.elementTextContent = elementTextContent;
exports.elementScrollByConsole = elementScrollByConsole;
exports.elementScrollIntoViewConsole = elementScrollIntoViewConsole;
exports.clickElementByConsole = clickElementByConsole;
exports.clickElementByLib = clickElementByLib;
exports.fillInInputWithoutCheck = fillInInputWithoutCheck;
exports.fillInInputWithCheck = fillInInputWithCheck;

// @TODO click with gcursor ?? 123