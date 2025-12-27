(function () {
    if (window.__CHAT_WIDGET_LOADED__) return;
    window.__CHAT_WIDGET_LOADED__ = true;

    const iframe = document.createElement("iframe");
    iframe.src = "http://localhost:3000/widget-app";
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "380px";
    iframe.style.height = "520px";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";

    document.body.appendChild(iframe);
})();
