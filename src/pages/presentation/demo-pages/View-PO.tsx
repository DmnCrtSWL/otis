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
import CommonGridProductItem from '../../_common/CommonGridProductItem';
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
import Icon from '../../../components/icon/Icon';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}
const validate = (values: IValues) => {
	const errors = {
		name: '',
		price: '',
		stock: '',
		category: '',
	};

	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more';
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less';
	}

	if (!values.price) {
		errors.price = 'Required';
	} else if (values.price < 0) {
		errors.price = 'Price should not be 0';
	}

	if (!values.stock) {
		errors.stock = 'Required';
	}

	if (!values.category) {
		errors.category = 'Required';
	} else if (values.category.length < 3) {
		errors.category = 'Must be 3 characters or more';
	} else if (values.category.length > 20) {
		errors.category = 'Must be 20 characters or less';
	}

	return errors;
};

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

	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			stock: 0,
			category: '',
		},
		validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setEditPanel(false);
		},
	});

	useEffect(() => {
		if (editItem) {
			formik.setValues({
				name: editItem.name,
				price: editItem.price,
				stock: editItem.stock,
				category: editItem.category,
			});
		}
		return () => {
			formik.setValues({
				name: '',
				price: 0,
				stock: 0,
				category: '',
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editItem]);

	return (
		<PageWrapper title=''>
			<SubHeader>
				<SubHeaderLeft children={undefined}></SubHeaderLeft>
				<SubHeaderRight>
					<Button size='sm' color='primary' tag='a' to='/purchase-orders'>
						Back
					</Button>
					<Button size='sm' color='primary' tag='a' to='/new-order'>
						New PO
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='display-4 fw-bold py-3'>Order Detail</div>
				<div className='row'>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>PO Number</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>D0250217222277028A</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'CalendarToday'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>PO Date</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>11/25/22</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Contract Number</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>JMN38067</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Dealer Order Number</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>22277028A</h3>
								</div>
							</div>
						</Card>
					</div>



					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Unit Number</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>Country I</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'AttachMoney'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Shipment Payment</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>Paid by Buyer</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Terms</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>Mixed</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Discount Percent</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>0%</h3>
								</div>
							</div>
						</Card>
					</div>
					
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'CalendarToday'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Discount Days Due</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>0 Days</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'CalendarToday'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Term Net Days</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>60 Days</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'LocationOn'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Location</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>-</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Carrier Alpha Code</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>FDXG</h3>
								</div>
							</div>
						</Card>
					</div>

					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Store'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Ship To</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>Larsson Eleveator Company</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Phone'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Shipper Telehpone</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>218 256-9030</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'DocumentScanner'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Shipper Facsimile</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>000 000 0000</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Number of Lines</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>1</h3>
								</div>
							</div>
						</Card>
					</div>
					<div className='col-md-6'>
						<Card className='po-cont'>
							<div className='row'>
								<div className='col-md-1'>
									<Icon
										icon={'Tag'}
										className='h3 compliance-icon'
										color='primary'
									/>
								</div>
								<div className='col-md-9'>
									<h3 className='po-title'>Address</h3>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='po-data'>19932, Cardinal Drive, Grand Rapids, MN 55744, US</h3>
								</div>
							</div>
						</Card>
					</div>
					
				</div>
			</Page>

			<OffCanvas
				setOpen={setEditPanel}
				isOpen={editPanel}
				tag='form'
				noValidate
				onSubmit={formik.handleSubmit}>
				<OffCanvasHeader setOpen={setEditPanel}>
					<OffCanvasTitle id='edit-panel'>
						{editItem?.name || 'New Product'}{' '}
						{editItem?.name ? (
							<Badge color='primary' isLight>
								Edit
							</Badge>
						) : (
							<Badge color='success' isLight>
								New
							</Badge>
						)}
					</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<Card>
						<CardHeader>
							<CardLabel icon='Photo' iconColor='info'>
								<CardTitle>Product Image</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row'>
								<div className='col-12'>
									{editItem?.image ? (
										<img
											src={editItem.image}
											alt=''
											width={128}
											height={128}
											className='mx-auto d-block img-fluid mb-3'
										/>
									) : (
										<PlaceholderImage
											width={128}
											height={128}
											className='mx-auto d-block img-fluid mb-3 rounded'
										/>
									)}
								</div>
								<div className='col-12'>
									<div className='row g-4'>
										<div className='col-12'>
											<Input type='file' autoComplete='photo' />
										</div>
										<div className='col-12'>
											{editItem && (
												<Button
													color='dark'
													isLight
													icon='Delete'
													className='w-100'
													onClick={() => {
														setEditItem({ ...editItem, image: null });
													}}>
													Delete Image
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<CardLabel icon='Description' iconColor='success'>
								<CardTitle>Product Details</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row g-4'>
								<div className='col-12'>
									<FormGroup id='name' label='Name' isFloating>
										<Input
											placeholder='Name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.name}
											isValid={formik.isValid}
											isTouched={formik.touched.name}
											invalidFeedback={formik.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='price' label='Price' isFloating>
										<Input
											placeholder='Price'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.price}
											isValid={formik.isValid}
											isTouched={formik.touched.price}
											invalidFeedback={formik.errors.price}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='stock' label='Stock' isFloating>
										<Input
											placeholder='Stock'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.stock}
											isValid={formik.isValid}
											isTouched={formik.touched.stock}
											invalidFeedback={formik.errors.stock}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='category' label='Category' isFloating>
										<Input
											placeholder='Category'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.category}
											isValid={formik.isValid}
											isTouched={formik.touched.category}
											invalidFeedback={formik.errors.category}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</OffCanvasBody>
				<div className='p-3'>
					<Button
						color='info'
						icon='Save'
						type='submit'
						isDisable={!formik.isValid && !!formik.submitCount}>
						Save
					</Button>
				</div>
			</OffCanvas>
		</PageWrapper>
	);
};

export default GridFluidPage;
