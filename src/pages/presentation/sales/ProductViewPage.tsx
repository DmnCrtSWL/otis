import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import { demoPagesMenu } from '../../../menu';
import tableData from '../../../common/data/dummyProductData';
import Avatar from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import { priceFormat } from '../../../helpers/helpers';
import Chart from '../../../components/extras/Chart';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import showNotification from '../../../components/extras/showNotification';
import useDarkMode from '../../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string;
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

type TTabs = 'Summary' | 'Comments' | 'Edit';
interface ITabs {
	[key: string]: TTabs;
}

const ProductViewPage = () => {
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const navigate = useNavigate();

	// @ts-ignore
	const itemData = tableData.filter((item) => item.id.toString() === id.toString());
	const data = itemData[0];

	const chartOptions: ApexOptions = {
		colors: [process.env.REACT_APP_WARNING_COLOR],
		chart: {
			type: 'line',
			width: '100%',
			height: 105,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					formatter(seriesName: string) {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};

	const TABS: ITabs = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	const [editItem, setEditItem] = useState<IValues>(data);
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
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Product has been updated successfully',
			);
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
		<PageWrapper title={demoPagesMenu.sales.subMenu.product.text}>
						<SubHeader>
				<SubHeaderLeft>

				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						size='lg'
						color='primary'
						tag='a'
						to='/compliance-reports'>
						Back
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='display-4 fw-bold py-3'>Report Detail</div>
				<div className='row'>
					<div className='col-md-4'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>Supplier</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'CalendarToday'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>CDP Fastener Group, Inc.</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-4'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>Release Number</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'Tag'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>369
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-4'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>Last PO Date</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'CalendarToday'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>11/23/22
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-3'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>With ASN</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'AddBox'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>78
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-3'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>Last ASN Date</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'CalendarToday'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>11/23/22
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-3'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>With 820</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'AddBox'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>78
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-3'>
						<Card className='blue-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>Last ASN Date</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'AddBox'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>78
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-1'></div>

					<div className='col-md-2'>
						<Card className='green-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>SCAC</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'Check'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>100%
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>

						<div className='col-md-1'></div>

						<div className='col-md-1'></div>
					</div>

					<div className='col-md-2'>
						<Card className='green-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>SHIP</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'Check'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>100%
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>

						<div className='col-md-1'></div>

						<div className='col-md-1'></div>
					</div>

					<div className='col-md-2'>
						<Card className='orange-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>PRICE</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'WarningAmber'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>78%
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>

						<div className='col-md-1'></div>

						<div className='col-md-1'></div>
					</div>

					<div className='col-md-2'>
						<Card className='green-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>QUANTITY</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'Check'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>100%
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>

						<div className='col-md-1'></div>

						<div className='col-md-1'></div>
					</div>

					<div className='col-md-2'>
						<Card className='green-card'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='otis-card-title'>TRACKING</h3>
								</div>
							</div>

							<CardBody>
								<div className='row'>
									<div className='col-md-2'>
										<Icon
											icon={'Check'}
											className='h4 compliance-icon'
											color='light'
											size='4x'
										/>
									</div>
									<div className='col-md-10 card-data-cont'>
										<h3 className='otis-card-data'>
											<br></br>100%
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>

						<div className='col-md-1'></div>

						<div className='col-md-1'></div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ProductViewPage;
