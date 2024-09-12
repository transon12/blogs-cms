import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarLeft from '../../components/navbarLeft/NavbarLeft';
import { changePassword } from '../../redux/userInformation/actions';
import './UpdatePassword.scss';
import { Alert, Space, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const UpdatePassword = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [cancel, setCancel] = useState("")

    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password);
    };

    const states = useSelector((states) => states);
    const message = states.userInforReducer.payload;

    const changePassSuccess = () => {
        notification.success({
            message: message.message,
        });
    };
    const changePassError = () => {
        notification.error({
            message: message,
        });
    };

    const validateChangePass = () => {
        notification.error({
            message: "Mật khẩu mới chưa trùng khớp"
        })
    }

    const validateChangeError = () => {
        notification.error({
            message: "Mời bạn nhập lại mật khẩu"
        })
    }

    useEffect(() => {
        if (message) {
            if (message.status) {
                changePassSuccess();
                // history.push("#")
            } else {
                changePassError();
            }
        }
    }, [message]);

    const handleSubmit = (event) => {
        if (newPassword === confirmNewPassword && oldPassword !== newPassword) {
                event.preventDefault();
            dispatch(changePassword({ old_password: oldPassword, password: newPassword }));
        } else if(newPassword !== confirmNewPassword && oldPassword !== newPassword){
            event.preventDefault();
            validateChangePass()
        } else {
            event.preventDefault();
            validateChangeError()
        }
    };

    return (
        <div className="update-password">
            <NavbarLeft />
            <div className="update-password-1">
                <div className="wap-password">
                    <div className="wap-password-1">
                        <div className="container-big">
                            <h2>Đổi mật khẩu</h2>
                            <p>
                                Thay đổi mật khẩu cho tài khoản của bạn. Bạn nên đặt mật khẩu mạnh để chặn những truy
                                cập trái phép vào tài khoản của mình
                            </p>
                        </div>
                        <div className="container-small">
                            <form 
                            // onSubmit={handleSubmit}
                            >
                                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
                                {/* {success && <div style={{ color: 'green' }}>{success}</div>} */}
                                <label className="input-password">
                                    <p>* Mật khẩu hiện tại</p>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label className="input-password">
                                    <p>* Mật khẩu mới</p>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label className="input-password">
                                    <p>* Xác nhận mật khẩu mới</p>
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </label>
                                <br />
                                <button 
                                type="submit" 
                                className="button-1"
                                value={cancel}
                                onClick={()=> history.push("/")}
                                >
                                    Hủy bỏ
                                </button>
                                <button type="submit" className="button-2" onClick={handleSubmit}>
                                    Đổi mật khẩu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
