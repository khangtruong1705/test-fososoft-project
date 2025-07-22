import styles from './ProductDetail.module.css'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getAmountCartApi } from '../../redux/reducers/getAmountCart'
import { useFormik } from 'formik'
import { DOMAIN } from '../../util/config';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';


const ProductDetail = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const { productid } = useParams();
    const [product, setProduct] = useState({});
    const [shopName, setShopName] = useState({});
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    let user_id = null;
    notification.config({
        placement: 'topLeft',
        top: 60,
        duration: 1
    });
    if (token && typeof token === 'string') {
        try {
            const decoded = jwtDecode(token);
            user_id = decoded.user_id;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    const frm = useFormik({
        initialValues: {
            comment: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const dataComment = {
                    'user_id': user_id,
                    'product_id': productid,
                    'comment_content': values.comment
                }
                let res = await axios.post(`${DOMAIN}/api/comments/add-comment-by-productid`, dataComment);
                setComments((prevComments) => [...prevComments, res.data]);
                resetForm();
            } catch (error) {
                console.log(error)
                notification.warning({
                    message: 'Cảnh báo',
                    description: t('needlogin'),
                });
                alert(t('needlogin'))
            }
        }
    });
    const addProducttocart = async (item) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/carts/add-product-to-cart-by-productid`, item);
            notification.success({
                message: 'Thành công',
                description: 'Thêm vào giỏ hàng thành công !!!',
            });
            setProduct(response.data);
        } catch (error) {
            notification.warning({
                message: 'Cảnh báo',
                description: error.response.data.detail,
            });
        }
    };
    const productInfo = [
        { label: 'Danh Mục', value: <>Shopee<i className="fa-solid fa-arrow-right mx-1" />Sắc Đẹp<i className="fa-solid fa-arrow-right mx-1" />Nước hoa Nam</> },
        { label: 'Kho', value: '163' }, { label: 'Thương Hiệu', value: 'Dior' },
        { label: 'Giới Tính', value: 'Nam' }, { label: 'Nồng Độ Hương', value: 'EDP' },
        { label: 'Thể tích', value: '10ml' }, { label: 'Công thức', value: 'Dạng xịt' },
        { label: 'Nhà Sản Xuất', value: 'Moyar Perfume' }, { label: 'Gửi từ', value: 'TP. Hồ Chí Minh' }];
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-product-by-productid/${productid}`);
            setProduct(response.data);
            const responseComments = await axios.get(`${DOMAIN}/api/comments/get-comments-by-productid/${productid}`);
            setComments(responseComments.data);
            const responseShopName = await axios.get(`${DOMAIN}/api/shop-name/get-shop-name-by-productid/${productid}`);
            setShopName(responseShopName.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchData()

    }, [productid])

    return <>
        <div className='mb-4' style={{ height: '1rem' }}></div>
        <div className={`${styles.card1} card w-75 mx-auto`}>
            <div className='card-body d-flex justify-content-between'>
                <div className={styles.itemimages}>
                    <div className='card'>
                        <img className={styles.image} src={`${process.env.PUBLIC_URL} ${product.image}`} />
                    </div>
                </div>
                <div className={styles.itempolicy}>
                    <div className=''>
                        <div className='d-flex' style={{ fontSize: '0.65vw' }}>
                            <div style={{
                                padding: '2px',
                                color: '#d93843',
                                backgroundColor: '#fff0f1',
                                borderRadius: '10px'
                            }}
                                className='me-2'
                            >
                                <i className="fa-solid fa-thumbs-up me-1" />
                                <strong>TOP DEAL</strong>
                            </div>
                            <div style={{
                                padding: '2px',
                                color: '#0a68ff',
                                backgroundColor: '#ffe880',
                                borderRadius: '10px'
                            }}
                                className='me-2'
                            >
                                <i className="fa-solid fa-box me-1" />
                                <strong>30 NGÀY ĐỔI TRẢ</strong>
                            </div>
                            <div style={{
                                padding: '2px',
                                color: '#0157e0',
                                backgroundColor: '#f2f7ff',
                                borderRadius: '10px'
                            }}

                            >
                                <i className="fa-solid fa-circle-check me-1" />
                                <strong>CHÍNH HÃNG</strong>
                            </div>
                        </div>
                        <div>
                            <span className={styles.favourite}>{t('favorite')}</span>
                            <strong style={{ fontSize: '1.2vw' }}>{product.description}</strong>
                        </div>
                        <div className="p-1 d-flex left ">
                            <div className="border-end pe-3">{product.rating}
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className={`${styles.star} fa-solid fa-star`} />
                                ))}
                            </div>
                            <div className="border-end px-3">334 {t('reviews')}</div>
                            <div className="border-end px-3" >{product.sold} {t('sold')}</div>
                        </div>
                    </div>
                    <div className={styles.price}
                        style={{ fontSize: '1.4vw' }}
                    >
                        <strong>{product.price?.toLocaleString('vi-VN')}₫</strong>
                        <span
                            className={styles.discount}
                            style={{ fontSize: '0.9vw' }}
                        >{t('discount')} {t('price')} 9%</span>
                    </div>
                    <div className='d-flex align-items-center' style={{ fontSize: '1vw' }}>
                        <div >{t('shopvouchers')} : </div>
                        {[ 15,25, 30, 35].map((amount, index) => (
                            <div key={index}
                                style={{ fontSize: '0.9vw' }}
                                className={styles.discount}>
                                {t('discount')} {amount}k
                            </div>
                        ))}
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>{t('returnpolicy')} :</div>
                        <strong style={{ color: '#de4384' }}>
                            {t('15dayreturns')}
                            <i className="fa-solid fa-rotate ms-1" />
                        </strong>
                        <strong style={{ color: '#4babff' }}>

                            {t('freeexchanges')}
                            <i className="fa-solid fa-arrow-right-arrow-left ms-1" />
                        </strong>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>{t('hotdeal')}</div>
                        <strong
                            style={{ fontSize: '0.9vw',color:'#6556fd' }}>
                            <i className="fa-solid fa-bolt me-1" />
                            {t('attackhotdeal')}
                        </strong>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>{t('insurance')} :</div>
                        <strong style={{color:'#fe0d1b'}}>
                            <i className="fa-solid fa-truck-medical me-1" />
                            {t('consumerprotection')}
                        </strong>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>{t('shipping')} : </div>
                        <div style={{ color: '#01ab57' }}>
                            <i className="fa-solid fa-truck me-1" />
                            <strong>{t('freeship')}</strong>
                        </div>
                        <div style={{
                            color: '#ff424e'
                        }}><strong>NOW</strong></div>
                    </div>
                    <div>
                        <Button
                            className='p-2 me-3'
                            style={{ backgroundColor: '#ffeee8', borderColor: '#f37f68', fontSize: '1vw' }}
                            onClick={async () => {
                                if (user_id === null) {
                                    notification.warning({
                                        message: 'Cảnh báo',
                                        description: 'Bạn cần đăng nhập !!!',
                                    });

                                    navigate(`/login`)
                                    return
                                }
                                let item = {
                                    'user_id': user_id,
                                    'total_amount': product.price,
                                    'status': 'pending',
                                    'created_at': new Date(),
                                    'updated_at': new Date(),
                                    product_id: product.product_id
                                }
                                await addProducttocart(item);
                                const actionAsyns = await getAmountCartApi(user_id);
                                dispatch(actionAsyns);
                                setTimeout(() => {
                                    navigate('/')
                                }, 1000);
                            }}> {t('addtocart')}
                            <i style={{ color: '#f9502f' }} className='fa-solid fa-cart-shopping' />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#ffeee8', borderColor: '#f37f68', fontSize: '1vw' }}
                            className='p-2'
                            onClick={async () => {
                                if (user_id === null) {
                                    notification.warning({
                                        message: 'Cảnh báo',
                                        description: 'Bạn cần đăng nhập !!!',
                                    });
                                    navigate(`/login`)
                                    return
                                } let item = {
                                    'user_id': user_id,
                                    'total_amount': product.price,
                                    'status': 'pending',
                                    'created_at': new Date(),
                                    'updated_at': new Date(),
                                    product_id: product.product_id
                                }
                                await addProducttocart(item);
                                const actionAsyns = await getAmountCartApi(user_id);
                                dispatch(actionAsyns);
                                setTimeout(() => {
                                    navigate('/cart', { state: { scrollToProductId: product.product_id } })
                                }, 1000);
                            }}
                        > {t('buynow')}
                            <i style={{ color: '#f9502f' }} className="fa-solid fa-money-bill-trend-up" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className='shopName card w-75 mx-auto mb-5'>
            <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center' >
                    <div className='p-3' style={{ width: '22vw', height: '9vw' }}>
                        <img style={{ width: '100%', height: '100%', borderRadius: '200px', objectFit: 'cover' }} src={`${process.env.PUBLIC_URL}${shopName.image}`} />
                    </div>
                    <div>
                        <h5 style={{ fontSize: '1.3vw' }}>{shopName.name}</h5>
                        <NavLink style={{ textAlign: 'center', fontSize: '1vw' }} to={`/shopname/${shopName.shop_name_id}`} className='border border-primary' state={{ fromProductId: productid }} >{t('view')} Shop</NavLink>
                    </div>
                </div>
                <h5 className='text-center' style={{ width: '30%', fontSize: '1.4vw' }}>{t('rating')} :{shopName.rating}<i style={{ color: '#f7d22c' }} className='fa-solid fa-star' /></h5>
                <h5 className='text-center' style={{ width: '30%', fontSize: '1.4vw' }}>{t('joindate')}:{shopName.created_at}</h5>
            </div>
        </div>
        <div className='detailinfo card w-75 mx-auto' style={{ fontSize: '1vw' }}>
            <div className='iteminfo w-50'>
                {productInfo.map((item, index) => (
                    <div key={index} className='d-flex justify-content-between'>
                        <div>{item.label}</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className='itemdescribe'>
                <div>
                    <h3 style={{ fontSize: '1.6vw' }}>MÔ TẢ SẢN PHẨM</h3>
                    Hương đầu: Cam Bergamot, Tiêu
                    Hương giữa: Tiêu Sichuan, Hoa Oải Hương, Tiêu Hồng, Cỏ Hương Bài, Hoắc Hương, Phong Lữ, Nhựa Elemi
                    Hương cuối: Ambroxan, Tuyết Tùng, Labannum

                    Ra mắt từ năm 2015, với tuổi đời của chỉ vỏn vẹn 7 năm nhưng điều đó cũng không thể cản trở Sauvage trở thành một trong những chai nước hoa kinh điển nhất . Mặc cho rất nhiều ý kiến trái chiều về Dior Sauvage, không ai có thể phủ nhận rằng đây là một mùi hương rất nam tính và quyến rũ.

                    Những đặc điểm nổi bật về mùi hương của Sauvage là một mùi hương Xanh, nam tính và nịnh mũi với các nốt hương chủ đạo của Cam Chanh, hòa quyện với vị cay cay, mạnh mẽ của Tiêu và kết lại với nốt hương Ambroxan - nguyên liệu lấy cảm hứng từ món quà của đại dương, Long Diên Hương. Luôn đứng đầu danh sách những chai nước hoa được săn đón, phổ biến nhất, nhưng mùi hương của Sauvage vẫn luôn giữ vững được phong độ, không hề mờ nhạt trước muôn vàn ấn phẩm mùi hương khác.

                    Không chỉ xứng đáng sở hữu vì mùi hương mà độ bám tỏa của Sauvage chắc chắn cũng sẽ làm bạn hài lòng. Đảm bảo Sauvage sẽ mang lại cho bạn một trải nghiệm, hình ảnh của một người đàn ông nam tính, lịch lãm và có đôi phần hoang dã, phong trần như Johnny Depp trong chiến dịch quảng cáo cho mùi hương này.
                </div>
            </div>
        </div>
        <div className={`${styles.itemratecontainer} itemrate card`}>
            <h2 style={{ fontSize: '2vw' }}>{t('rating')} {t('product')}</h2>
            <div className={styles.itemrateparent}>
                <div style={{ fontSize: '1vw' }}>
                    {product.rating} / 5
                    <div style={{ fontSize: '1vw' }}>
                        {[...Array(5)].map((_, index) => (
                            <i
                                key={index}
                                className={`${styles.star} fa-star ${index < product.rating ? 'fa-solid' : 'fa-regular'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                {[5, 4, 3, 2, 1].map(num => (
                    <div key={num} className={styles.itemratechild}>{num} {t('star')}</div>
                ))}
            </div>
            <div className={styles.commentcontainer}>
                <div className=''>
                    <div className={styles.commentcontent}>
                        {comments?.map((comment, index) => {
                            return <>
                                <div className='avatar d-flex'>
                                    <img className={styles.avatarimage} src={process.env.PUBLIC_URL + '/asset/images/ngau1.jpg'} />
                                    <div>khang123</div>
                                </div>
                                <div>{comment.created_at}</div>
                                <div>
                                    {comment.comment_content}
                                </div>
                                <hr></hr>
                            </>
                        })}
                        <form onSubmit={frm.handleSubmit} className="mb-3">
                            <label style={{ fontSize: '1vw' }} htmlFor="exampleFormControlTextarea1" className="form-label">{t('comment')}</label>
                            <textarea id='comment'
                                name='comment'
                                className="form-control"
                                onChange={frm.handleChange}
                                onBlur={frm.handleBlur}
                                rows={3}
                                value={frm.values.comment} />
                            <button
                                className='mt-4 px-3'
                                style={{ fontSize: '1vw', border: '1px solid #f84a2e', borderRadius: '20px', background: '#fffbf8' }}
                            >{t('submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='py-5' style={{ background: '#f5f5f5' }}></div>
    </>

};

export default ProductDetail