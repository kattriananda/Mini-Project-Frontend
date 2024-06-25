import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const DetailTransaksi = () => {
    const {id} = useParams();
    const fetcher = (url) => fetch (url). then((res)=>res.json());
    const {data: transaksi, error} = useSWR(
        `http://localhost:8080/pos/api/listtransaksidetail/${id}`, fetcher
    )
    const dispatch = useDispatch();
    useEffect(()=>{
        window.scrollTo({top:0, behavior:"smooth"});
    },[])

    return(
        <div className="main flex">
            <div>
                <table>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <div></div>
        </div>
    )
}