import React, { useEffect, useState } from 'react';
import { useLocation, Link, useHistory, NavLink } from 'react-router-dom';
import './NavbarLeft.scss';
import '../../assets/scss/custom/mixins.scss'


const NavbarLeft = () => {
    const [isActive, setIsActive] = useState(false);
    const [isKey, setIsKey] = useState(false);
    const location = useLocation();
    let history = useHistory();
    // console.log(history.location.pathname);
    useEffect(() => {
        if (history.location.pathname === '/update-user') {
            setIsActive(true);
        }
        if (history.location.pathname === '/change-password') {
            setIsKey(true);
        }
    }, []);
    return (
        <div class="individual-1">
            <Link to="/homeuser">
                <div class="individual-1-1">
                    <i class="fa-solid fa-house"></i>
                    <span>Trang chủ</span>
                </div>
            </Link>
            <div class="individual-1-2">
                <div class="information" onClick={(e) => setIsActive(!isActive)}>
                    <div class="information-1">
                        <i class="fa-solid fa-address-card"></i>
                        <span>Thông Tin Của Tôi</span>
                    </div>
                    <div class="information-2">
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
                <NavLink to="/post-user" style={{ color: '#876A4B' }}>
                    {isActive && (
                        <div class="detail">
                            <NavLink to="/update-user" style={{ color: '#876A4B' }}>
                                <div class="detail-1">
                                    <i class="fa-solid fa-user"></i>
                                    <span>Thông Tin Cá Nhân</span>
                                </div>
                            </NavLink>
                            <div class="detail-1">
                                <i class="fa-solid fa-address-card"></i>
                                <span>Thông Tin Liên Hệ</span>
                            </div>
                            <div class="detail-1">
                                <i class="fa-solid fa-envelope"></i>
                                <span>Emails</span>
                            </div>
                        </div>
                    )}
                </NavLink>
            </div>
            <div class="individual-1-3">
                <div class="security" onClick={(e) => setIsKey(!isKey)}>
                    <div class="security-1">
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Bảo Mật</span>
                    </div>
                    <div class="security-2">
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
                <NavLink to="/change-password" style={{ color: '#876A4B' }}>
                    {isKey && (
                        <div class="key">
                            <i class="fa-solid fa-key"></i>
                            <span>Mật Khẩu</span>
                        </div>
                    )}
                </NavLink>
            </div>
        </div>
    );
};

export default NavbarLeft;
