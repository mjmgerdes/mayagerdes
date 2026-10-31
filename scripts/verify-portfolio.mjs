import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = process.env.BASE_URL || "http://localhost:4174";
const output = process.env.SCREENSHOT_DIR || "/tmp/portfolio-ui-check";
const names = ["Praxigen", "Relage", "Praxess", "NeurTalk", "Startup CRM", "Gordon", "grndwork", "ForeverData"];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];

async function open(viewport, reducedMotion = "no-preference", path = "/") {
  const page = await browser.newPage({ viewport, reducedMotion });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  return page;
}

async function jump(page, id, progress = 0) {
  await page.evaluate(({ id, progress }) => {
    const section = document.getElementById(id);
    const top = window.scrollY + section.getBoundingClientRect().top;
    const target = top + Math.max(0, section.offsetHeight - innerHeight) * progress;
    if (window.mayaLenis) window.mayaLenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target, behavior: "instant" });
  }, { id, progress });
  await page.waitForTimeout(300);
}

async function checkOverflow(page) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "Page overflows horizontally");
}

try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [1440, 650], [1024, 768], [901, 650], [768, 1024], [390, 844], [320, 740]]) {
    const page = await open({ width, height });
    const pinned = width >= 901 && height >= 640;
    assert.deepEqual(await page.locator(".work-title h3").allTextContents(), names);
    assert.equal(await page.locator("#work").evaluate(el => el.classList.contains("is-pinned")), pinned);
    assert.match(await page.locator(".intro-presence").innerText(), /University of Michigan/);
    assert.match(await page.locator(".intro-notes").innerText(), /Genetics \+ consciousness \+ tech/);
    await checkOverflow(page);
    await page.screenshot({ path: `${output}/intro-${width}-${height}.png` });
    await jump(page, "work");
    await page.screenshot({ path: `${output}/work-${width}-${height}.png` });
    if (pinned) {
      for (let index = 0; index < names.length; index++) {
        await jump(page, "work", index / (names.length - 1));
        const bounds = await page.locator(".work-project").nth(index).evaluate(el => {
          const preview = el.querySelector(".work-preview").getBoundingClientRect();
          const caption = el.querySelector(".work-caption").getBoundingClientRect();
          const progress = document.querySelector(".work-progress").getBoundingClientRect();
          const image = el.querySelector("img");
          return { imageHeight: preview.height, overlap: preview.bottom > caption.top + 1, clipped: caption.bottom > progress.top - 8, loaded: image.complete && image.naturalWidth > 0 };
        });
        assert.ok(bounds.imageHeight >= 160, `${width}x${height}: ${names[index]} preview too short`);
        assert.equal(bounds.overlap || bounds.clipped, false, `${width}x${height}: ${names[index]} overlap: ${JSON.stringify(bounds)}`);
        assert.ok(bounds.loaded, `${names[index]} image not loaded`);
        assert.equal(await page.locator(".rail-progress-current").innerText(), String(index + 1).padStart(2, "0"));
      }
      await jump(page, "work");
      await page.getByRole("button", { name: "Next project", exact: true }).click();
      await page.waitForTimeout(1100);
      assert.equal(await page.locator(".rail-progress-current").innerText(), "02");
      await page.getByRole("button", { name: "Previous project", exact: true }).click();
      await page.waitForTimeout(1100);
      assert.equal(await page.locator(".rail-progress-current").innerText(), "01");
    }
    await jump(page, "personal");
    await page.screenshot({ path: `${output}/personal-${width}-${height}.png` });
    await page.locator(".gallery-navigation button").nth(2).click();
    await page.waitForTimeout(1100);
    const flip = page.locator(".gallery-media .personal-image-flip");
    await flip.click();
    await page.waitForTimeout(700);
    assert.equal(await flip.getAttribute("aria-pressed"), "true");
    await page.screenshot({ path: `${output}/drawing-${width}-${height}.png` });
    if (pinned) {
      const bottom = await page.locator(".gallery-item-2 .gallery-caption").evaluate(el => el.getBoundingClientRect().bottom);
      const nav = await page.locator(".gallery-navigation").boundingBox();
      assert.ok(bottom < nav.y - 4, `${width}x${height}: gallery caption overlaps navigation (${bottom}, ${nav.y})`);
    }
    await checkOverflow(page);
    console.log(`PASS ${width}x${height}: content, layout, project navigation, gallery flip`);
    await page.close();
  }

  const reduced = await open({ width: 1440, height: 900 }, "reduce");
  assert.equal(await reduced.locator(".is-pinned").count(), 0);
  await reduced.locator(".intro-personal-link").click();
  await reduced.locator(".gallery-navigation button").nth(2).click();
  await reduced.locator(".gallery-media .personal-image-flip").click();
  assert.equal(await reduced.locator(".gallery-media .personal-image-flip").getAttribute("aria-pressed"), "true");
  console.log("PASS reduced-motion: normal document flow and functional gallery");
  await reduced.close();

  const keyboard = await open({ width: 1440, height: 900 });
  await jump(keyboard, "work");
  await keyboard.locator(".work-project").first().locator(".work-links a").last().focus();
  await keyboard.keyboard.press("Tab");
  await keyboard.waitForTimeout(1100);
  assert.equal(await keyboard.locator(":focus").getAttribute("aria-label"), "Open Relage");
  assert.equal(await keyboard.locator(".rail-progress-current").innerText(), "02");
  assert.equal(await keyboard.locator(".work-stage").evaluate(el => el.scrollLeft), 0);
  await jump(keyboard, "experience");
  await keyboard.getByRole("tab", { name: "Work", exact: true }).focus();
  await keyboard.keyboard.press("ArrowRight");
  assert.equal(await keyboard.getByRole("tab", { name: "Research", exact: true }).getAttribute("aria-selected"), "true");
  await keyboard.keyboard.press("End");
  assert.equal(await keyboard.getByRole("tab", { name: "Honors + Awards", exact: true }).getAttribute("aria-selected"), "true");
  await jump(keyboard, "personal");
  const drawing = keyboard.locator(".gallery-media .personal-image-flip");
  await drawing.focus();
  await keyboard.waitForTimeout(1100);
  const bounds = await drawing.boundingBox();
  assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 1440, "Focused drawing must be visible");
  await keyboard.keyboard.press("Enter");
  assert.equal(await drawing.getAttribute("aria-pressed"), "true");
  await keyboard.close();
  console.log("PASS keyboard: project traversal, experience tabs, gallery focus and flip");

  for (const path of ["/", "/me", "/resume"]) {
    const page = await open({ width: 390, height: 844 }, "no-preference", path);
    await checkOverflow(page);
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("button", { name: "Open navigation" }).count(), 1);
    await page.screenshot({ path: `${output}/${path.replaceAll("/", "") || "home"}-mobile.png`, fullPage: path !== "/" });
    await page.close();
    console.log(`PASS ${path}: mobile layout and navigation`);
  }
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(`All checks passed. Screenshots: ${output}`);
} finally {
  await browser.close();
}
