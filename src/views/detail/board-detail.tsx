import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteBoardRequest, GetBoardRequest } from "../../apis/apis";
import { DeleteBoardResponseDto } from "../../apis/response/board";
import ResponseDto from "../../apis/response/response.dto";
import Board from "../../types/interface/board.interface";
import './style.css';

export default function BoardDetailPage() {
    const navigate = useNavigate();
    const { boardId } = useParams();
    const [board, setBoard] = useState<Board | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await GetBoardRequest(boardId);
                console.log(response)
                if(!response) return;
                const { title, content } = response.board;
                if (!title || !content ) {
                throw new Error("Invalid response structure");
                }
                setBoard(response.board);
                setLoading(false);
            } catch (error) {
                console.error("정보를 불러오는 중 오류가 발생했습니다.", error);
                setLoading(false);
            }
        }
        fetchBoard();
    }, [boardId]);

    const updatePostClickHandler = (boardId: number | string | undefined) => {
        if (!boardId) return;
        navigate(`/modify/${boardId}`);
    }
    
    const deletePostClickHandler = (boardId: number | string | undefined) => {
        if (!window.confirm("삭제하시겠습니까?")) {
            return;
        }if (!boardId) {
            alert("해당 문의가 없습니다.");
            return;
        }
        DeleteBoardRequest(boardId).then(deleteBoardResponse);
    };

    const deleteBoardResponse = (
        responseBody: DeleteBoardResponseDto | ResponseDto | null
    ) => {
        if (responseBody && responseBody.code === "SU") {
            alert("해당 문의가 삭제되었습니다.");
            navigate("/");
        } else {
            alert("삭제 실패");
        }
    };

    const homeHandler = () => {
        navigate(`/ `);
    };

    return (
        <div className="detail">
            <button className="homeButton" onClick={homeHandler}>홈으로 가기</button>
            <div className="detail-container">

                <div className="detail-row">
                    <p>
                        <div className="label">제목</div>
                        <div className="value">{board?.title}</div>
                    </p>
                    <p>
                        <div className="label">내용</div>
                        <div className="value">{board?.content}</div>
                    </p>
                </div>

                <div className="more-options">
                    <button
                        className="update-button"
                        onClick={() => updatePostClickHandler(board?.boardId)}
                    >
                    수정
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => deletePostClickHandler(board?.boardId)}
                    >
                    삭제
                    </button>
                </div>
            </div>
        </div>
    )
}
