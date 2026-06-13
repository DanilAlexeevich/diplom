import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/slices/AuthSlice';
import { removeToken, removeStoredUser } from '@/utils/auth';

import styles from './profile-page.module.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state: any) => state.auth);
  
  const [avatar, setAvatar] = useState<string>(user?.userAvatar || '');

  useEffect(() => {
    if (user?.userAvatar) {
      setAvatar(user.userAvatar);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setAvatar(base64);

      if (user) {
        const updatedUser = { ...user, userAvatar: base64 };
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    removeStoredUser();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.container}>
        

        <div className={styles.profileCard}>

          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <img
                src={avatar || '@/assets/icons/user.svg'}
                alt=""
                className={styles.avatar}
              />
              <label className={styles.avatarEditLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className={styles.avatarInput}
                />
                <span className={styles.editIcon}>✎</span>
              </label>
            </div>
          </div>

          <div className={styles.info}>
            {user.email && <p className={styles.email}>Ваша почта: {user.email}</p>}
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
