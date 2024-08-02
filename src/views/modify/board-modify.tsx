import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBoardRequest, PatchBoardRequest } from '../../apis/apis';
import Board from '../../types/interface/board.interface';
import './style.css';

export default function BoardModifyPage() {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        const fetchBoard = async () => {
            if(!boardId) return;
            const response = await GetBoardRequest(boardId);
            if(!response) return;
            if(response.code == 'SU') {
                setTitle(response.board.title);
                setContent(response.board.content);
            }
        }
        fetchBoard();
    }, []);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const uploadPostClickHandler = async () => {
        try {
            const requestBody = { title, content };
            const result = await PatchBoardRequest(boardId, requestBody);
            console.log(result);
            if (result && result.code === "SU") {
                alert("공지사항이 성공적으로 수정되었습니다.");
                navigate(`/detail/${boardId}`);
            }
        } catch (error) {
            console.error("공지사항 수정 중 오류가 발생했습니다:", error);
        }
    };

    const cancelClickHandler = () => {
        navigate(`/detail/${boardId}`);
    };
    

    return (
        <div className='modify-container'>
            <div className='modify-tr'>
                <th className="modify-left">제목</th>
                <td className="modify-right">
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </td>
            </div>

            <div className='modify-tr'>
                <th className="modify-left">내용</th>
                <td className="modify-right">
                    <textarea
                        placeholder="내용"
                        value={content}
                        onChange={handleContentChange}
                    />
                </td>
            </div>

            <td colSpan={2} className="modify-button">
                <button className="modify-upload" onClick={uploadPostClickHandler}>수정</button>
                <button className="modify-cancel" onClick={cancelClickHandler}>취소</button>
            </td>
        </div>
    )
}
