
import styles from './Header.module.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Popover } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";



const Header = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const amountCart = useSelector((state) => state.getAmountCart.amountCart);
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [language, setLanguage] = useState(
        <div>
            <i className={`${styles.starIcon} fa-solid fa-star `} />
            <span>VI</span>
        </div>);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const categoriesDropdownContent = <div style={{ width: '50vw', background: '#f4f6f8', padding: '0' }}>
        <div className='items row'>
            {Array(6).fill('Bộ Lọc Gió').map((text, index) => (
                <div className='col-4' key={index}>
                    <div className="  mb-3 card" >
                        <div className='card-body d-flex align-items-center'>
                            <img
                                style={{ width: '3vw' }}
                                src={process.env.PUBLIC_URL + '/asset/images/locgio.png'}
                                alt="icon"
                            />
                            <div className="ms-1">{text}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <hr></hr>
        <div className='bestsell'>
            <div className='d-flex justify-content-between'>
                <div style={{ fontSize: '1.2vw', fontWeight: '500' }} >Sản Phẩm Bán Chạy</div>
                <div style={{ color: '#3f94f4' }}>
                    <span style={{ fontWeight: '500' }}>Xem tất cả</span>
                    <i className="fa-solid fa-angles-right mx-1" />
                </div>
            </div>
            <div className='row'>
                <div className='col-3'>
                    <div className='card' style={{ height: '17vw' }}>
                        <div className='card-body'>
                            <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/locgio2.png'} />
                            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Lọc Gió Động Cơ Air Filter-Chevolet</p>
                            <div style={{ color: '#b71d18', fontWeight: '500' }}>299.000đ</div>
                            <div style={{ fontSize: '0.8vw' }}>
                                <span style={{ color: '#b3bcc5', textDecoration: 'line-through' }}> 199.000 </span>
                                <span style={{ color: 'red' }}>-10%</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='card' style={{ height: '17vw' }}>
                        <div className='card-body'>
                            <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/locgio1.png'} />
                           <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Lọc Gió Động Cơ Air Filter-Chevolet</p>
                            <div style={{ color: '#b71d18', fontWeight: '500' }}>299.000đ</div>
                            <div style={{ fontSize: '0.8vw' }}>
                                <span style={{ color: '#b3bcc5', textDecoration: 'line-through' }}> 199.000 </span>
                                <span style={{ color: 'red' }}>-10%</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='card' style={{ height: '17vw' }}>
                        <div className='card-body'>
                            <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/locgio4.png'} />
                            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Lọc Gió Động Cơ Air Filter-Chevolet</p>
                            <div style={{ color: '#b71d18', fontWeight: '500' }}>299.000đ</div>
                            <div style={{ fontSize: '0.8vw' }}>
                                <span style={{ color: '#b3bcc5', textDecoration: 'line-through' }}> 199.000 </span>
                                <span style={{ color: 'red' }}>-10%</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='card' style={{ height: '17vw' }}>
                        <div className='card-body'>
                            <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/locgio5.png'} />
                            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Lọc Gió Động Cơ Air Filter-Chevolet</p>
                            <div style={{ color: '#b71d18', fontWeight: '500' }}>299.000đ</div>
                            <div style={{ fontSize: '0.8vw' }}>
                                <span style={{ color: '#b3bcc5', textDecoration: 'line-through' }}> 199.000 </span>
                                <span style={{ color: 'red' }}>-10%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    const items = [
        {
            key: '1',
            icon: <UnorderedListOutlined style={{ color: 'white', fontSize: '1vw' }} />,
            label: (
                <span style={{ color: 'white', fontSize: '0.85vw' }}>{t('Categories')}</span>
            ),
            children: [
                {
                    key: '11',
                    label: (
                        <Popover
                            content={categoriesDropdownContent}
                            placement="right"
                            trigger="hover"

                        >
                            <span className={styles.menuLabel}>
                                <i className="fa-solid fa-oil-well mx-1" />
                                Bộ Lọc dầu
                            </span>
                        </Popover>
                    ),
                },
                {
                    key: '12',
                    label: (
                        <Popover
                            content={categoriesDropdownContent}
                            placement="right"
                            trigger="hover"
                        >
                            <span className={styles.menuLabel}>
                                <i className="fa-solid fa-paper-plane mx-1" />
                                Bộ Lọc Không Khí
                            </span>
                        </Popover>
                    ),

                },
                {
                    key: '13',
                    label: (<Popover
                        content={categoriesDropdownContent}
                        placement="right"
                        trigger="hover"
                    >
                        <span className={styles.menuLabel}>
                            <i className="fa-solid fa-gas-pump mx-1" />
                            Bộ Lọc Nhiên Liệu</span>,
                    </Popover>
                    ),
                },
                {
                    key: '14',
                    label: (<Popover
                        content={categoriesDropdownContent}
                        placement="right"
                        trigger="hover"
                    >
                        <span className={styles.menuLabel}>
                            <i className="fa-solid fa-house mx-1" />
                            Bộ Lọc Trong Cabin
                        </span>
                    </Popover>
                    ),
                },
            ],
        }
    ];
    const getLevelKeys = items1 => {
        const key = {};
        const func = (items2, level = 1) => {
            items2.forEach(item => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };
    const onOpenChange = openKeys => {
        const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter(key => key !== currentOpenKey)
                .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    const levelKeys = getLevelKeys(items);
    const product = {
        category_id: 17,
        created_at: "2025-04-23",
        description: "Lắc tay vàng 18K với họa tiết tinh xảo",
        detailed_description: "Lắc tay vàng mang lại sự may mắn và vẻ đẹp sang trọng",
        image: "/asset/images/phukientrangsucnu/phukientrangsucnu9.webp",
        name: "Lắc tay vàng 18K",
        price: 5000000,
        product_id: 171,
        rating: 4.88,
        shop_name_id: 3,
        sold: 70,
        updated_at: null,
        views: 344
    };
    return <div className={`${styles.header} container-fluid p-0`}>
        <div className={styles.topHeader} >
            <div>{t('entercode')} <strong style={{ color: '#ecc554' }} >NEWBIE</strong> {t('statement1')}</div>
            <div className='d-flex'>
                <div className='mx-3'>
                    <i className="fa-solid fa-phone" />
                    <span className='mx-2'>{t('hotline')}: <strong style={{ color: '#ecc554' }}>0283 760 7607</strong></span>
                </div>
                <div className={styles.dropdown}>
                    <div className={styles.dropdowndownloadapp}>
                        <i className="fa-solid fa-clipboard" />
                        <span className='ms-2'>{t('downloadapp')}</span>
                    </div>
                    <div className={styles.dropdowndownloadappcontent}>
                        <img className='w-100' src={process.env.PUBLIC_URL + '/asset/images/qrcode.png'}></img>
                    </div>
                </div>
            </div>
        </div>
        <div style={{ background: 'white' }}>
            <div className={styles.navigate}>
                <div className={`${styles.navigateLeft}`}>
                    <img onClick={() => { navigate('/') }} className={styles.logoImg} src={process.env.PUBLIC_URL + '/asset/images/logo.jpg'}></img>
                </div>
                <div className={`${styles.navigateCenter}`}>
                    <div className={`${styles.navigateForm}`}>
                        <input className={`${styles.inputForm}`} type="text" placeholder="Tìm sản phẩm" />
                        <i style={{ fontSize: '1.6vw' }} className=" text-primary fa-solid fa-camera icon" />
                        <button className={`${styles.inputButton}`}>
                            <i className="fa-solid fa-magnifying-glass text-white" />
                        </button>
                    </div>
                </div>
                <div className={`${styles.navigateRight}`}>

                    <div className={styles.dropdown}>
                        <span className={styles.dropdownbutton}>{language}</span>
                        <div className={styles.dropdowntranslatecontent}>
                            <div >
                                <span style={{ cursor: 'pointer' }} onClick={() => {
                                    setLanguage(<div>
                                        <i className={`${styles.starIcon} fa-solid fa-star `} />
                                        <span>VI</span>
                                    </div>)
                                    changeLanguage('vi')
                                }}>Tiếng Việt</span>
                            </div>
                            <div >
                                <span style={{ cursor: 'pointer' }} onClick={() => {
                                    setLanguage(<div>
                                        <i className={`${styles.usaIcon} fa-solid fa-flag-usa`}></i>
                                        <span>ENG</span>
                                    </div>)
                                    changeLanguage('en')
                                }}>English</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dropdown}>
                        <i className={`${styles.basketIcon} fa-solid fa-cart-shopping `} />
                        <span className={styles.badge}>
                            {amountCart}
                        </span>
                        <span>
                            <span className={`${styles.dropdownbutton} fw-medium`}> {t('cart')}</span>
                            <div className={styles.dropdownbasketcontent}>
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
                                        <button className={styles.buyButton}>Mua Ngay</button>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className={styles.dropdown}>
                        <div className={styles.dropdownbutton}>
                            <i className={`${styles.userIcon} fa-solid fa-user `} />
                            <span className='fw-medium'> {t('account')}</span>
                        </div>
                        <div className={styles.dropdownaccountcontent}>
                            <div>{t('myaccount')}</div>
                            <div>{t('logout')}</div>
                        </div>
                    </div>
                </div>


            </div>
            <div className={`${styles.menu}`} >
                <div className={`${styles.leftMenu}`}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['231']}
                        openKeys={stateOpenKeys}
                        onOpenChange={onOpenChange}
                        style={{ width: '15.5vw', height: '100%', background: '#0155c6', borderRadius: '10px' }}
                        items={items}
                    />

                    <div className={`${styles.menuItem}`}>{t('aboutus')}</div>
                    <div className={`${styles.menuItem}`}>{t('blogposts')}</div>
                    <div className={`${styles.menuItem}`}>Catalog</div>
                    <div className={`${styles.menuItem}`}>{t('contactus')}</div>
                </div>
                <div className={`${styles.rightMenu}`}>
                    <div className={`${styles.menuItem}`}>
                        <i className={`${styles.menuIcon} fa-solid fa-clock mx-1`} />
                        {t('support')} 24/7
                    </div>
                    <div className={`${styles.menuItem}`}>
                        <i className={`${styles.menuIcon} fa-solid fa-hand-holding-heart mx-1`} />
                        {t('freeshipping')}
                    </div>
                    <div className={`${styles.menuItem}`}>
                        <i className={`${styles.menuIcon} fa-solid fa-truck mx-1`} />
                        {t('expressdelivery')}
                    </div>
                    <div className='fw-medium'>
                        <i className={`${styles.menuIcon} fa-solid fa-rotate mx-1`} />
                        {t('return')}
                    </div>

                </div>
            </div>
        </div>
    </div>
};

export default Header;