
import { ResponseCode, ResponseMessage } from "../../types/enums/enums";
import Board from "../../types/interface/board.interface";

export default interface ResponseDto {
    code: ResponseCode;
    message: ResponseMessage;
    boardList: Board[];
    board: Board;
    boards: Board[];
}