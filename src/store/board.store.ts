import {create} from "zustand";


interface BoardStore{
    title : string;
    content : string;
    setTitle : (title: string) => void;
    setContent : (content : string) => void;
    resetBoard : () => void;
}


const useBoardStore = create<BoardStore>(set => ({
    title : '',
    content : '',
    image : '',
    nickname : '',
    setTitle : (title) => set(state => ({...state,title})),
    setContent : (content) => set(state => ({...state,content})),
    resetBoard : () => set(state => ({...state,title : '',content : '',image :''
    }))
}))

export default useBoardStore;



