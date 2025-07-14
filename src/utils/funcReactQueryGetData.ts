import axiosConfig from '@/helpers/axiosConfig';
export async function getDataTable({
    url,
    search,
    rowsPerPage,
    page,
}: {
    url: string;
    search: string;
    rowsPerPage: string;
    page: number;
}) {
    const data = await axiosConfig.get(url, {
        params: {
            search,
            page: +page,
            first: rowsPerPage,
        },
    });
    return data.data;
}
export async function Createitem({ api, newData }: { api: string; newData: unknown }) {
    const data = await axiosConfig.post(api + '/store', newData);
    return data.data.data;
}
export async function UpdateItem({
    api,
    id,
    newData,
}: {
    api: string;
    id: number;
    newData: unknown;
}) {
    const data = await axiosConfig.put(`${api}/update/${id}`, newData);
    return data.data.data;
}
export async function getDataItem({ api }: { api: string }) {
    const data = await axiosConfig.get(api);
    return data.data.data;
}
export async function deleteItem({ api, id }: { api: string; id: number }) {
    const data = await axiosConfig.delete(`${api}/destroy/${id}`);
    return data.data;
}

////image
export async function CreateFormImageitem({ api, newData }: { api: string; newData: unknown }) {
    const data = await axiosConfig.post(api + '/store', newData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data.data;
}
export async function UpdateFormImageItem({
    api,
    id,
    newData,
}: {
    api: string;
    id: number;
    newData: unknown;
}) {
    const data = await axiosConfig.post(`${api}/update/${id}`, newData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data.data;
}
export async function getDataSeletore({ api, search }: { api: string; search: string }) {
    const data = await axiosConfig.get(api, { params: { search } });
    return data.data;
}
