import { useReducer, useEffect } from "react";
// LOADING, SUCCESS, ERROR
function reducer (state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data:null,
                error:null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return {
                loading: false,
                data:null,
                error:action.error
            }
        default:
            return state;
    }
}
function useAsync (callback, deps=[]){
    // 상태관리하기
    // useReducer(함수, 초기값)
    const [ state, dispatch ] = useReducer(reducer,{
        loading:false,
        data:null,
        error:null
    })
    // 비동기 함수
    const fetchData = async () => {
        try {
            dispatch({ type: 'LOADING'})
            const data = await callback()
            //요청이 성공하면
            dispatch({ type: 'SUCCESS', data:data});
        }
        catch(e){
            dispatch({type:'ERROR', error:e})
        }
    }
    // 렌더하고 호출
    useEffect(()=>{
        fetchData();
    },deps)
    return [ state, fetchData ];
}
export default useAsync;