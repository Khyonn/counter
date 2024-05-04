import { For, createEffect, type Component } from "solid-js";
import { createStore } from "solid-js/store";
import Chart from "./components/Chart.svg";
import TaskItem from "./components/TaskItem";

const App: Component = () => {
  const [counters, setCounters] = createStore<
    Record<string, undefined | { emoji: string; name: string; count: number }>
  >({});

  createEffect(() => {
    Object.entries(counters).forEach(([key, value]) => {
      if (value?.count && value.count < 0) {
        setCounters(key, undefined);
      }
    });
  });

  return (
    <>
      <div class="flex flex-col h-full gap-4">
        <div class="flex flex-col items-center gap-2">
          <img src={Chart} alt="" />
          <p class="text-white font-semibold text-xl">Vous en faites beaucoup</p>
        </div>
        <section class="grow bg-white px-2 py-4 rounded-t-md flex flex-col justify-between shadow-md">
          <h2 class="sr-only">Tâches</h2>
          <nav>
            <ul class="grid grid-cols-2 bg-gray-400 rounded-xl font-semibold">
              <li>
                <a class="rounded-lg flex justify-center items-center p-2 bg-gray-200 w-full" href="#">
                  Moi
                </a>
              </li>
              <li>
                <a class="rounded-lg flex justify-center items-center p-2 text-gray-50" href="#">
                  Elle
                </a>
              </li>
            </ul>
          </nav>
          <div class="grow flex flex-col gap-4">
            <div class="grow overflow-y-auto mt-4">
              <ul class="grid gap-4">
                <For each={Object.entries(counters)}>
                  {([counterName, counterItem]) => (
                    <TaskItem
                      increment={() => setCounters(counterName, "count", (old) => (old ?? 0) + 1)}
                      decrement={() => setCounters(counterName, "count", (old) => (old ?? 0) - 1)}
                      item={counterItem!}
                    />
                  )}
                </For>
              </ul>
            </div>
            <button
              class="w-full h-16 bg-blue-500 text-white text-xl font-bold rounded-md"
              onClick={() => {
                document.querySelector("dialog")?.showModal();
              }}
            >
              Ajouter un tâche
            </button>
          </div>
        </section>
      </div>
      <dialog
        class="rounded-md"
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            event.currentTarget.close();
          }
        }}
      >
        <form
          class="grid gap-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            setCounters(formData.get("task_name") as string, {
              count: 0,
              emoji: formData.get("task_emoji") as string,
              name: formData.get("task_name") as string,
            });
          }}
        >
          <div class="grid gap-2">
            <label for="task_emoji">Emoji</label>
            <input class="rounded border px-2 py-1" id="task_emoji" name="task_emoji" type="text" required />
          </div>

          <div class="grid gap-2">
            <label for="task_name">Nom de la tâche</label>
            <input class="rounded border px-2 py-1" id="task_name" name="task_name" type="text" required />
          </div>

          <button class="bg-blue-600 text-white py-2" type="submit">
            Ajouter
          </button>
        </form>
      </dialog>
    </>
  );
};

export default App;
