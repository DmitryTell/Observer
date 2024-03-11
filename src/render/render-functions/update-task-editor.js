import tasks_editor from "../../templates/tasks_editor.pug";
import { handleOpenTaskEditor } from "../../components/tasks/open-task-editor.js";
import { handleSendTasks } from "../../components/tasks/send-tasks.js";
import { handleNotion } from "../../components/tasks/notion.js";

export const updateTaskEditor = (context) => {
    const tasksEditorElement = document.getElementById("task-editor");

    if (tasksEditorElement) {
        tasksEditorElement.innerHTML = tasks_editor({ context });

        handleOpenTaskEditor();
        handleSendTasks();
        handleNotion();
    }
};