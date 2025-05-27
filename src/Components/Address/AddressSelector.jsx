import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddressSelector = ({ onAddressChange, defaultValue }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const hasDefaultLoaded = useRef(false); // Không bị override lại, chỉ set defaultValue 1 lần duy nhất.

    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
            setProvinces(res.data);
        });
    }, []);

    const handleProvinceChange = async (e) => {
        const provinceCode = e.target.value;
        const province = provinces.find((p) => p.code.toString() === provinceCode);
        setSelectedProvince(province);
        setSelectedDistrict(null);
        setSelectedWard(null);

        const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        setDistricts(res.data.districts || []);
        setWards([]);
    };

    const handleDistrictChange = async (e) => {
        const districtCode = e.target.value;
        const district = districts.find((d) => d.code.toString() === districtCode);
        setSelectedDistrict(district);
        setSelectedWard(null);

        const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        setWards(res.data.wards);
    };

    const handleWardChange = (e) => {
        const wardCode = e.target.value;
        const ward = wards.find((w) => w.code.toString() === wardCode);
        setSelectedWard(ward);

        // Gửi dữ liệu ra ngoài
        if (onAddressChange) {
            onAddressChange({
                province: selectedProvince?.name,
                district: selectedDistrict?.name,
                ward: ward?.name,
            });
        }
    };

    // Khi có defaultValue, set các lựa chọn ban đầu
    useEffect(() => {
        const initAddress = async () => {
            if (defaultValue && !hasDefaultLoaded.current && provinces.length > 0) {
                const province = provinces.find((p) => p.name === defaultValue.province);
                if (province) {
                    setSelectedProvince(province);

                    const districtRes = await axios.get(
                        `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
                    );
                    setDistricts(districtRes.data.districts);

                    const district = districtRes.data.districts.find(
                        (d) => d.name === defaultValue.district
                    );
                    if (district) {
                        setSelectedDistrict(district);

                        const wardRes = await axios.get(
                            `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
                        );
                        setWards(wardRes.data.wards);

                        const ward = wardRes.data.wards.find((w) => w.name === defaultValue.ward);
                        if (ward) {
                            setSelectedWard(ward);
                            // Gửi địa chỉ ban đầu ra ngoài luôn nếu cần
                            if (onAddressChange) {
                                onAddressChange({
                                    province: province.name,
                                    district: district.name,
                                    ward: ward.name,
                                });
                            }
                        }
                    }
                    hasDefaultLoaded.current = true;
                }
            }
        };
        initAddress();
    }, [defaultValue, provinces]);

    return (
        <div>
            <select onChange={handleProvinceChange} defaultValue="" value={selectedProvince?.code || ""}>
                <option value="" disabled >Chọn Tỉnh/Thành phố</option>
                {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                        {p.name}
                    </option>
                ))}
            </select>

            <select onChange={handleDistrictChange} value={selectedDistrict?.code || ""}>
                <option value="" disabled >Chọn Quận/Huyện</option>
                {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                        {d.name}
                    </option>
                ))}
            </select>

            <select onChange={handleWardChange} value={selectedWard?.code || ""}>
                <option value="" disabled>Chọn Phường/Xã</option>
                {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                        {w.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AddressSelector;