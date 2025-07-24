
import styles from './Header.module.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { categoryChildren } from '../CategoryItems/CategoryItems';
import { getLevelKeys, handleOpenChange } from '../../antdesignhook/useAntdesign'


const Header = () => {
    // -------------get-state-from-redux--------------------------
    const amountCart = useSelector((state) => state.getAmountCart.amountCart);

    // ---------------routing---------------------------------------------
    const navigate = useNavigate();

    // --------------translate-feature----------------------------
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(
        <div>
            <i className={`${styles.starIcon} fa-solid fa-star `} />
            <span>VI</span>
        </div>);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // -----------------------use-component-Menu-Ant-Design--------------------------
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const items = [
        {
            key: '1',
            label: (
                <span style={{ color: 'white', fontSize: '0.85vw' }}>
                    <span><UnorderedListOutlined style={{ margin: '0 0.5vw', fontSize: '1vw' }} /></span>
                    {t('Categories')}
                </span>
            ),
            children: categoryChildren,
        }
    ];
    const levelKeys = getLevelKeys(items);
    const onOpenChange = (openKeys) => {
        handleOpenChange(openKeys, stateOpenKeys, setStateOpenKeys, levelKeys);
    };

    // --------------------arrays-for-binding------------------------------------
    const product = {
        category_id: 17, created_at: "2025-04-23", description: "Lắc tay vàng 18K với họa tiết tinh xảo",
        detailed_description: "Lắc tay vàng mang lại sự may mắn và vẻ đẹp sang trọng",
        image: "/asset/images/phukientrangsucnu/phukientrangsucnu9.webp", name: "Lắc tay vàng 18K",
        price: 5000000, product_id: 171, rating: 4.88, shop_name_id: 3, sold: 70, updated_at: null, views: 344
    };
    const menuLeftItems = [
        { key: 'aboutus', label: t('aboutus') },
        { key: 'blogposts', label: t('blogposts') },
        { key: 'catalog', label: 'Catalog' },
        { key: 'contactus', label: t('contactus') },
    ];
    const menuRightItems = [
        { icon: 'fa-clock', textKey: 'support', suffix: ' 24/7' },
        { icon: 'fa-hand-holding-heart', textKey: 'freeshipping' },
        { icon: 'fa-truck', textKey: 'expressdelivery' },
        { icon: 'fa-rotate', textKey: 'return', className: 'fw-medium', style: { margin: 0 } },
    ];
    return <div className={`${styles.header} p-0`}>
        <div className={styles.topHeader} >
            <div className={styles.topHeaderLeft} >{t('entercode')} <strong>NEWBIE</strong> {t('statement1')}</div>
            <div className={styles.topHeaderRight}>
                <div className={`${styles.topHeaderRightItemLeft} mx-3`}>
                    <i className="fa-solid fa-phone" />
                    <span className='mx-2'>{t('hotline')}: <strong>0283 760 7607</strong></span>
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
        <div className={styles.headerMain}>
            <div className={styles.navigate}>
                <div className={`${styles.navigateLeft}`}>
                    <img onClick={() => { navigate('/') }} className={styles.logoImg} src={process.env.PUBLIC_URL + '/asset/images/logo.jpg'}></img>
                </div>
                <div className={`${styles.navigateCenter}`}>
                    <div className={`${styles.navigateForm}`}>
                        <input className={`${styles.inputForm}`} type="text" placeholder="Tìm sản phẩm" />
                        <i className="fa-solid fa-camera icon" />
                        <button className={`${styles.inputButton}`}>
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </div>
                </div>
                <div className={`${styles.navigateRight}`}>
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownbutton}>{language}</span>
                        <div className={styles.dropdowntranslatecontent}>
                            <div>
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
                                        <img style={{ width: '1.7vw', height: '1.7vw', margin: '0 0.2vw' }} className={styles.usaIcon} src={process.env.PUBLIC_URL + '/asset/images/flaguk.png'} />
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
                                        <div className={styles.productdescription}><strong>{product.description}</strong></div>
                                        <div className={styles.price}>
                                            <strong className='text-center' >{product.price.toLocaleString('vi-VN')}₫</strong>
                                            <div className={styles.oldPrice}>399.000₫ -10%</div>
                                        </div>
                                        <button className={styles.cardButton}>Mua Ngay</button>
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
                    {menuLeftItems.map(item => (
                        <div key={item.key} className={styles.menuItem}>
                            {item.label}
                        </div>
                    ))}
                </div>
                <div className={`${styles.rightMenu}`}>
                    {menuRightItems.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.menuItem} ${item.className || ''}`}
                            style={item.style}
                        >
                            <i className={`${styles.menuIcon} fa-solid ${item.icon} mx-1`} />
                            {t(item.textKey)}{item.suffix || ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
};

export default Header;