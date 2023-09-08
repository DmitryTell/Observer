"use strict";

import "./css/main.css";
import { getContext } from "./components/context.js";
import { renderApp } from "./components/render.js";
import { getStatus, getCode, updateRoom, updateCode } from "./socket-events.js";
import { getFiletree } from "./components/filetree.js";
import hljs from "./hljs";
import { checkActiveFiles } from "./components/active-files.js";

export const appElement = document.querySelector("#app");
export const codeElement = document.querySelector("code");
export const context = getContext();

renderApp(appElement, context);
getStatus((status, log) => {
    context.isOnline = status;
    context.hostName = `${log.message.split(" ")[0]} ${
        log.message.split(" ")[1]
    }`;

    renderApp(appElement, context);
});
updateRoom((isStart, data) => {
    context.isStart = isStart;
    context.room = data;
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        } else {
            user.isActive = false;
        }
    });

    if (!context.room.users.find((user) => user.isActive)) {
        context.filetree = null;
        context.code = null;
    }

    renderApp(appElement, context);
    checkActiveFiles(context, (areActiveFiles) => {
        if (areActiveFiles) hljs.highlightAll(codeElement);
    });
});
getCode((data) => {
    context.code = null;
    context.files = data.files;
    context.filetree = getFiletree(data.files);
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        } else {
            user.isActive = false;
        }
    });

    renderApp(appElement, context);
});
updateCode((data) => {
    context.files = [...context.files, data.files[0]];

    console.log(context);
});
