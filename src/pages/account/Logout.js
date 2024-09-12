// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//actions
import { logoutUser } from '../../redux/actions';

// components

import logoutIcon from '../../assets/images/logout-icon.svg';

const Logout = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return <></>;
};

export default Logout;
