from playwright.sync_api import sync_playwright, Playwright

def func(a, b):
    print(f"Action detected on element with ID: {b, a}")

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()

    # 暴露多个函数
    a = "1"
    b = 1
    context.expose_binding(
        "handleAction",
        lambda source, element_id: func(a, b)
    )
    context.expose_binding(
        "handleClick",
        lambda source, element_id: print(f"Click detected on element with ID: {element_id}")
    )

    page = context.new_page()

    # 添加初始化脚本，监听 click 事件并调用 handleAction 和 handleClick 函数
    context.add_init_script(
        r"""
        window.addEventListener("click", (event) => {
            // event.preventDefault(); // 阻止默认的点击行为
            window.handleAction(event.target.id);
            window.handleClick(event.target.id);
            // 重新触发点击事件
            // event.target.click();
        }, {capture: true});
        """
    )

    page.goto("https://playwright.dev/python/docs/api/class-browsercontext#browser-context-expose-binding")

    # 定位页面中的元素并模拟点击
    locator = page.locator("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a.navbar__brand")
    locator.click()

    # 关闭浏览器
    browser.close()

with sync_playwright() as playwright:
    run(playwright)