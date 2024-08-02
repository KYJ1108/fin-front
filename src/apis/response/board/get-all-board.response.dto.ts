import Board from "../../../types/interface/board.interface";
import ResponseDto from "../response.dto";



export default interface GetAllBoardResponseDto extends ResponseDto, Board {
    // boards: Board[];
}