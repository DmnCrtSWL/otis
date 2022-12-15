import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';

import Company2 from '../../../assets/logos/company2.png';
import CommonGridProductItem from '../../_common/CommonGridOrderItem';
import tableData from '../../../common/data/dummyProductData';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Badge from '../../../components/bootstrap/Badge';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}


const GridFluidPage = () => {
	const { darkModeStatus } = useDarkMode();
	const [data, setData] = useState(tableData);
	const [editItem, setEditItem] = useState<IValues | null>(null);
	const [editPanel, setEditPanel] = useState<boolean>(false);

	function handleRemove(id: number) {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
	}

	function handleEdit(id: number) {
		const newData = data.filter((item) => item.id === id);
		setEditItem(newData[0]);
	}





	return (
		<PageWrapper title=''>
			<SubHeader>

			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Welcome Page</div>
			</Page>
		</PageWrapper>
	);
};

export default GridFluidPage;
