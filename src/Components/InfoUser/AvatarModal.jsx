import React, { useEffect, useState } from "react";
import "./avatarModal.scss";
import axios from "axios";

import { BaseUrl } from '../service/BaseUrl'
import { useUserInfo } from '../service/UserInfoProvider'

const AvatarModal = ({ idLogged, onClose }) => {
    const API = BaseUrl;
    const { userInfo, setUserInfo } = useUserInfo();

    const [selected, setSelected] = useState(null);
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        // Load Avatar
        const loadAvatar = async () => {
            try {
                const result = await axios.get(`${API}/avatars/all`);
                setAvatars(result.data);

                // Tự động chọn avatar hiện tại nếu có
                if (userInfo?.avatar?.image) {
                    const current = result.data.find(
                        (item) => item.image === userInfo.avatar.image
                    );
                    if (current) setSelected(current);
                }

            } catch (error) {
                console.error("Avatar:", error);
            }
        };
        loadAvatar();
    }, [userInfo]);

    // kiem tra có thay đổi ảnh hay không?
    const isChanged = selected && selected.image !== userInfo?.avatar?.image;

    const handleSave = async () => {
        try {
            await axios.put(`${API}/users/updateAvatar?userId=${idLogged}`, {
                "avatar": { id: selected.id },
            });
            onClose();
            setUserInfo({
                ...userInfo,
                "avatar": { image: selected.image },
            })
            alert("Cập nhật thành công");
        } catch (err) {
            console.error("Lỗi cập nhật avatar:", err);
            alert("Không thể cập nhật ảnh đại diện");
        }
    };

    return (
        <div className="avatar-modal">
            <div className="modal-content">
                <h2>Chọn ảnh đại diện</h2>
                <div className="avatar-grid">
                    {avatars.map((item) => (
                        <img
                            key={item}
                            src={`${API}/images/avatarImgs/${item.image}`}
                            // nếu có sẵn ảnh thì chọn trước
                            className={selected?.id === item.id ? "selected" : ""}
                            onClick={() => setSelected(item)}
                            alt="avatar"
                        />
                    ))}
                </div>
                <div className="modal-actions">
                    <button onClick={onClose}>Hủy</button>
                    <button type="button" onClick={handleSave} disabled={!isChanged}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default AvatarModal;
