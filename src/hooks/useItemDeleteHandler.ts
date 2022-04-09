import React from "react";

type ItemDeleteStatus = "ask" | "confirm" | "cancel";

type ItemDeleteHandler = (item: string) => void;

export type ItemDeleteHandlerType = (
  id: string,
  status: "ask" | "confirm" | "cancel"
) => void;

export function useItemDeleteHandler(handler: ItemDeleteHandler) {
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const handleDelete = React.useCallback(
    (id: string, status: ItemDeleteStatus) => {
      switch (status) {
        case "ask": {
          setItemToDelete(id);
          break;
        }

        case "confirm": {
          handler(id);
          setItemToDelete(null);
          break;
        }

        case "cancel": {
          setItemToDelete(null);
          break;
        }

        default:
          break;
      }
    },
    [handler]
  );

  return { itemToDelete, handleDelete };
}
