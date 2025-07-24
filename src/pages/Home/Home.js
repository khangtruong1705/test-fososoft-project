import styles from './Home.module.css' // Import CSS Module
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { Menu, Checkbox, Button, Select, Space } from 'antd';
import { jwtDecode } from 'jwt-decode';
import _ from "lodash";
import { getLevelKeys, handleOpenChange } from '../../antdesignhook/useAntdesign'
import { getFilterItems } from '../../components/FilterItems/FilterItems'
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';

const Home = () => {
    // -------------------------translation-feature--------------------------
    const { t } = useTranslation();

    //--- loadingOverlay--effect-------------------------------
    const [loading, setLoading] = useState(true);

    // ----sort-feature-------------------------------
    const [selectedSort, setSelectedSort] = useState(null);
    const handleChange = value => {
        let sortedarrNewToOldProduct
        if (value === 'lowtohigh') {
            sortedarrNewToOldProduct = _.orderBy(arrNewToOldProduct, ["price"], ["asc"]);
        } else if (value === 'hightolow') {
            sortedarrNewToOldProduct = _.orderBy(arrNewToOldProduct, ["price"], ["desc"]);
        } else {
            sortedarrNewToOldProduct = [...arrNewToOldProduct];
        }
        setArrarNewToOldProduct(sortedarrNewToOldProduct);
    };
    const handleSortChange = (value) => {
        if (value === 1) {
            const sortedItems = _.orderBy(
                arrNewToOldProduct,
                [item => item.category_id],
                ['desc']
            );
            setSelectedSort(value);
            setArrarNewToOldProduct(sortedItems)
        } if (value === 2) {
            const sortedItems = _.orderBy(arrNewToOldProduct, ["sold"], ["desc"]);
            setSelectedSort(value);
            setArrarNewToOldProduct(sortedItems)
        } if (value === 3) {
            const sortedItems = _.sortBy(arrNewToOldProduct, ["created_at"], ["desc"]);
            setSelectedSort(value);
            setArrarNewToOldProduct(sortedItems)
        } if (value === 4) {
            const sortedItems = _.orderBy(
                arrNewToOldProduct,
                [item => new Date(item.created_at)],
                ['desc']
            );
            setSelectedSort(value);
            setArrarNewToOldProduct(sortedItems)
        }
    };
    //------------login--feature----------------------------
    const token = localStorage.getItem('token');

    // -------------------------biding-carousel-products--------------------------
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);

    // -------------------------biding-main-products------------------------------
    const [arrNewToOldProduct, setArrarNewToOldProduct] = useState([]);
    // ------------------------lazyload-feature---------------------------
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // ----------------------checkbox-function----------------------------
    const onChange = e => {
        console.log(`checked = ${e.target.checked}`);
    };

    // --------------------------filter-buttons------------------------
    const sortOptions = [
        { id: 1, label: t('relevant') },
        { id: 2, label: t('bestseller') },
        { id: 3, label: t('newest') },
        { id: 4, label: t('featured') },
    ];

    // ----------------------use-Menu-component-ant-design------------------------
    const filterItems = getFilterItems(t, onChange);
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const levelKeys = getLevelKeys(filterItems);
    const onOpenChange = (openKeys) => {
        handleOpenChange(openKeys, stateOpenKeys, setStateOpenKeys, levelKeys);
    };

    // -------------------call----APIs---------------------------
    const fetchData = async (pageNum) => {
        try {
            setLoading(true);
            if (pageNum === 1) {
                const response1 = await axios.get(`${DOMAIN}/api/products/get-top-views-products`);
                setArrTopViewsProduct(response1.data);
            }
            const response2 = await axios.get(`${DOMAIN}/api/products/get-all-products?page=${pageNum}&limit=12`);
            let newProducts = _.orderBy(response2.data.results, ["created_at"], ["desc"]);
            setArrarNewToOldProduct((prev) => [...prev, ...newProducts]);
            if (newProducts.length === 0 ||
                newProducts.length < 12 ||
                pageNum * 12 >= newProducts.total) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrTopViewsProduct([])
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    //------------------ reload-when-page-changes----------------
    useEffect(() => {
        fetchData(page)
    }, [page])

    // -----------------scroll-to-top-feature--------------------
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // ----------------------array-biding-bottomHome------------------------
    const bottomHomeItems = [
        {
            icon: 'fa-money-bill-transfer',
            title: 'Miễn phí vận chuyển',
            content: 'Với hóa đơn dưới 1 triệu',
        },
        {
            icon: 'fa-headphones',
            title: 'Hỗ trợ 24/7',
            content: 'Đội ngũ CSKH tận tình sẵn sàng lắng nghe và phục vụ tận tâm',
        },
        {
            icon: 'fa-truck-fast',
            title: 'Giao hàng nhanh 2h',
            content: 'Trong vòng bán kính 10km nội thành  TP HCM',
        },
        {
            icon: 'fa-cube',
            title: '30 ngày đổi trả',
            content: 'Hoàn tiền 100% nếu phát sinh lỗi từ NSX hoặc đơn vị vận chuyển',
        },
    ];
    return <>
        {loading ? (
            <div className={styles.loadingOverlay}>
                <div className={styles.customSpinner}></div>
            </div>) : (
            <>
                <div className={`${styles.container}`}>
                    <div className={styles.topHome}>
                        <div className={styles.topHomeText1} >{t('home')}</div>
                        <div className='mx-2'><i className="fa-solid fa-caret-right"></i></div>
                        <div className={styles.topHomeText2}>{t('products')}</div>
                    </div>
                    <div className={styles.voucher}>
                        <img className='w-100' src={`${process.env.PUBLIC_URL}/asset/images/carousel.png`}></img>
                        <div className={styles.carousel} >
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={10}
                                slidesPerView={5}
                                navigation
                            >
                                {arrTopViewsProduct?.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <NavLink
                                            style={{ textDecoration: 'none' }}
                                            to={`/productdetail/${product.product_id}`}
                                            onClick={async () => {
                                                try {
                                                    let data = {};
                                                    if (token == null) {
                                                        data = {
                                                            user_id: 0,
                                                            product_id: product.product_id,
                                                            name: product.name
                                                        };
                                                    } else {
                                                        const { user_id } = jwtDecode(token);
                                                        data = {
                                                            user_id: user_id,
                                                            product_id: product.product_id,
                                                            name: product.name
                                                        };
                                                    }
                                                    await axios.post(`${DOMAIN}/api/view-product/add-view-by-productid`, data);
                                                } catch (error) {
                                                    console.log('error', error)
                                                }
                                            }}
                                        >
                                            <div className={`${styles.carouselCard} card`}>
                                                <div className='card-body'>
                                                    <img className={styles.productimage} src={`${process.env.PUBLIC_URL} ${product.image}`} />
                                                    <div className={styles.dealsock}  >
                                                        <i className={`${styles.dealsockicon} fa-solid fa-fire mx-1`} />
                                                        <span className={styles.dealsockcontent}>Giá cực sốc</span>
                                                    </div>
                                                    <div className={styles.cardDescription}><strong>{product.description}</strong></div>
                                                    <div className={styles.price}>
                                                        <strong className={styles.newPrice} >{product.price.toLocaleString('vi-VN')}₫</strong>
                                                        <div className={styles.oldPrice}>399.000₫ -10%</div>
                                                    </div>
                                                    <button className={styles.cardButton}>Mua Ngay</button>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className={styles.mainProducts}>
                        <div className={styles.filter}>
                            <div className={styles.filterTitle}>
                                <i className={`${styles.filterIcon} fa-solid fa-filter`} />
                                <span className={styles.filterContent}>{t('filter')}</span>
                            </div>
                            <hr></hr>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                openKeys={stateOpenKeys}
                                onOpenChange={onOpenChange}
                                style={{ width: '16vw' }}
                                items={filterItems}
                            />
                        </div>
                        <div className={styles.products}>
                            <div className={styles.productsFilter}>
                                <strong className={styles.productsFilterLeft}>{t('productlist')}</strong>
                                <div className={styles.productsFilterRight} >
                                    <span className={styles.productsFilterRightTitle}>{t('sortby')}</span>
                                    {sortOptions.map(({ id, label }) => (
                                        <Button
                                            key={id}
                                            style={{ fontSize: '0.9vw', width: '4.9vw' }}
                                            onClick={() => handleSortChange(id)}
                                            className={selectedSort === id ? 'border border-primary' : 'btn-outline-primary'}
                                        >
                                            {label}
                                            {selectedSort === id && (
                                                <span className={styles.cornercheck}>
                                                    <i
                                                        className="fa-solid fa-check"
                                                        style={{
                                                            fontSize: '0.5vw',
                                                            color: 'white',
                                                            position: 'absolute',
                                                            top: '3px',
                                                        }}
                                                    />
                                                </span>
                                            )}
                                        </Button>
                                    ))}
                                    <Space wrap>
                                        <Select
                                            style={{ textAlign: 'center', width: '8.3vw', fontSize: '0.9vw' }}
                                            defaultValue='lowtohigh'
                                            onChange={handleChange}
                                            options={[
                                                { value: 'lowtohigh', label: <span style={{ fontSize: '0.9vw' }} >{t('lowtohigh')}</span> },
                                                { value: 'hightolow', label: <span style={{ fontSize: '0.9vw' }}>{t('hightolow')}</span> },

                                            ]}
                                        />
                                    </Space>
                                </div>
                            </div>
                            <div className={styles.arrayProducts}>
                                <InfiniteScroll
                                    style={{ overflowX: 'hidden' }}
                                    dataLength={arrNewToOldProduct.length}
                                    next={() => {
                                        setPage((prev) => prev + 1);
                                    }}
                                    hasMore={hasMore}
                                    loader={<div className="text-primary text-center my-3">{t('loadingmore')}</div>}
                                    endMessage={<div className=" text-primary text-center my-3">{t('allproductsloaded')}</div>}
                                >
                                    <div className='row'>
                                        {arrNewToOldProduct?.map((product, index) => {
                                            return <div className='col-6 col-sm-6 col-md-4 col-lg-3' key={index}>
                                                <NavLink
                                                    style={{ textDecoration: 'none' }}
                                                    to={`/productdetail/${product.product_id}`}
                                                    onClick={async () => {
                                                        try {
                                                            let data = {};
                                                            if (token == null) {
                                                                data = {
                                                                    user_id: 0,
                                                                    product_id: product.product_id,
                                                                    name: product.name
                                                                };
                                                            } else {
                                                                const { user_id } = jwtDecode(token);
                                                                data = {
                                                                    user_id: user_id,
                                                                    product_id: product.product_id,
                                                                    name: product.name
                                                                };
                                                            }
                                                            await axios.post(`${DOMAIN}/api/view-product/add-view-by-productid`, data);
                                                        } catch (error) {
                                                            console.log('error', error)
                                                        }
                                                    }}
                                                >
                                                    <div className={`${styles.carditem} card`}>
                                                        <div className='card-body'>
                                                            <img className={styles.productimage} src={`${process.env.PUBLIC_URL} ${product.image}`} />
                                                            <div className={styles.dealsock}  >
                                                                <i className={`${styles.dealsockicon} fa-solid fa-fire mx-1`} />
                                                                <span className={styles.dealsockcontent}>Giá cực sốc</span>
                                                            </div>
                                                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9vw' }}><strong>{product.description}</strong></div>
                                                            <div className={styles.price}>
                                                                <strong className='text-center' >{product.price.toLocaleString('vi-VN')}₫</strong>
                                                                <div className={styles.oldPrice}>399.000₫ -10%</div>
                                                            </div>
                                                            <button className={styles.cardButton}>Mua Ngay</button>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        })}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomHome}>
                        {bottomHomeItems.map((item, index) => (
                            <div key={index} className={styles.bottomHomeItem}>
                                <i className={`${styles.bottomHomeItemIcon} fa-solid ${item.icon}`} />
                                <div>
                                    <div className={styles.bottomHomeItemTitle}>{item.title}</div>
                                    <div className={styles.bottomHomeItemContent}>{item.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className={styles.scrollToTopButton}
                    >
                        <i className="fa-solid fa-arrow-up" />
                    </button>
                )}
            </>
        )}
    </>
};



export default Home