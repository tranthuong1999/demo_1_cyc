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
    const isTabnet = useMediaQuery(theme.breakpoints.between(600, 1024));
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
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
    // console.log("data infor", toJS(listReviewInfo));
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
                <div className='list-review-infor'>
                    {
                        (listReviewInfo).slice(0, 4).map((item: any) => {
                            return (
                                <div className='list-item'>
                                    <div className='item-image'>
                                        <img src={item.img} />
                                    </div>
                                    <div className='item-title'>
                                        {item.title}
                                    </div>
                                    <div className='item-text'>
                                        {/* {item.text} */}
                                        abcd
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='list-review-child'>
                        {
                            (listReviewInfo).slice(0, 4).map((item: any) => {
                                return (
                                    <div>
                                        <div className='item-image'>
                                            <img src={item.img} />
                                        </div>
                                        <div className='item-title'>
                                            {item.title}
                                        </div>
                                        <div className='item-text'>
                                            {/* {item.text} */}
                                            text
                                        </div>
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