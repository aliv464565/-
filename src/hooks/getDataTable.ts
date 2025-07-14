'use client';
import {
    CreateFormImageitem,
    Createitem,
    deleteItem,
    getDataItem,
    getDataSeletore,
    getDataTable,
    UpdateFormImageItem,
    UpdateItem,
} from '@/utils/funcReactQueryGetData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export function useGetDataTables({
    url,
    title,
    search,
    page,
    rowsPerPage,
}: {
    url: string;
    title: string;
    search: string;
    page: number;
    rowsPerPage: string;
}) {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryKey: [title, search, page, rowsPerPage],
        queryFn: () => getDataTable({ url, search, rowsPerPage, page }),
        placeholderData: preData => preData,
    });
    queryClient.prefetchQuery({
        queryKey: [title, search, page + 1, rowsPerPage],
        queryFn: () => getDataTable({ url, search, rowsPerPage, page: page + 1 }),
    });
    queryClient.prefetchQuery({
        queryKey: [title, search, page - 1, rowsPerPage],
        queryFn: () => getDataTable({ url, search, rowsPerPage, page: page - 1 }),
    });
    return { data, error, isLoading };
}
export function useCrodItem({
    api,
    id,
    requestKey,
    status,
}: {
    api: string;
    id?: number;
    requestKey?: string;
    status: string;
}) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (newData: unknown) => {
            if (status === 'createImage') {
                return CreateFormImageitem({ api, newData });
            } else if (id && status === 'updateImage') {
                return UpdateFormImageItem({ id, api, newData });
            } else if (id && status === 'update') return UpdateItem({ api, id, newData });
            else if (id && status === 'delete') return deleteItem({ api, id });
            else return Createitem({ api, newData });
        },
        onSuccess() {
            if (requestKey) {
                queryClient.invalidateQueries({ queryKey: [requestKey], exact: false });
            }
        },
    });
    return { mutate };
}
export function useGetDataItem({ api, title }: { api: string; title: string }) {
    const { data, isLoading } = useQuery({
        queryKey: [title],
        queryFn: () => getDataItem({ api }),
    });
    return { data, isLoading };
}
export function useGetDataSelector({
    api,
    search,
    title,
}: {
    api: string;
    search: string;
    title: string;
}) {
    const { data, isLoading } = useQuery({
        queryKey: [title, search],
        queryFn: () => getDataSeletore({ api, search }),
    });
    return { data, isLoading };
}
// export function useCreateItem({urlApi,
//     id}:{urlApi:string,id:number}) {
//     const {} = useMutation({
//         mutationKey: [],
//         mutationFn,
//     });
// }
