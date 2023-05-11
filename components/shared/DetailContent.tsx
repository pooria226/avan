import React, { FC } from "react";
import { Button, Spin } from "antd";
import CheckBoxItem from "./CheckboxItem";

import Styles from "@/styles/scss/common/DetailContent.module.scss";
import useTranslation from "next-translate/useTranslation";


interface Props {
    theme: boolean;
    inputs: any;
    handleChangeRole(key: string): void;
    handleFillRole(): void;
    handleAddRole(): void;
    loader: boolean;
}

const DetailContent: FC<Props> = ({
    theme = true,
    inputs,
    handleChangeRole,
    handleFillRole,
    handleAddRole,
    loader,
}) => {
    //***************************
    // Import Hooks
    //***************************

    const { t } = useTranslation("common");

    return (
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
            <div className="grid grid-cols-12 gap-5">
                {Object.keys(inputs).map((item, index) => (
                    <div key={index} className="col-span-6">
                        <CheckBoxItem
                            onChange={() => handleChangeRole(inputs[item].value)}
                            checked={inputs[item].checked}
                            theme={theme}
                            label={inputs[item].value}
                        />
                    </div>
                ))}
                <div className="col-span-12">
                    <div className="flex gap-5">
                        <Button className={Styles.saveButton} disabled={loader} onClick={() => handleAddRole()}>
                            {loader ? <Spin /> : t('save')}
                        </Button>
                        <Button className={Styles.resetButton} onClick={() => handleFillRole()}>{t('reset')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailContent;
