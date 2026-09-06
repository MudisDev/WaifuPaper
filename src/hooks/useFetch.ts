import React from "react";

type Metodo = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseFetchProps<TParams> {
  endpoint: string;
  metodo: Metodo;
  params?: TParams;
}

interface ErrorFetch {
  status?: number;
  Error?: string;
  [key: string]: unknown;
}

export const useFetch = <TData = unknown, TParams = unknown>
  ({ endpoint, metodo, params = {} as TParams, }: UseFetchProps<TParams>) => {

  const [data, setData] = React.useState<TData | null>(null);
  const [error, setError] = React.useState<ErrorFetch | Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchData = async (newParams: TParams = params): Promise<TData | undefined> => {
    try {
      setLoading(true);
      setError(null);

      let url = endpoint;

      const opciones: RequestInit = {
        method: metodo,
      };

      if (metodo === "GET") {
        const query = new URLSearchParams(
          newParams as Record<string, string>
        );

        if (query.toString()) {
          url = `${endpoint}?${query.toString()}`;
        }
      } else {
        opciones.headers = {
          "Content-Type": "application/json",
        };

        opciones.body = JSON.stringify(newParams);
      }

      const response = await fetch(url, opciones);

      const texto = await response.text();

      console.log("Respuesta RAW del servidor:", texto);

      let json: unknown;

      try {
        json = JSON.parse(texto);
      } catch {
        throw new Error(
          `El servidor no devolvió JSON válido: ${texto}`
        );
      }

      if (!response.ok) {
        const errorData: ErrorFetch = {
          status: response.status,
          ...(typeof json === "object" && json !== null
            ? json
            : {}),
        };

        setError(errorData);

        return undefined;
      }

      setData(json as TData);

      return json as TData;
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Error desconocido");

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};