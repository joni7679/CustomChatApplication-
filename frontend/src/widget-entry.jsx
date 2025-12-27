import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "./components/ChatWidget";
import "./index.css";

(function () {
    if (window.__MY_CHAT_WIDGET__) return;
    window.__MY_CHAT_WIDGET__ = true;

    const div = document.createElement("div");
    div.id = "chat-widget-root";
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.right = "20px";
    div.style.zIndex = "999999";

    document.body.appendChild(div);
    createRoot(div).render(<ChatWidget />);
})();
