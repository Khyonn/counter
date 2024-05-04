export default function TaskItem(props: {
  increment: () => void;
  decrement: () => void;
  item: { emoji: string; name: string; count: number };
}) {
  return (
    <li class="h-20 bg-gray-300 rounded-md flex justify-between p-4">
      <div class="flex items-center gap-4">
        <span aria-hidden class="inline-flex justify-center items-center aspect-square rounded-md bg-white p-2">
          {props.item.emoji}
        </span>
        <span class="font-semibold">{props.item.name}</span>
      </div>
      <div class="flex justify-end items-center gap-4">
        <input class="rounded bg-white w-[5ch] text-center py-1 px-2" value={props.item.count} readOnly />
        <div class="grid gap-1">
          <button
            class="text-white bg-green-600 rounded-lg aspect-square p-1 inline-flex justify-center items-center"
            onClick={props.increment}
          >
            +
          </button>
          <button
            class="text-white bg-red-600 rounded-lg aspect-square p-1 inline-flex justify-center items-center"
            onClick={props.decrement}
          >
            -
          </button>
        </div>
      </div>
    </li>
  );
}
