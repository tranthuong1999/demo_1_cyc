import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import reviewStore from '../../store/ReviewStore';
import { toJS } from 'mobx';
import './style.scss';
import classNames from "classnames";
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";

const data = [
    { name: "Điện ảnh 24h", code: "60b9f19280400f00177b744b", index: 1, article: "ArticlesDienAnh02" },
    { name: "Review", code: "60babc8f42e1d0001761ff84", index: 2, article: "ArticlesReview02" },
    { name: "Khuyến mãi", code: "60babc8f42e1d0001761ff84", index: 3, article: "ArticlesKhuyenMai02" },
]

const ReviewPage = observer(() => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(1024));
    const isComputer = useMediaQuery(theme.breakpoints.up(1024));
    const { fetchListReviewInfor, listReviewInfo } = reviewStore;
    const [itemActive, setItemActive] = useState(1);
    const [isShowData, setIsShowData] = useState(false)

    useEffect(() => {
        const { code, article } = data[0];
        fetchListReviewInfor(code, article);
    }, [])

    const handleGetInfor = (item: any) => {
        const { code, article } = item;
        setItemActive(item.index)
        fetchListReviewInfor(code, article)
    }

    return (
        <div className='review-infor'>
            <div className='list-info'>
                {
                    data.map((item: any) => {
                        return (
                            <div
                                className={classNames('item-info')}
                                onClick={() => handleGetInfor(item)}
                                style={itemActive === item.index ? { borderBottom: "2px solid #fb4226" } : {}}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            {
                isShowData
                &&
                <div className={classNames("list-review-infor", isMobile ? "list-review-infor-mobile" : "")}>
                    {
                        toJS(listReviewInfo).slice(0, 4).map((item: any, index) => {
                            console.log("Item", item)
                            return (
                                <div className={classNames(`item-${index + 1}`, 'item')}>
                                    <img src={item.img} />
                                    <p className='title'> {item.title}</p>
                                    <p className='desc'> {item.text}</p>
                                </div>
                            )
                        })
                    }
                    <div className='item-5 item'>
                        {
                            toJS(listReviewInfo).slice(4, 8).map((item: any, index) => {
                                return (
                                    <div className='list-item'>
                                        <div className='block-1'>
                                            IMG
                                            {/* <img src={item.img} /> */}
                                        </div>
                                        <div className='title'> {item.title}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <button className='btn-button-show' onClick={() => setIsShowData(!isShowData)}>{!isShowData ? "Xem thêm" : "Rút gọn"} </button>
        </div>
    )
})

export default ReviewPage