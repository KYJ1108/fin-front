import axios, { AxiosResponse } from "axios";
import PatchBoardRequestDto from "./request/patch-board.request.dto";
import PostBoardRequestDto from "./request/post-board.request.dto";
import { DeleteBoardResponseDto, GetAllBoardResponseDto, GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from "./response/board";
import { ResponseDto } from "./response/response";

const DOMAIN = 'http://localhost:8080';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const GET_ALL_BOARD_URL = () => `${API_DOMAIN}/board/list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const PATCH_BOARD_URL = (boardId: number | string | undefined) => `${API_DOMAIN}/board/modify/${boardId}`;
const GET_BOARD_URL = (boardId: number | string | undefined) => `${API_DOMAIN}/board/detail/${boardId}`;
const DELETE_BOARD_URL = (boardId: number | string | undefined) => `${API_DOMAIN}/board/delete/${boardId}`;

const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } }
};

const responseHandler = <T>(response: AxiosResponse<any, any>) => {
    const responseBody: T = response.data;
    return responseBody;
};

const errorHandler = (error: any) => {
    if (!error.response || !error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
};

export const GetAllBoardRequest = async () => {
    const result = await axios.get(GET_ALL_BOARD_URL())
        .then(responseHandler<GetAllBoardResponseDto>)
        .catch(errorHandler);
    return result;
}
export const GetBoardRequest = async (boardId: number | string | undefined) => {
    const result = await axios.get(GET_BOARD_URL(boardId))
        .then(responseHandler<GetBoardResponseDto>)
        .catch(errorHandler);
    return result;
}
export const PostBoardRequest = async (requestBody: PostBoardRequestDto) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody)
        .then(responseHandler<PostBoardResponseDto>)
        .catch(errorHandler);
    return result;
}

export const DeleteBoardRequest = async (boardId: number | string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardId))
        .then((response: { data: DeleteBoardResponseDto; }) => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch((error: { response: any; data: ResponseDto; }) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.data;
            return responseBody;
        })
    return result;
}
export const PatchBoardRequest = async (boardId: number | string | undefined, requestBody: PatchBoardRequestDto) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardId), requestBody)
        .then(responseHandler<PatchBoardResponseDto>)
        .catch(errorHandler);
    return result;
}

