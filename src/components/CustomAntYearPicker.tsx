import React, { Dispatch, SetStateAction } from 'react';
import { DatePicker, Space } from 'antd';

interface CustomAntYearPickerProps {
    selectedYear: string | null;
    onChange: Dispatch<SetStateAction<string>>
    width: string;
    textMarginLeft: string
}

const CustomAntYearPicker: React.FC<CustomAntYearPickerProps> = ({ selectedYear, onChange, width, textMarginLeft }) => {

    const onChangeDatePicker = (date: any) => {
        if (date) {
            onChange(date.year());
        } else {
            onChange("");
        }
    };

    return (
        <Space direction="vertical" className="relative hover:cursor-pointer">
            <div className="relative">
                <div className={`absolute z-10 flex h-min ml-${textMarginLeft} mt-[10px] px-4 cursor-default text-gray-400 bg-white custom-year-display`}>
                    <span>{selectedYear ? selectedYear : 'Select by Year'}</span>

                </div>
                <DatePicker
                    onChange={onChangeDatePicker}
                    picker="year"
                    needConfirm={true}
                    className="custom-datepicker"
                    placeholder=''
                    style={{
                        width: width,
                        padding: "10px",
                        marginInline: "2px",
                        borderRadius: "2px",
                        borderColor: "rgb(226 232 240)",
                        fontFamily: "",
                        fontSize: "18px",
                        fontWeight: "bolder",
                        border: "none"
                    }}
                />
            </div>
        </Space>
    );
};

export default CustomAntYearPicker;
