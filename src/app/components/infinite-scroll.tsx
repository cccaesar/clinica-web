import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useInfiniteList } from "./infinite-list";

export interface InfiniteSelectInterface {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    options: string[];
    url: string;
}

export default function InfiniteScroll({ url, label, placeholder, name }: { url: string, label: string, placeholder: string, name: string }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { items, hasMore, isLoading, onLoadMore } = useInfiniteList({ url });

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore,
    });

    return (
        <Select
            className="sm:col-span-3 mt-2"
            isLoading={isLoading}
            items={items}
            label={label}
            placeholder={placeholder}
            scrollRef={scrollerRef}
            name={name}
            selectionMode="single"
            onOpenChange={setIsOpen}
        >
            {(item) => (
                <SelectItem key={item.cpf || item.crm} className="capitalize">
                    {item.nome}
                </SelectItem>
            )}
        </Select>
    );
}
