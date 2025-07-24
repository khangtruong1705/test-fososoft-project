import { Button, Checkbox } from 'antd';
import React from 'react';




export const getFilterItems = (t, onChange) => [
    {
        key: '1',
        label: <strong style={{ fontSize: '0.9vw' }}>{t('Categories')}</strong>,
        children: [
            { key: '11', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Lọc Gió Động Cơ - Air Filter</span> },
            { key: '12', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Lọc Nhiên Liệu - Fuel Filter</span> },
            { key: '13', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Bộ lọc dầu</span> },
            { key: '14', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> {t('uncategorized')}</span> },
            { key: '15', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> {t('others')}</span> },
        ],
    },
    {
        key: '2',
        label: <strong style={{ fontSize: '0.9vw' }}>{t('pricerange')}</strong>,
        children: [
            { key: '21', label: <Button style={{ width: '100%', fontSize: '1vw' }}>{t('under')} 100.000₫</Button> },
            { key: '22', label: <Button style={{ width: '100%', fontSize: '1vw' }}>100.000₫ - 300.000₫</Button> },
            { key: '23', label: <Button style={{ width: '100%', fontSize: '1vw' }}>300.000₫ - 500.000₫</Button> },
            { key: '24', label: <Button style={{ width: '100%', fontSize: '1vw' }}>{t('over')} 500.000₫</Button> },
        ],
    },
    {
        key: '3',
        label: <strong style={{ fontSize: '0.9vw' }}>{t('brand')}</strong>,
        children: [
            { key: '31', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Asakashi</span> },
            { key: '32', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Bosch</span> },
            { key: '33', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> Huyndai</span> },
        ],
    },
    {
        key: '4',
        label: <strong style={{ fontSize: '0.9vw' }}>{t('yearofmanufacture')}</strong>,
        children: [
            { key: '431', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> 2021</span> },
            { key: '432', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> 2020</span> },
            { key: '433', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> 2019</span> },
            { key: '434', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> 2018</span> },
        ],
    },
    {
        key: '5',
        label: <strong style={{ fontSize: '0.9vw' }}>{t('origin')}</strong>,
        children: [
            { key: '531', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> {t('japan')}</span> },
            { key: '532', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> {t('germany')}</span> },
            { key: '533', label: <span style={{ fontSize: '0.9vw' }}><Checkbox onChange={onChange} /> {t('china')}</span> },
        ],
    },
];
