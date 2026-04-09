import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateUserData, logout } from '../../store/slices/authSlice';
import styles from './Profile.module.css';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout_icon.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit_icon.svg';
import { ReactComponent as HistoryIcon } from '../../assets/icons/history_icon.svg';
import { ReactComponent as SaveIcon } from '../../assets/icons/save_icon.svg';
import { ReactComponent as UndoIcon } from '../../assets/icons/undo_icon.svg';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatePayload: any = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password) {
      updatePayload.password = formData.password;
    }

    await dispatch(updateUserData(updatePayload));
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  /* ПОПРАВИТЬ ЭТО ВСЁ */

  return (
    <div className={styles.container}>
      <button className={styles.historyButton}>
        <HistoryIcon className={styles.historyIcon} />
      </button>

      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogoutIcon className={styles.logoutIcon} />
      </button>

      {!isEditing && (
        <button className={styles.editButton} onClick={handleEditClick}>
          <EditIcon className={styles.editIcon} />
        </button>
      )}

      <div className={styles.header}>
        {!isEditing ? (
          <h1>Рады тебя видеть, <span className='accent'>{user?.name}</span>!</h1>
        ) : (
          <div className={styles.editingForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Новый пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Оставить пусто, чтобы не менять"
              />
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} onClick={handleSave}>
                <SaveIcon className={styles.saveIcon} />
              </button>

              <button className={styles.undoButton} onClick={handleCancel}>
                <UndoIcon className={styles.undoIcon} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;