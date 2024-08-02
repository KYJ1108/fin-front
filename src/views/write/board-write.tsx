import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostBoardRequest } from '../../apis/apis';
import './style.css';

export default function BoardWritePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const uploadPostClickHandler = async () => {
        console.log("ssssssssssssssss")
        try {
            const requestBody = { title, content };
            console.log(requestBody)
            const result = await PostBoardRequest(requestBody);
            console.log(result);
            if (result && result.code === "SU") {
                alert("게시물이 업로드되었습니다.");
                navigate("/");
            } else {
                alert("게시물 업로드에 실패했습니다.");
            }
        } catch (error) {
            console.error("게시물 업로드 중 오류가 발생했습니다:", error);
            alert("게시물 업로드 중 오류가 발생했습니다");
        }
    }

    const cancelClickHandler = () => {
        navigate("/");
    };

    return (
        <div className='write-container'>
            <div>
                <form className='write-content'>
                    <div>
                        <label className='write-label'>제목</label>
                        <input
                            className='write-input'
                            type="text"
                            placeholder=" 제목을 입력해 주세요."
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <label className='write-label'>내용</label>
                        <textarea
                            className='write-textarea'
                            placeholder="내용을 입력해주세요."
                            value={content}
                            onChange={handleContentChange}
                        />
                    </div>
                    <button className='write-button write-button-submit' type="button" onClick={uploadPostClickHandler}>작성</button>
                    <button className='write-button write-button-cancel' type="button" onClick={cancelClickHandler}>취소</button>
                </form>
            </div>
        </div>
    )
}