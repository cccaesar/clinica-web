import List, { ItemInterface } from "../components/list";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Pagination({ entityName }: { entityName: string }) {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ItemInterface[]>([]);

  const anchorClass: string =
    'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50';

    const fetchData = useCallback(async (newPage: number) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/${entityName}/`, { params: { page: newPage } });
        setItems(res.data || []);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }, [page, entityName]);
  
    useEffect(() => {
      fetchData(page);
    }, [fetchData]);

  return (
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <List items={items} />
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between">
          <button
            className={page === 0 ? `${anchorClass} disabled` : anchorClass}
            onClick={async () => {
              setPage((prevPage) => {
                const newPage = prevPage - 1;
                fetchData(newPage);
                return newPage;
              });
            }}
          >
            Anterior
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={async () => {
              setPage((prevPage) => {
                const newPage = prevPage + 1;
                fetchData(newPage);
                return newPage;
              });
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}