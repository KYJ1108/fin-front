import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllBoardRequest } from "../../apis/apis";
import Board from "../../types/interface/board.interface";
import './style.css';

export default function BoardListPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState<Board[]>([]);
    const {boardId} = useParams();

    const [temp, setTemp] = useState(0);
  // 필요한 요청 파라미터를 조립하여 api로 부터 데이터 받아와 업데이트하는 함수
    const getWeather = () => {
      const key =
          "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

      const dd = new Date();
      const y = dd.getFullYear();
      const m = ("0" + (dd.getMonth() + 1)).slice(-2);
      const d = ("0" + dd.getDate()).slice(-2);
      const ds = y + m + d;

      const dd2 = new Date();
      const h = ("0" + dd2.getHours()).slice(-2);
      const ts = `${h}00`;

      var url =
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
          key +
          "&pageNo=1&numOfRows=1000&dataType=JSON" +
          "&base_date=" +
          ds +
          "&base_time=" +
          ts +
          "&nx=67&ny=100";

      fetch(url)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.response.body.items.item);
              const itemArr = data.response.body.items.item;
              const result = {};
              itemArr.forEach((item:any) => {
                  if (item.category === "T1H") {
                      setTemp(item.obsrValue);
                  }
              });
          })
          .catch((err) => console.log(err));
  };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await GetAllBoardRequest();
                if (!result) return;
                console.log(result);
                const { code, boards } = result;
                if (code === 'DBE') {
                alert('데이터베이스 오류입니다.');
                return;
                }
                if (code !== 'SU') return;
                setPosts(boards);
                setLoading(false);
            } catch (error) {
                console.log('공지사항을 불러오는데 실패했습니다.', error);
            }
            };
        fetchPosts();
    }, [boardId]);
    

    const writePathClickHandler = () => {
        navigate(`/write`);
    }

    const boardsClickHandler = (boardId: number | string | undefined) => {
        navigate(`/detail/${boardId}`);
    };

    return (
        <div className="list-container">
            현재기온 : {temp}
            <button className="list-write-button" onClick={writePathClickHandler}>작성</button>
            <ul className='list-content'>
                {posts.length === 0 ? (
                    <div>
                        <div className='list-content-non'>게시물이 없습니다.</div>
                    </div>
                ) : (
                    posts.map((boards, index) => (
                    <div className='list-content-item' key={boards.id} onClick={() => boardsClickHandler(boards.boardId)}>
                        <div>{boards.title}</div>
                    </div>
                    ))
                )}
            </ul>
        </div>
    )
}
