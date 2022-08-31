import { ActionName } from "../types/entities/dynamic";

export const keyMap: Record<Exclude<ActionName, 'idle'>, string> = {
  forward: 'w',
  backward: 's',
  left: 'a',
  right: 'd'
}